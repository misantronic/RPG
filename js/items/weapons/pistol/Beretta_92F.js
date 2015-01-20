function Beretta_92F() {
	Weapon.call(this, Weapon.PISTOL, {
		name: 'Beretta 92F',
		thumb: './img/weapons/beretta_92f.jpg',
		damage: 23,
		caliber: $9x19MM,
		magazine: 15,
		range: 12,
		ap: [ 5 ],
		weight: 1.1,
		size: Item.SMALL,
		hands: 1
	});
}

Beretta_92F.prototype = new Weapon();
Beretta_92F.constructor = Beretta_92F;