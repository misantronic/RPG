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
	 * @param {Point|String} coordOrNickname coord or nickname
	 * @return {Person|null}
	 */
	getPerson: function(coordOrNickname) {
		var person;
		for(var i=0; i < this.PEOPLE.length; i++) {
			person = this.PEOPLE[i];
			if(person.isDead) break;

			if(coordOrNickname instanceof Point) {
				if(person.coord.x == coordOrNickname.x && person.coord.y == coordOrNickname.y)
					return person;
			} else {
				if(person.nickname.toLowerCase() == coordOrNickname.toLowerCase()) return person;
			}
		}

		return null;
	}
};

World.PEOPLE = [];
World.TEAMS = {
	A: [],
	B: []
};