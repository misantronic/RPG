/**
 *
 * @constructor
 */
function SteelHelmet() {
	Wear.call(this, Human.HEAD, {
		armor: 40
	});
}

SteelHelmet.prototype = new Wear();
SteelHelmet.constructor = SteelHelmet;