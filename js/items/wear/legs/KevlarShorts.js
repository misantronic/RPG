/**
 *
 * @constructor
 */
function KevlarShorts() {
	Wear.call(this, Human.LEGS, {
		armor: 55,
		weight: 0.8
	});
}

KevlarShorts.prototype = new Wear();
KevlarShorts.constructor = KevlarShorts;