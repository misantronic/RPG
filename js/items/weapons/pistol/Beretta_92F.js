function Beretta_92F() {
	Weapon.call(this, Weapon.PISTOL, {
		name: 'Beretta 92F',
		damage: 22,
		ammo: $9MM,
		magazine: 15,
		range: 12,
		ap: [ 6 ],
		weight: 1.1,
		size: Item.SMALL,
		hands: 1
	});
}

Beretta_92F.prototype = new Weapon();
Beretta_92F.constructor = Beretta_92F;