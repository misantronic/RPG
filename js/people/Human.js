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

Human.prototype = new Abstract();
Human.prototype.constructor = Human;

Human.STAND = 'stand';
Human.CROUCH = 'crouch';
Human.PRONE = 'prone';

Human.HEAD = 'head';
Human.BODY = 'body';
Human.LEGS = 'legs';

/**
 *
 * @type {string}
 * @private
 */
Human.prototype._name = '';

/**
 *
 * @type {string}
 * @private
 */
Human.prototype._nickname = '';

/**
 *
 * @type {Point}
 * @private
 */
Human.prototype._coord = new Point();

/**
 *
 * @type {{hea: number, agi: number, dex: number, str: number, ldr: number, wis: number, lvl: number, mec: number, exp: number, med: number, mrk: number}}
 * @private
 */
Human.prototype._stats = {
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
};

/**
 *
 * @type {{head: Wear, body: Wear, legs: Wear}}
 * @private
 */
Human.prototype._wear = {
	head: new Wear(),
	body: new Wear(),
	legs: new Wear()
};

/**
 *
 * @type {Array}
 * @private
 */
Human.prototype._hands = [];

/**
 *
 * @type {string}
 * @private
 */
Human.prototype._stance = Human.STAND;

/**
 *
 * @type {{sm: Array, md: Array, lg: Array}}
 * @private
 */
Human.prototype._inventory = {
	sm: [],
	md: [],
	lg: []
};

/**
 *
 * @type {Number}
 * @private
 */
Human.prototype._ap = Infinity;

/**
 *
 * @type {number}
 * @private
 */
Human.prototype._hp = 0;

/**
 *
 * @type {number}
 * @private
 */
Human.prototype._energy = 0;

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
 * @return {{walkingDistance: Array, sightDistance: number, cost: number}}
 * @private
 */
Human.prototype._calculateDistance = function(coord) {
	// calculate walking distance
	// TODO: consider world map resp. obsticales
	var dist = Math.abs(this._coord.x - coord.x) + Math.abs(this._coord.y - coord.y);

	// calculate ap-cost
	var tileCost = 0;
	if(this._stance == Human.STAND) 		tileCost = 8;
	else if(this._stance == Human.CROUCH) 	tileCost = 12;
	else if(this._stance == Human.PRONE) 	tileCost = 16;

	var cost = tileCost * dist;

	// caluclate direct walking distance
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
		walkingDist = [];

	lgDist.forEach(function(p1, i) {
		if(i != 0 && i % div == 0) index++;

		if(lgDist.type == 'x') 		walkingDist.push( new Point(p1, shDist[index]) );
		else if(lgDist.type == 'y') walkingDist.push( new Point(shDist[index], p1) );
	});

	// check if last element equals the target coord
	var lastPoint = walkingDist[walkingDist.length-1];
	if(lastPoint.x != coord.x || lastPoint.y != coord.y) {
		walkingDist.push(coord);
	}

	// calculate sight distance (c² = a² + b²)
	var sightDist = Math.sqrt(Math.pow(coord.x - this._coord.x, 2) + Math.pow(coord.y - this._coord.y, 2));

	return {
		walkingDistance: walkingDist,
		sightDistance: sightDist,
		cost: cost
	};
};

/**
 * @param {Point} coord
 */
Human.prototype.walk = function(coord) {
	var distance = this._calculateDistance(coord);
	var cost = distance.cost;

	this.log("cost", cost, "walking distance", distance.walkingDistance, "sight distance", distance.sightDistance);

	if(this._ap - cost < 0) {
		return this;
	}

	this._coord = coord;

	this._ap -= cost;

	return this;
};

/**
 *
 * @param {Point} coord
 * @param {Human.HEAD|Human.BODY|Human.LEGS} bodypart
 * @param {Number} accuracy 0.0 - 1.0
 */
Human.prototype.shoot = function(coord, bodypart, accuracy) {
	var distance = this._calculateDistance(coord);

	// calculate accuracy
	accuracy = 0.5 + (0.5 * accuracy);

	// get person to shoot at
	/** @type {Human} person */
	var person;
	World.PEOPLE.forEach(
		/** @param {Human} somePerson */
		function(somePerson) {
			if(somePerson.coord.x == coord.x && somePerson.coord.y == coord.y) person = somePerson;
		}
	);

	// calculate if bullet hits, for every weapon in hand
	this._hands.forEach(
		/** @param {Weapon} weapon */
		function(weapon) {
			// calculate range factor
			var chance_range = weapon.range / distance.sightDistance;

			if(person) {
				// calculate stance factor
				if(person.stance != this._stance) {
					switch(this._stance) {
						case Human.STAND:
							if(person.stance == Human.CROUCH) accuracy /= 1.1;	// reduce by 10%
							if(person.stance == Human.PRONE) accuracy /= 1.2;	// reduce by 20%
							break;
						case Human.CROUCH:
							if(person.stance == Human.STAND) accuracy /= 1.1;	// reduce by 10%
							if(person.stance == Human.PRONE) accuracy /= 1.2;	// reduce by 20%
							break;
						case Human.PRONE:
							if(person.stance == Human.STAND) accuracy /= 1.1;	// reduce by 10%
							if(person.stance == Human.CROUCH) accuracy /= 1.2;	// reduce by 20%
							break;
					}
				}
			}

			console.log("chance_range", chance_range, "accuracy", accuracy, "chance of hit:", chance_range * accuracy);
		}.bind(this)
	);
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
