function AK_74() {
	Weapon.call(this, Weapon.ASSAULT_RIFLE, {
		name: 'AK-74',
		damage: 28,
		ammo: $5_45MM,
		magazine: 30,
		range: 35,
		ap: [ 5, 9 ],
		weight: 3.6,
		size: Item.LARGE,
		hands: 2
	});
}

AK_74.prototype = new Weapon();
AK_74.constructor = AK_74;