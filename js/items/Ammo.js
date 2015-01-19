/**
 *
 * @param {String} caliber {Ammo.$9x19MM|Ammo.$5_45MM|Ammo.$5_56MM}
 * @param {Object} [stats]
 * @constructor
 */
function Ammo(caliber, stats) {
	if(!caliber) return;

	// reset
	this._stats = {};

	this._caliber = caliber;

	if(stats) {
		for(var stat in stats) {
			if(stats.hasOwnProperty(stat)) {
				this[stat] = stats[stat];
			}
		}
	}
}

Ammo.prototype = new Item();
Ammo.constructor = Ammo;

Ammo.prototype._caliber = '';
Ammo.prototype._type = '';
Ammo.prototype._stats = {
	rounds: 0
};

Ammo.$9x19MM 	= '9x19mm';
Ammo.$5_56MM 	= '5.56mm';
Ammo.$5_45MM 	= '5.45mm';

Ammo.TYPE_AP 		= 'ap';		// armor piercing
Ammo.TYPE_HP 		= 'hp';		// hollow point
Ammo.TYPE_GLASER 	= 'glaser'; // glaser
Ammo.TYPE_BALL 		= 'ball';	// standard ball ammo

Ammo.PROPERTIES = {
	ap		: [ 1.3, 1, 1 ],
	hp		: [ 0.7, 1.7, 1 ],
	glaser	: [ 0.3, 3, 1 ],
	ball	: [ 1, 1, 1 ]
};

// GETTER / SETTER

Object.defineProperty(Ammo.prototype, "rounds", {
	get: function () {
		return this._stats.rounds;
	},

	set: function(val) {
		this._stats.rounds = val;
	}
});

Object.defineProperty(Ammo.prototype, "caliber", {
	get: function () {
		return this._caliber;
	},

	set: function(val) {
		this._caliber = val;
	}
});