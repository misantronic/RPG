function Ivan(equip) {
	Merc.call(this, {
		name: 'Ivan Dolvich',
		nickname: 'Ivan',
		thumb: './img/people/mercs/ivan.jpg',
		health: 94,
		agility: 90,
		dexterity: 95,
		strength: 87,
		leadership: 35,
		wisdom: 83,
		level: 4,
		marksmanship: 92,
		explosives: 55,
		mecanical: 14,
		medical: 15,
		energy: 100,
		hp: 94
	});

	if(equip) {
		var helmet 	= new SteelHelmet();
		var west 	= new KevlarWest();
		var shorts 	= new KevlarShorts();
		var ak74 	= new AK_74();

		ak74.reload(new $5_45MM(Ammo.TYPE_AP));

		this
			.equip(helmet, west, shorts, ak74, new $5_45MM(Ammo.TYPE_AP), new $5_45MM(Ammo.TYPE_HP))
			.putOn(helmet, west, shorts)
			.grab(ak74);
	}
}

Ivan.prototype = new Merc();
Ivan.prototype.constructor = Ivan;