/**
 *
 * @param {String} type {Weapon.PISTOL|Weapon.SMG|Weapon.RIFLE|Weapon.ASSAULT_RIFLE}
 * @param {Object} [stats]
 * @constructor
 */
function Weapon(type, stats) {
	if(!type) return;

	this._stats = {};

	this._type = type;

	if(stats) {
		for(var stat in stats) {
			if(stats.hasOwnProperty(stat)) {
				this[stat] = stats[stat];
			}
		}
	}
}

Weapon.prototype = new Item();
Weapon.constructor = Weapon;

Weapon.prototype._stats = {
	damage: 0,
	ammo: Ammo,
	magazine: 0,
	range: 0,
	ap: [ 0 ]
};

Weapon.PISTOL 			= 'pistol';
Weapon.SMG 				= 'smg';
Weapon.RIFLE 			= 'rifle';
Weapon.ASSAULT_RIFLE 	= 'assault_rifle';

// GETTER / SETTER

Object.defineProperty(Weapon.prototype, "damage", {
	get: function () {
		return this._stats.damage;
	},

	set: function(val) {
		this._stats.damage = val;
	}
});

Object.defineProperty(Weapon.prototype, "ammo", {
	get: function () {
		return this._stats.ammo;
	},

	set: function(val) {
		this._stats.ammo = val;
	}
});

Object.defineProperty(Weapon.prototype, "magazine", {
	get: function () {
		return this._stats.magazine;
	},

	set: function(val) {
		this._stats.magazine = val;
	}
});

Object.defineProperty(Weapon.prototype, "range", {
	get: function () {
		return this._stats.range;
	},

	set: function(val) {
		this._stats.range = val;
	}
});

Object.defineProperty(Weapon.prototype, "ap", {
	get: function () {
		return this._stats.ap;
	},

	set: function(val) {
		this._stats.ap = val;
	}
});