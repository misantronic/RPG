function $5_45MM() {
	Ammo.call(this, Ammo.$5_45MM, {
		name: '5.45mm',
		weight: 0.1,
		size: Item.SMALL
	});
}

$5_45MM.prototype = new Ammo();
$5_45MM.constructor = $5_45MM;