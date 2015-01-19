/**
 *
 * @param {Object} [stats]
 * @constructor
 */
function Person(stats) {
	if(stats) {
		// reset
		this._stats = {};
		this._inventory = {
			sm: [],
			md: [],
			lg: []
		};
		this._hands = [];

		for(var stat in stats) {
			if(stats.hasOwnProperty(stat)) {
				this[stat] = stats[stat];
			}
		}
	}
}

Person.prototype = new Abstract();
Person.prototype.constructor = Person;

Person.STAND = 'stand';
Person.CROUCH = 'crouch';
Person.PRONE = 'prone';

Person.HEAD = 'head';
Person.BODY = 'body';
Person.LEGS = 'legs';

/**
 *
 * @type {string}
 * @private
 */
Person.prototype._name = '';

/**
 *
 * @type {string}
 * @private
 */
Person.prototype._nickname = '';

/**
 *
 * @type {Point}
 * @private
 */
Person.prototype._coord = new Point();

/**
 *
 * @type {{hea: number, agi: number, dex: number, str: number, ldr: number, wis: number, lvl: number, mec: number, exp: number, med: number, mrk: number}}
 * @private
 */
Person.prototype._stats = {
	hea: 0,
	agi: 0,
	dex: 0,
	str: 0,
	ldr: 0,
	wis: 0,
	lvl: 0,
	mec: 0,
	exp: 0,
	med: 0,
	mrk: 0
};

/**
 *
 * @type {{head: Wear, body: Wear, legs: Wear}}
 * @private
 */
Person.prototype._wear = {
	head: new Wear(),
	body: new Wear(),
	legs: new Wear()
};

/**
 *
 * @type {Array}
 * @private
 */
Person.prototype._hands = [];

/**
 *
 * @type {string}
 * @private
 */
Person.prototype._stance = Person.STAND;

/**
 *
 * @type {{sm: Array, md: Array, lg: Array}}
 * @private
 */
Person.prototype._inventory = {
	sm: [],
	md: [],
	lg: []
};

/**
 *
 * @type {Number}
 * @private
 */
Person.prototype._ap = Infinity;

/**
 *
 * @type {number}
 * @private
 */
Person.prototype._hp = 0;

/**
 *
 * @type {number}
 * @private
 */
Person.prototype._energy = 0;

/**
 *
 * @param {Wear} wear
 */
Person.prototype.putOn = function(wear) {
	if(!(wear instanceof Wear)) {
		console.warn(wear, "must be an instance of Wear().");
		return this;
	}

	this._wear[wear.type] = wear;

	return this;
};

/**
 *
 * @param {Wear} wear
 */
Person.prototype.takeOff = function(wear) {
	this._wear[wear.type] = '';

	return this;
};

/**
 *
 * @param {Item} item
 */
Person.prototype.equip = function(item) {
	if(!(item instanceof Item)) {
		console.warn(item, "must be an instance of Item().");
		return;
	}

	this._inventory[item.size].push(item);

	return this;
};

Person.prototype.unequip = function(item) {
	// remove from inventory
	this._inventory[item.size].forEach(function(invItem, i) {
		if(invItem === item) this._inventory[item.size].splice(i, 1);
	}.bind(this));

	// check hands
	this._hands.forEach(function(handItem, i) {
		if(handItem === item) this._hands.splice(i, 1);
	}.bind(this));

	//[Person.HEAD, Person.BODY, Person.LEGS].forEach(function(bodypart) {
	//	if(this._wear[bodypart] === item)
	//})

	return this;
};

/**
 *
 * @param {Item} item
 */
Person.prototype.grab = function(item) {
	// check if Person can grab item
	if(this._hands.length == 2) return this;
	for(var i=0; i < this._hands.length; i++) {
		/** @type {Item} handItem */
		var handItem = this._hands[i];
		if(handItem.hands == 2) return this;
	}

	// check if item is in inventory
	this._inventory[item.size].forEach(function(invItem) {
		if(invItem === item) this._hands.push(item);
	}.bind(this));

	return this;
};

Person.prototype.startTurn = function() {
	// calculate APs
	var ap = ((this._stats.agi * 1) + (this._stats.dex * 0.5) + (this._energy * 0.5) + ((this._hp / this._stats.hea) * 100)) / 3;
	ap = Math.round(ap);

	this._ap = ap;

	return this;
};

Person.prototype.endTurn = function() {


	return this;
};

/**
 *
 * @param {Point} coord
 * @return {{walkingDistance: Array, sightDistance: number, cost: number}}
 * @private
 */
