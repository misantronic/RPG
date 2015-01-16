function Shadow() {
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
}

Shadow.prototype = new Merc();
Shadow.prototype.constructor = Shadow;