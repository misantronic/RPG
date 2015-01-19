/**
 *
 * @constructor
 */
function KevlarWest() {
	Wear.call(this, Human.BODY, {
		name: 'Kevlar West',
		armor: 60,
		weight: 1,
		size: Item.MEDIUM
	});
}

KevlarWest.prototype = new Wear();
KevlarWest.constructor = KevlarWest;