Person.prototype._calculateDistance = function(coord) {
	// calculate walking distance
	// TODO: consider world map resp. obsticales
	var dist = Math.abs(this._coord.x - coord.x) + Math.abs(this._coord.y - coord.y);

	// calculate ap-cost
	var tileCost = 0;
	if(this._stance == Person.STAND) 		tileCost = 8;
	else if(this._stance == Person.CROUCH) 	tileCost = 12;
	else if(this._stance == Person.PRONE) 	tileCost = 16;

	var cost = tileCost * dist;

	// caluclate direct walking distance
	var distX = [], distY = [];
	for(var x = this._coord.x; this._coord.x < coord.x ? x <= coord.x : x >= coord.x; this._coord.x < coord.x ? x++ : x--) {
		distX.push(x);
	}
	distX.type = 'x';
	for(var y = this._coord.y; this._coord.y < coord.y ? y <= coord.y : y >= coord.y; this._coord.y < coord.y ? y++ : y--) {
		distY.push(y);
	}
	distY.type = 'y';

	// find out which is longest and shortest distance
	var lgDist = distX.length > distY.length ? distX : distY,
		shDist = distX.length > distY.length ? distY : distX,
		div = Math.ceil(lgDist.length / shDist.length),
		index = 0,
		walkingDist = [];

	lgDist.forEach(function(p1, i) {
		if(i != 0 && i % div == 0) index++;

		if(lgDist.type == 'x') 		walkingDist.push( new Point(p1, shDist[index]) );
		else if(lgDist.type == 'y') walkingDist.push( new Point(shDist[index], p1) );
	});

	// check if last element equals the target coord
	var lastPoint = walkingDist[walkingDist.length-1];
	if(lastPoint.x != coord.x || lastPoint.y != coord.y) {
		walkingDist.push(coord);
	}

	// calculate sight distance (c² = a² + b²)
	var sightDist = Math.sqrt(Math.pow(coord.x - this._coord.x, 2) + Math.pow(coord.y - this._coord.y, 2));
	sightDist = Math.round(sightDist * 100) / 100;

	return {
		walkingDistance: walkingDist,
		sightDistance: sightDist,
		cost: cost
	};
};

/**
 * @param {Point} coord
 */
Person.prototype.walk = function(coord) {
	var distance = this._calculateDistance(coord);
	var cost = distance.cost;

	this.log("<a href=\"#/person/"+ this._nickname +"\">"+ this._nickname +"</a> walks from ("+ this._coord.x +"/"+ this._coord.y +") to ("+ coord.x +"/"+ coord.y +")");

	console.log("- cost", cost);
	console.log("- walking distance", distance.walkingDistance);
	console.log("- sight distance", distance.sightDistance);

	if(this._ap - cost < 0) {
		return this;
	}

	this._coord = coord;

	this._ap -= cost;

	return this;
};

/**
 *
 * @param {Point} coord
 * @param {Person.HEAD|Person.BODY|Person.LEGS} bodypart
 * @param {Number} accuracy 0.0 - 1.0
 */
Person.prototype.shoot = function(coord, bodypart, accuracy) {
	var distance = this._calculateDistance(coord),
		target = "("+coord.x+"/"+coord.y+")",
		me = "<a href=\"#/person/"+ this._nickname +"\">"+ this._nickname +"</a>";

	// calculate accuracy
	accuracy = 0.5 + (0.5 * accuracy);

	// get person to shoot at
	/** @type {Person} person */
	var person;
	World.PEOPLE.forEach(
		/** @param {Person} somePerson */
		function(somePerson) {
			if(somePerson.coord.x == coord.x && somePerson.coord.y == coord.y) person = somePerson;
		}
	);

	// calculate if bullet hits, for every weapon in hand
	this._hands.forEach(
		/** @param {Weapon} weapon */
		function(weapon) {
			if(!(weapon instanceof Weapon)) return;
			if(weapon.ammo.rounds == 0) {
				this.log(me +"'s "+ weapon.name + "is out of ammo.");
				return;
			}
			// reduce ammo
			// todo: consider burst mode/auto
			weapon.ammo.rounds -= 1;

			// calculate range factor
			var chance_range = weapon.range / distance.sightDistance;

			if(person) {
				// calculate stance factor
				if(person.stance != this._stance) {
					switch(this._stance) {
						case Person.STAND:
							if(person.stance == Person.CROUCH) accuracy /= 1.1;	// reduce by 10%
							if(person.stance == Person.PRONE) accuracy /= 1.2;	// reduce by 20%
							break;
						case Person.CROUCH:
							if(person.stance == Person.STAND) accuracy *= 1.1;	// improve by 10%
							if(person.stance == Person.PRONE) accuracy /= 1.1;	// reduce by 10%
							break;
						case Person.PRONE:
							if(person.stance == Person.STAND) accuracy *= 1.2;	// improve by 20%
							if(person.stance == Person.CROUCH) accuracy *= 1.1;	// improve by 20%
							break;
						default:
					}
				}

				target = "<a href=\"#/person/"+ person.nickname +"\">"+ person.nickname +"</a>";
			}

			var chance_of_hit = Math.round(chance_range * accuracy * 100) / 100;
			var random = this.MT.random();

			// consider marksmanship
			chance_of_hit *= (this._stats.mrk / 100);

			// max 95% change of hit
			if(chance_of_hit > 0.95) chance_of_hit = 0.95;

			this.log(me, "tries to shoot at ", target, "with", chance_of_hit, "chance of hitting.");

			if(random <= chance_of_hit) {
				var dmg = person.dealDamage(weapon, bodypart);
				this.log(me, "deals "+ dmg +" damage on", target);
			} else {
				this.log(me, "misses.");
			}
		}.bind(this)
	);

	return this;
};

