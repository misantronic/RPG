function $9MM() {
	Ammo.call(this, Ammo.$9MM, {
		name: '9mm',
		weight: 0.1,
		size: Item.SMALL
	});
}

$9MM.prototype = new Ammo();
$9MM.constructor = $9MM;