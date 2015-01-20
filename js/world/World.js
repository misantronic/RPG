World = {
	addPeople: function() {
		for (var person in arguments) {
			if(arguments.hasOwnProperty(person)) {
				World.PEOPLE.push(arguments[person]);
			}

		}
	},

	/**
	 *
	 * @param {String} team
	 * @param {Person} person
	 */
	joinTeam: function(team, person) {
		World.TEAMS[team].push(person);
	},

	/**
	 *
	 * @param {Point} coord
	 * @return {Person|null}
	 */
	getPerson: function(coord) {
		var person;
		for(var i=0; i < this.PEOPLE.length; i++) {
			person = this.PEOPLE[i];
			if(person.coord.x == coord.x && person.coord.y == coord.y && !person.isDead)
				return person;
		}
		return null;
	}
};

World.PEOPLE = [];
World.TEAMS = {
	A: [],
	B: []
};