/**
 *
 * @param {Weapon} weapon
 * @param {Person.HEAD|Person.BODY|Person.LEGS} bodypart
 */
Person.prototype.dealDamage = function(weapon, bodypart) {
	/** @type {Wear} wear */
	var wear = this._wear[bodypart];
	console.log(weapon.damage, weapon.ammo.type, wear.armor);
};

/**
 *
 * @param {String} stance {Person.STAND|Person.CROUCH|Person.PRONE}
 */
Person.prototype.changeStance = function(stance) {
	this._stance = stance;
};

Object.defineProperty(Person.prototype, "weightInKG", {
	get: function () {
		var weight = 0,
			/** @type {Item} item **/
			item;
		[ Item.SMALL, Item.MEDIUM, Item.LARGE].forEach(function(type) {
			for(var i=0; i < this._inventory[type].length; i++) {
				item = this._inventory[type][i];
				weight += item.weight;
			}
		}.bind(this));

		return weight;
	}
});

Object.defineProperty(Person.prototype, "weightInPerc", {
	get: function () {
		return Math.round(this.weightInKG / this.strength * 100);
	}
});

// GETTER / SETTER

Object.defineProperty(Person.prototype, "name", {
	get: function () {
		return this._name;
	},

	set: function(val) {
		this._name = val;
	}
});

Object.defineProperty(Person.prototype, "nickname", {
	get: function () {
		return this._nickname;
	},

	set: function(val) {
		this._nickname = val;
	}
});

Object.defineProperty(Person.prototype, "health", {
	get: function () {
		return this._stats.hea;
	},

	set: function(val) {
		this._stats.hea = val;
	}
});

Object.defineProperty(Person.prototype, "agility", {
	get: function () {
		return this._stats.agi;
	},

	set: function(val) {
		this._stats.agi = val;
	}
});

Object.defineProperty(Person.prototype, "dexterity", {
	get: function () {
		return this._stats.dex;
	},

	set: function(val) {
		this._stats.dex = val;
	}
});

Object.defineProperty(Person.prototype, "strength", {
	get: function () {
		return this._stats.str;
	},

	set: function(val) {
		this._stats.str = val;
	}
});

Object.defineProperty(Person.prototype, "leadership", {
	get: function () {
		return this._stats.ldr;
	},

	set: function(val) {
		this._stats.ldr = val;
	}
});

Object.defineProperty(Person.prototype, "wisdom", {
	get: function () {
		return this._stats.wis;
	},

	set: function(val) {
		this._stats.wis = val;
	}
});

Object.defineProperty(Person.prototype, "level", {
	get: function () {
		return this._stats.lvl;
	},

	set: function(val) {
		this._stats.lvl = val;
	}
});

Object.defineProperty(Person.prototype, "mecanical", {
	get: function () {
		return this._stats.mec;
	},

	set: function(val) {
		this._stats.mec = val;
	}
});

Object.defineProperty(Person.prototype, "explosives", {
	get: function () {
		return this._stats.exp;
	},

	set: function(val) {
		this._stats.exp = val;
	}
});

Object.defineProperty(Person.prototype, "medical", {
	get: function () {
		return this._stats.med;
	},

	set: function(val) {
		this._stats.med = val;
	}
});

Object.defineProperty(Person.prototype, "marksmanship", {
	get: function () {
		return this._stats.mrk;
	},

	set: function(val) {
		this._stats.mrk = val;
	}
});

Object.defineProperty(Person.prototype, "AP", {
	get: function () {
		return this._ap;
	},

	set: function(val) {
		this._ap = val;
	}
});

Object.defineProperty(Person.prototype, "hp", {
	get: function () {
		return this._hp;
	},

	set: function(val) {
		this._hp = val;
	}
});

Object.defineProperty(Person.prototype, "energy", {
	get: function () {
		return this._energy;
	},

	set: function(val) {
		this._energy = val;
	}
});

Object.defineProperty(Person.prototype, "wear", {
	get: function () {
		return this._wear;
	}
});

Object.defineProperty(Person.prototype, "stance", {
	get: function () {
		return this._stance;
	}
});

Object.defineProperty(Person.prototype, "inventory", {
	get: function () {
		return this._inventory;
	}
});

Object.defineProperty(Person.prototype, "coord", {
	/** @return {Point} */
	get: function () {
		return this._coord;
	},

	/** @param {Point} val */
	set: function(val) {
		this._coord = val;
	}
});
