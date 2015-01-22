/**
 *
 * @param {Point} coord
 * @param {Number} height
 * @constructor
 */
function Obstacle(coord, height) {
	this._coord = coord;
	this._height = height;
}

Obstacle.prototype._height = 0;
Obstacle.prototype._coord = new Point();

Object.defineProperty(Obstacle.prototype, "coord", {
	/** @return {Point} */
	get: function () {
		return this._coord;
	},

	/** @param {Point} val */
	set: function(val) {
		this._coord = val;
	}
});

Object.defineProperty(Obstacle.prototype, "x", {
	/** @return {Number} */
	get: function () {
		return this._coord.x;
	}
});

Object.defineProperty(Obstacle.prototype, "y", {
	/** @return {Number} */
	get: function () {
		return this._coord.y;
	}
});

Object.defineProperty(Obstacle.prototype, "height", {
	/** @return {Number} */
	get: function () {
		return this._height;
	},

	/** @param {Number} val */
	set: function(val) {
		this._height = val;
	}
});