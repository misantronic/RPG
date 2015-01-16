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

Human.prototype = {
	_name: '',
	_nickname: '',

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

	_inventory: {
		sm: [],
		md: [],
		lg: []
	},

	_ap: 0,
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

// GETTER / SETTER

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

Object.defineProperty(Human.prototype, "wear", {
	get: function () {
		return this._wear;
	}
});

Object.defineProperty(Human.prototype, "inventory", {
	get: function () {
		return this._inventory;
	}
});
