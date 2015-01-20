function AK_74() {
	Weapon.call(this, Weapon.ASSAULT_RIFLE, {
		name: 'AK-74',
		thumb: './img/weapons/ak-74.jpg',
		damage: 30,
		caliber: $5_45MM,
		magazine: 30,
		range: 33,
		ap: [ 6, 11 ],
		weight: 3.6,
		size: Item.LARGE,
		hands: 2
	});
}

AK_74.prototype = new Weapon();
AK_74.constructor = AK_74;