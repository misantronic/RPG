function $9MM(type) {
	if(!type) type = Ammo.TYPE_BALL;

	Ammo.call(this, Ammo.$9x19MM, {
		name: '9x19mm',
		weight: 0.1,
		size: Item.SMALL,
		type: type
	});
}

$9MM.prototype = new Ammo();
$9MM.constructor = $9MM;