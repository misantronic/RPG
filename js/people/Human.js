/**
 *
 * @param {Object} stats
 * @param {String} [name]
 * @param {String} [nickname]
 * @constructor
 */
function Human(stats, name, nickname) {
	if(stats) {
		this._stats = {};

		for(var stat in stats) {
			if(stats.hasOwnProperty(stat)) {
				this[stat] = stats[stat];
			}
		}
	}

	if(name) this._name = name;
	if(nickname) this._nickname = nickname;
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

	_ap: 0,
	_moral: 0
};

Human.HEAD = 'head';
Human.BODY = 'body';
Human.LEGS = 'legs';

/**
 *
 * @param {Wear} wear
 */
Human.prototype.putOn = function(wear) {
	var item = this._wear[wear.type];
	this._wear[wear.type] = wear;
	return item;
};

/**
 *
 * @param {Wear} wear
 */
Human.prototype.takeOff = function(wear) {
	var item = this._wear[wear.type];
	this._wear[wear.type] = '';
	return item;
};

Human.prototype.getWeight = function() {

}

// GETTER / SETTER

Object.defineProperty(Human.prototype, "weight", {
	get: function () {
		return this._wear.head.weight + this._wear.body.weight + this._wear.legs.weight;
	}
});

Object.defineProperty(Human.prototype, "weightPerc", {
	get: function () {
		return Math.round(this.weight / this.strength * 100);
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
