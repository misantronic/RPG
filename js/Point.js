/**
 *
 * @param {Number} [x]
 * @param {Number} [y]
 * @constructor
 */
function Point(x, y) {
	if(!x) x = 0;
	if(!y) y = 0;

	this.x = x;
	this.y = y;
}

Point.prototype = {
	x: 0,
	y: 0
};