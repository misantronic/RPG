function $5_56MM(type) {
	if(!type) type = Ammo.TYPE_BALL;

	Ammo.call(this, Ammo.$5_56MM, {
		name: '5.56mm',
		weight: 0.1,
		size: Item.SMALL,
		type: type
	});
}

$5_56MM.prototype = new Ammo();
$5_56MM.constructor = $5_56MM;