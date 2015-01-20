function MP5K() {
	Weapon.call(this, Weapon.SMG, {
		name: 'H&K MP5K',
		thumb: './img/weapons/mp5k.jpg',
		damage: 23,
		ammo: $9x19MM,
		magazine: 30,
		range: 11,
		ap: [ 6, 9, 10 ],
		weight: 2.1,
		size: Item.MEDIUM,
		hands: 1
	});
}

MP5K.prototype = new Weapon();
MP5K.constructor = MP5K;