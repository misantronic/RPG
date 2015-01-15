/**
 *
 * @constructor
 */
function KevlarWest() {
	Wear.call(this, Human.BODY, {
		armor: 60,
		weight: 1
	});
}

KevlarWest.prototype = new Wear();
KevlarWest.constructor = KevlarWest;