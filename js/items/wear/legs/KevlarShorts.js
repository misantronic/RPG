/**
 *
 * @constructor
 */
function KevlarShorts() {
	Wear.call(this, Wear.LEGS, {
		name: 'Kevlaer Shorts',
		armor: 55,
		weight: 0.8,
		size: Item.MEDIUM
	});
}

KevlarShorts.prototype = new Wear();
KevlarShorts.constructor = KevlarShorts;