function Shadow(equip) {
	Merc.call(this, {
		health: 95,
		agility: 96,
		dexterity: 83,
		strength: 88,
		leadership: 35,
		wisdom: 77,
		level: 5,
		marksmanship: 92,
		explosives: 22,
		mecanical: 35,
		medical: 30
	}, 'Kyle Simmons', 'Shadow');

	if(equip) {
		var helmet 	= new SteelHelmet();
		var west 	= new KevlarWest();
		var shorts 	= new KevlarShorts();
		var colt 	= new Colt_Commando();

		this
			.equip(helmet)
			.equip(west)
			.equip(shorts)
			.equip(colt)
			.equip(new $5_56MM())
			.equip(new $5_56MM())
			.grab(colt);
	}
}

Shadow.prototype = new Merc();
Shadow.prototype.constructor = Shadow;