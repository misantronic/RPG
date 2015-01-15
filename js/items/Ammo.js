/**
 *
 * @param {String} type {Ammo.$9MM}
 * @param {Object} [stats]
 * @constructor
 */
function Ammo(type, stats) {
	if(!type) return;

	// reset
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

Ammo.prototype = new Item();
Ammo.constructor = Ammo;

Ammo.prototype._stats = {

};

Ammo.$9MM = '9mm';
Ammo.$5_56MM = '5.56mm';