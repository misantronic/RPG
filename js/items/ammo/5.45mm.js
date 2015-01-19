function $5_45MM(type, rounds) {
	if(type == undefined) 	type = Ammo.TYPE_BALL;
	if(rounds == undefined) rounds = 30;

	Ammo.call(this, Ammo.$5_45MM, {
		name: '5.45mm',
		weight: 0.1,
		size: Item.SMALL,
		type: type,
		rounds: rounds
	});
}

$5_45MM.prototype = new Ammo();
$5_45MM.constructor = $5_45MM;