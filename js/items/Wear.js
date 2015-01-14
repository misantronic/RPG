/**
 *
 * @param {String} where {Human.HEAD|Human.BODY|Human.LEGS}
 * @param {Object} stats
 * @constructor
 */
function Wear(where, stats) {
	if(!where && !stats) return;

	if(stats) {
		for(var stat in stats) {
			if(stats.hasOwnProperty(stat) && this[stat] !== undefined) {
				this._stats[stat] = stats[stat];
			}
		}
	}
}

Wear.prototype = new Item();
Wear.constructor = Wear;

Wear.prototype._where = '';
Wear.prototype._stats = {
	armor: 0
};

// GETTER / SETTER

Object.defineProperty(Wear.prototype, "where", {
	get: function () {
		return this._where;
	},

	set: function(val) {
		this._where = val;
	}
});

Object.defineProperty(Wear.prototype, "armor", {
	get: function () {
		return this._stats.armor;
	},

	set: function(val) {
		this._stats.armor = val;
	}
});