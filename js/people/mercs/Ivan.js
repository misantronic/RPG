function Ivan(equip) {
	Merc.call(this, {
		name: 'Ivan Dolvich',
		nickname: 'Ivan',
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
		medical: 15
	});

	if(equip) {
		var helmet 	= new SteelHelmet();
		var west 	= new KevlarWest();
		var shorts 	= new KevlarShorts();
		var ak74 	= new AK_74();

		this
			.equip(helmet)
			.equip(west)
			.equip(shorts)
			.equip(ak74)
			.equip(new $5_45MM())
			.equip(new $5_45MM())
			.grab(ak74);
	}
}

Ivan.prototype = new Merc();
Ivan.prototype.constructor = Ivan;