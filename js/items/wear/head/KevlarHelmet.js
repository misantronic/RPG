/**
 *
 * @constructor
 */
function KevlarHelmet() {
	Wear.call(this, Person.HEAD, {
		name: 'Kevlar Helmet',
		armor: 0.6,
		weight: 0.5,
		size: Item.SMALL
	});
}

KevlarHelmet.prototype = new Wear();
KevlarHelmet.constructor = KevlarHelmet;