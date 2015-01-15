function Colt_Commando() {
	Weapon.call(this, Weapon.ASSAULT_RIFLE, {
		name: 'Colt Commando',
		damage: 29,
		ammo: $5_56MM,
		magazine: 30,
		range: 20,
		ap: [ 6, 10 ],
		weight: 2.6,
		size: Item.LARGE
	});
}

Colt_Commando.prototype = new Weapon();
Colt_Commando.constructor = Colt_Commando;