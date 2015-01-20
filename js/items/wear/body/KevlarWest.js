/**
 *
 * @constructor
 */
function KevlarWest() {
	Wear.call(this, Person.BODY, {
		name: 'Kevlar West',
		armor: 1,
		weight: 1,
		size: Item.MEDIUM
	});
}

KevlarWest.prototype = new Wear();
KevlarWest.constructor = KevlarWest;