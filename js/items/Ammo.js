/**
 *
 * @param {String} caliber {Ammo.$9x19MM}
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

};

Ammo.$9x19MM 	= '9x19mm';
Ammo.$5_56MM 	= '5.56mm';
Ammo.$5_45MM 	= '5.45mm';

Ammo.TYPE_AP 		= 'ap';		// armor piercing
Ammo.TYPE_HP 		= 'hp';		// hollow point
Ammo.TYPE_GLASER 	= 'glaser'; // glaser
Ammo.TYPE_BALL 		= 'ball';	// standard ball ammo