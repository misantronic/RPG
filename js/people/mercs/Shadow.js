function Shadow(equip) {
	Merc.call(this, {
		name: 'Kyle Simmons',
		nickname: 'Shadow',
		thumb: './img/people/mercs/shadow.jpg',
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
		medical: 30,
		energy: 100,
		hp: 95
	});

	if(equip) {
		var helmet 	= new SteelHelmet();
		var west 	= new KevlarWest();
		var shorts 	= new KevlarShorts();
		var colt 	= new Colt_Commando();

		colt.reload(new $5_56MM(Ammo.TYPE_BALL));

		this
			.equip(helmet, west, shorts, colt, new $5_56MM(Ammo.TYPE_BALL), new $5_56MM(Ammo.TYPE_GLASER))
			.putOn(helmet, west, shorts)
			.grab(colt);
	}
}

Shadow.prototype = new Merc();
Shadow.prototype.constructor = Shadow;