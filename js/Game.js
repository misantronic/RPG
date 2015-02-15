function Game() {
	Minc([
			'./bower_components/300494/mersenne-twister.js',

			'js/Point.js',
			'js/Abstract.js',
			'js/world/Obstacle.js',

			// items
			'js/items/Item.js',
			'js/items/Wear.js',
			'js/items/Ammo.js',
			'js/items/Weapon.js',

			// people
			'js/people/Person.js',
			'js/people/Merc.js',
			'js/people/mercs/Shadow.js',
			'js/people/mercs/Ivan.js',

			// Wear
			'js/items/wear/head/SteelHelmet.js',
			'js/items/wear/body/KevlarWest.js',
			'js/items/wear/legs/KevlarShorts.js',

			// Ammo
			'js/items/ammo/9mm.js',
			'js/items/ammo/5.56mm.js',
			'js/items/ammo/5.45mm.js',

			// Weapons
			'js/items/weapons/pistol/Beretta_92F.js',
			'js/items/weapons/assault_rifle/Colt_Commando.js',
			'js/items/weapons/smg/MP5K.js',
			'js/items/weapons/assault_rifle/AK-74.js',

			'js/world/World.js'
		]
	).done(this._init.bind(this));

	location.hash = "";
	window.onhashchange = this._onHashChange.bind(this);
}

Game.prototype._init = function() {
	window.shadow = new Shadow(true);
	window.ivan = new Ivan(true);

	World.addPeople(shadow, ivan);
	World.joinTeam('A', shadow);
	World.joinTeam('B', ivan);
	World.init();
	World.selectedMerc = ivan;

	ivan.walk(new Point(5, 4), function() {
		ivan.direction = Person.NORTHEAST;
	});
};

Game.prototype._onHashChange = function(e) {
	var hash = location.hash.substr(2);
	var parts = hash.split("/");

	if(parts.length != 2) return;

	var worldResrc 	= parts[0];
	var id 			= parts[1];

	switch(worldResrc) {
		case 'people':
			var person = World.getPerson(id);
			console.log(person);
			break;
        case 'ammo':
            var obstacle = World.getObstacle(new Point(1,2));
                console.log(obstacle);
            break;
	}
};