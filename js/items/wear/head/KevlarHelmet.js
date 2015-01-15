/**
 *
 * @constructor
 */
function KevlarHelmet() {
	Wear.call(this, Human.HEAD, {
		armor: 60,
		weight: 0.5,
		size: Item.SMALL
	});
}

KevlarHelmet.prototype = new Wear();
KevlarHelmet.constructor = KevlarHelmet;