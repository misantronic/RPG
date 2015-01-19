function $9x19MM(type) {
	if(!type) type = Ammo.TYPE_BALL;

	Ammo.call(this, Ammo.$9x19MM, {
		name: '9x19mm',
		weight: 0.1,
		size: Item.SMALL,
		type: type
	});
}

$9x19MM.prototype = new Ammo();
$9x19MM.constructor = $9x19MM;