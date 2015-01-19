World = {
	addPeople: function() {
		for (var person in arguments) {
			if(arguments.hasOwnProperty(person)) {
				World.PEOPLE.push(arguments[person]);
			}

		}
	}
};

World.PEOPLE = [];