/**
 *
 * @constructor
 */
function KevlarShorts() {
	Wear.call(this, Person.LEGS, {
		name: 'Kevlaer Shorts',
		armor: 0.55,
		weight: 0.8,
		size: Item.MEDIUM
	});
}

KevlarShorts.prototype = new Wear();
KevlarShorts.constructor = KevlarShorts;