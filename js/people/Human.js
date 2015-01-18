/**
 *
 * @param {Object} [stats]
 * @constructor
 */
function Human(stats) {
	if(stats) {
		// reset
		this._stats = {};
		this._inventory = {
			sm: [],
			md: [],
			lg: []
		};
		this._hands = [];

		for(var stat in stats) {
			if(stats.hasOwnProperty(stat)) {
				this[stat] = stats[stat];
			}
		}
	}
}

Human.STAND = 'stand';
Human.CROUCH = 'crouch';
Human.PRONE = 'prone';

Human.prototype = {
	_name: '',
	_nickname: '',
	/** @type {Point} */
	_coord: new Point(),

	_stats: {
		hea: 0,
		agi: 0,
		dex: 0,
		str: 0,
		ldr: 0,
		wis: 0,
		lvl: 0,
		mec: 0,
		exp: 0,
		med: 0,
		mrk: 0
	},

	_wear: {
		head: new Wear(),
		body: new Wear(),
		legs: new Wear()
	},

	_hands: [],

	_stance: Human.STAND,

	_inventory: {
		sm: [],
		md: [],
		lg: []
	},

	_thumb: Image,

	_ap: Infinity,
	_hp: 0,
	_energy: 0,
	_moral: 0
};

/**
 *
 * @param {Wear} wear
 */
Human.prototype.putOn = function(wear) {
	if(!(wear instanceof Wear)) {
		console.warn(wear, "must be an instance of Wear().");
		return;
	}

	this._wear[wear.type] = wear;

	return this;
};

/**
 *
 * @param {Wear} wear
 */
Human.prototype.takeOff = function(wear) {
	this._wear[wear.type] = '';

	return this;
};

/**
 *
 * @param {Item} item
 */
Human.prototype.equip = function(item) {
	if(!(item instanceof Item)) {
		console.warn(item, "must be an instance of Item().");
		return;
	}

	this._inventory[item.size].push(item);

	return this;
};

Human.prototype.unequip = function(item) {
	// remove from inventory
	this._inventory[item.size].forEach(function(invItem, i) {
		if(invItem === item) this._inventory[item.size].splice(i, 1);
	}.bind(this));

	// check hands
	this._hands.forEach(function(handItem, i) {
		if(handItem === item) this._hands.splice(i, 1);
	}.bind(this));

	return this;
};

/**
 *
 * @param {Item} item
 */
Human.prototype.grab = function(item) {
	// check if Human can grab item
	if(this._hands.length == 2) return;
	for(var i=0; i < this._hands.length; i++) {
		/** @type {Item} handItem */
		var handItem = this._hands[i];
		if(handItem.hands == 2) return;
	}

	// check if item is in inventory
	this._inventory[item.size].forEach(function(invItem) {
		if(invItem === item) this._hands.push(item);
	}.bind(this));

	return this;
};

Human.prototype.startTurn = function() {
	// calculate APs
	var ap = ((this._stats.agi * 0.9) + (this._stats.dex * 0.6) + (this._energy * 0.6) + this._hp) / 3;
	ap = Math.round(ap);

	this._ap = ap;

	return this;
};

Human.prototype.endTurn = function() {


	return this;
};

/**
 *
 * @param {Point} coord
 * @returns {Object}
 */
Human.prototype.calculateDistance = function(coord) {
	// calculate walking distance
	// TODO: consider world map resp. obsticales
	var dist = Math.abs(this._coord.x - coord.x) + Math.abs(this._coord.y - coord.y);
	var output = {};

	// calculate ap-cost
	var tileCost = 0;
	if(this._stance == Human.STAND) 		tileCost = 8;
	else if(this._stance == Human.CROUCH) 	tileCost = 12;
	else if(this._stance == Human.PRONE) 	tileCost = 16;

	var cost = tileCost * dist;

	// caluclate diagonal walking distance
	var distX = [], distY = [];
	for(var x = this._coord.x; this._coord.x < coord.x ? x <= coord.x : x >= coord.x; this._coord.x < coord.x ? x++ : x--) {
		distX.push(x);
	}
	distX.type = 'x';
	for(var y = this._coord.y; this._coord.y < coord.y ? y <= coord.y : y >= coord.y; this._coord.y < coord.y ? y++ : y--) {
		distY.push(y);
	}
	distY.type = 'y';

	// find out which is longest and shortest distance
	var lgDist = distX.length > distY.length ? distX : distY,
		shDist = distX.length > distY.length ? distY : distX,
		div = Math.ceil(lgDist.length / shDist.length),
		index = 0,
		fullDist = [];

	lgDist.forEach(function(p1, i) {
		if(i != 0 && i % div == 0) index++;

		if(lgDist.type == 'x') 		fullDist.push( new Point(p1, shDist[index]) );
		else if(lgDist.type == 'y') fullDist.push( new Point(shDist[index], p1) );
	});

	// check if last element equals the target coord
	var lastPoint = fullDist[fullDist.length-1];
	if(lastPoint.x != coord.x || lastPoint.y != coord.y) {
		fullDist.push(coord);
	}

	output.fullDistance = fullDist;
	output.cost = cost;

	return output;
};

