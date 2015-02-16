/**
 *
 * @param {Number} [x]
 * @param {Number} [y]
 * @param {Obstacle} [obstacle]
 * @constructor
 */
function Point(x, y, obstacle) {
	if(!x) x = 0;
	if(!y) y = 0;

	this.x = x;
	this.y = y;

	if(obstacle) this.obstacle = obstacle;
}

Point.prototype = {
	x: 0,
	y: 0,
	/** @type {Obstacle} obstacle **/
	obstacle: null,
	/** @type {String} color **/
	color: '#00CC00'
};