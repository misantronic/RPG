function Colt_Commando() {
	Weapon.call(this, Weapon.ASSAULT_RIFLE, {
		name: 'Colt Commando',
		thumb: './img/weapons/colt_commando.jpg',
		damage: 30,
		caliber: $5_56MM,
		magazine: 30,
		range: 28,
		ap: [ 5, 9 ],
		weight: 2.6,
		size: Item.LARGE,
		hands: 2
	});
}

Colt_Commando.prototype = new Weapon();
Colt_Commando.constructor = Colt_Commando;