/**
 * @param {Point} coord
 */
Human.prototype.walk = function(coord) {
	var distance = this.calculateDistance(coord);
	var cost = distance.cost;

	console.log("cost", cost, "distance", distance.fullDistance);

	if(this._ap - cost < 0) {
		return this;
	}

	this._coord = coord;

	this._ap -= cost;

	return this;
};

/**
 *
 * @param {String} stance {Human.STAND|Human.CROUCH|Human.PRONE}
 */
Human.prototype.changeStance = function(stance) {
	this._stance = stance;
};

Object.defineProperty(Human.prototype, "weightInKG", {
	get: function () {
		var weight = 0,
			/** @type {Item} item **/
			item;
		[ Item.SMALL, Item.MEDIUM, Item.LARGE].forEach(function(type) {
			for(var i=0; i < this._inventory[type].length; i++) {
				item = this._inventory[type][i];
				weight += item.weight;
			}
		}.bind(this));

		return weight;
	}
});

Object.defineProperty(Human.prototype, "weightInPerc", {
	get: function () {
		return Math.round(this.weightInKG / this.strength * 100);
	}
});

// GETTER / SETTER

Object.defineProperty(Human.prototype, "thumb", {
	get: function () {
		return this._thumb;
	},

	set: function(val) {
		var img = new Image();
		img.src = val;
		this._thumb = img;
	}
});

Object.defineProperty(Human.prototype, "name", {
	get: function () {
		return this._name;
	},

	set: function(val) {
		this._name = val;
	}
});

Object.defineProperty(Human.prototype, "nickname", {
	get: function () {
		return this._nickname;
	},

	set: function(val) {
		this._nickname = val;
	}
});

Object.defineProperty(Human.prototype, "health", {
	get: function () {
		return this._stats.hea;
	},

	set: function(val) {
		this._stats.hea = val;
	}
});

Object.defineProperty(Human.prototype, "agility", {
	get: function () {
		return this._stats.agi;
	},

	set: function(val) {
		this._stats.agi = val;
	}
});

Object.defineProperty(Human.prototype, "dexterity", {
	get: function () {
		return this._stats.dex;
	},

	set: function(val) {
		this._stats.dex = val;
	}
});

Object.defineProperty(Human.prototype, "strength", {
	get: function () {
		return this._stats.str;
	},

	set: function(val) {
		this._stats.str = val;
	}
});

Object.defineProperty(Human.prototype, "leadership", {
	get: function () {
		return this._stats.ldr;
	},

	set: function(val) {
		this._stats.ldr = val;
	}
});

Object.defineProperty(Human.prototype, "wisdom", {
	get: function () {
		return this._stats.wis;
	},

	set: function(val) {
		this._stats.wis = val;
	}
});

Object.defineProperty(Human.prototype, "level", {
	get: function () {
		return this._stats.lvl;
	},

	set: function(val) {
		this._stats.lvl = val;
	}
});

Object.defineProperty(Human.prototype, "mecanical", {
	get: function () {
		return this._stats.mec;
	},

	set: function(val) {
		this._stats.mec = val;
	}
});

Object.defineProperty(Human.prototype, "explosives", {
	get: function () {
		return this._stats.exp;
	},

	set: function(val) {
		this._stats.exp = val;
	}
});

Object.defineProperty(Human.prototype, "medical", {
	get: function () {
		return this._stats.med;
	},

	set: function(val) {
		this._stats.med = val;
	}
});

Object.defineProperty(Human.prototype, "marksmanship", {
	get: function () {
		return this._stats.mrk;
	},

	set: function(val) {
		this._stats.mrk = val;
	}
});

Object.defineProperty(Human.prototype, "AP", {
	get: function () {
		return this._ap;
	},

	set: function(val) {
		this._ap = val;
	}
});

Object.defineProperty(Human.prototype, "moral", {
	get: function () {
		return this._moral;
	},

	set: function(val) {
		this._moral = val;
	}
});

Object.defineProperty(Human.prototype, "hp", {
	get: function () {
		return this._hp;
	},

	set: function(val) {
		this._hp = val;
	}
});

Object.defineProperty(Human.prototype, "energy", {
	get: function () {
		return this._energy;
	},

	set: function(val) {
		this._energy = val;
	}
});

Object.defineProperty(Human.prototype, "wear", {
	get: function () {
		return this._wear;
	}
});

Object.defineProperty(Human.prototype, "stance", {
	get: function () {
		return this._stance;
	}
});

Object.defineProperty(Human.prototype, "inventory", {
	get: function () {
		return this._inventory;
	}
});

Object.defineProperty(Human.prototype, "coord", {
	/** @return {Point} */
	get: function () {
		return this._coord;
	},

	/** @param {Point} val */
	set: function(val) {
		this._coord = val;
	}
});
