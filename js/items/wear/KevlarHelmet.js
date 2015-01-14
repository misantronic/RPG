/**
 *
 * @constructor
 */
function KevlarHelmet() {
	Wear.call(this, Human.HEAD, {
		armor: 75
	});
}

KevlarHelmet.prototype = new Wear();
KevlarHelmet.constructor = KevlarHelmet;