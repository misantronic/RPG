function $5_56MM(type, rounds) {
	if(type == undefined) 	type = Ammo.TYPE_BALL;
	if(rounds == undefined) rounds = 30;

	Ammo.call(this, Ammo.$5_56MM, {
		name: '5.56mm',
		weight: 0.1,
		size: Item.SMALL,
		type: type,
		rounds: rounds
	});
}

$5_56MM.prototype = new Ammo();
$5_56MM.constructor = $5_56MM;