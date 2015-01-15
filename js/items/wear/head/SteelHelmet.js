/**
 *
 * @constructor
 */
function SteelHelmet() {
	Wear.call(this, Human.HEAD, {
		armor: 40,
		weight: 0.4,
		size: Item.SMALL
	});
}

SteelHelmet.prototype = new Wear();
SteelHelmet.constructor = SteelHelmet;