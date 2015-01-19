function $9x19MM(type, rounds) {
	if(type == undefined) 	type = Ammo.TYPE_BALL;
	if(rounds == undefined) rounds = 15;

	Ammo.call(this, Ammo.$9x19MM, {
		name: '9x19mm',
		weight: 0.1,
		size: Item.SMALL,
		type: type,
		rounds: rounds
	});
}

$9x19MM.prototype = new Ammo();
$9x19MM.constructor = $9x19MM;