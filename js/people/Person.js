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
		this._wear = {
			head: new Wear(),
			body: new Wear(),
			legs: new Wear()
		};

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
Person.prototype._coord = new Point(1, 1);

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
 * @type {boolean}
 * @private
 */
Person.prototype._bleeding = false;

/**
 * @param {...Array} arguments items
 * @returns {Person}
 */
Person.prototype.putOn = function() {
	var items = Array.prototype.slice.call(arguments);

	items.forEach(
		/**
		 * @param {Wear} item
		 */
		function(wear) {
			this._wear[wear.type] = wear;
		}.bind(this)
	);

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
 * @param {...Array} arguments items
 * @returns {Person}
 */
Person.prototype.equip = function() {
	var items = Array.prototype.slice.call(arguments);

	items.forEach(
		/**
		 * @param {Item} item
		 */
		function(item) {
			this._inventory[item.size].push(item);
		}.bind(this)
	);

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
	var ap = (this._stats.agi + (this._stats.dex * 0.5) + (this._energy * 0.5) + ((this._hp / this._stats.hea) * 100)) / 3;
	ap = Math.round(ap);

	this._ap = ap;

	World.draw();

	return this;
};

Person.prototype.endTurn = function() {
	return this;
};

/**
 *
 * @param {Point} coord
 * @return {{walkingDistance: Array, sightDistance: number, costTotal: number, costPerTile: number}}
 * @private
 */
Person.prototype._calculateDistance = function(coord) {
	// TODO: consider world map resp. obsticales

	// calculate per-tile cost
	var tileCost = 0;
	if(this._stance == Person.STAND) 		tileCost = 8;
	else if(this._stance == Person.CROUCH) 	tileCost = 12;
	else if(this._stance == Person.PRONE) 	tileCost = 16;

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
		div = Math.floor(lgDist.length / shDist.length),
		index = 0,
		walkingDist = [];

	lgDist.forEach(function(p1, i) {
		if(i != 0 && i % div == 0) index++;

		if(shDist[index] == undefined) index--;

		if(lgDist.type == 'x') 		walkingDist.push( new Point(p1, shDist[index]) );
		else if(lgDist.type == 'y') walkingDist.push( new Point(shDist[index], p1) );
	});

	// check if last element equals the target coord
	var lastPoint = walkingDist[walkingDist.length-1];
	if(lastPoint.x != coord.x || lastPoint.y != coord.y) {
		walkingDist.push(coord);
	}
	walkingDist.shift();

	var costTotal = tileCost * walkingDist.length;

	// calculate sight distance (c² = a² + b²)
	var sightDist = Math.sqrt(Math.pow(coord.x - this._coord.x, 2) + Math.pow(coord.y - this._coord.y, 2));
	sightDist = Math.round(sightDist * 100) / 100;

	return {
		walkingDistance: walkingDist,
		sightDistance: sightDist,
		costTotal: costTotal,
		costPerTile: tileCost
	};
};

/**
 *
 * @return {Array}
 */
Person.prototype.calculateSight = function() {
	var direction = 'S';

	var sight = [];
	if(direction == 'S') {
		sight = [
			new Point(this._coord.x - 1, this._coord.y), new Point(this._coord.x + 1, this._coord.y ),
			new Point(this._coord.x - 1, this._coord.y + 1), new Point(this._coord.x, this._coord.y + 1), new Point(this._coord.x + 1, this._coord.y + 1),
			new Point(this._coord.x - 1, this._coord.y + 2), new Point(this._coord.x, this._coord.y + 2), new Point(this._coord.x + 1, this._coord.y + 2)
		]
	}

	return sight;
};

/**
 * @param {Point} coord
 * @param {Function} [callback]
 */
Person.prototype.walk = function(coord, callback) {
	var distance = this._calculateDistance(coord);

	this.log(this.logName +" walks from ("+ this._coord.x +"/"+ this._coord.y +") to ("+ coord.x +"/"+ coord.y +")");

	console.log("distance", distance);

	// animate walking
	var i = 0;
	var intervalId = setInterval(function() {
		if(this._ap - distance.costPerTile < 0) {
			onWalkingEnd.call(this);
			return false;
		}

		this._ap -= distance.costPerTile;
		this._coord = distance.walkingDistance[i];
		World.draw();

		if(++i >= distance.walkingDistance.length) onWalkingEnd.call(this);
	}.bind(this), 250);

	function onWalkingEnd() {
		clearInterval(intervalId);
		if(callback) callback.call();
	}

	return this;
};

/**
 *
 * @param {Point} coord
 */
Person.prototype.calculateShotCost = function(coord) {
	var distance = this._calculateDistance(coord);
};

/**
 *
 * @param {Point} coord
 * @param {Person.HEAD|Person.BODY|Person.LEGS} bodypart
 * @param {Number} accuracy 0.0 - 1.0
 * @param {Number} rounds number of bullets
 */
Person.prototype.shoot = function(coord, bodypart, accuracy, rounds) {
	if(rounds == undefined) rounds = 1;

	var distance = this._calculateDistance(coord),
		targetName = "("+coord.x+"/"+coord.y+")",
		me = this.logName;

	// calculate accuracy
	accuracy = 0.5 + (0.5 * accuracy);

	// calculate if bullet hits, for every weapon in hand
	this._hands.forEach(
		/** @param {Weapon} weapon */
		function(weapon) {
			if(!(weapon instanceof Weapon)) return;
			if(weapon.ammo.rounds == 0) {
				this.log(me +"'s "+ weapon.name + "is out of ammo.");
				return;
			}

			for(var i=0; i < rounds; i++) {
				if(weapon.ammo.rounds < 1) break;

				// reduce ammo
				weapon.ammo.rounds -= 1;

				// reduce weapon condition
				weapon.condition -= 0.0015;

				// calculate range factor
				var chance_range = weapon.range / distance.sightDistance;

				// get target to shoot at
				/** @type {Person|null} target */
				var target = World.getPerson(coord);

				if(!target) return;

				// calculate stance factor
				if(target.stance != this._stance) {
					switch(this._stance) {
						case Person.STAND:
							if(target.stance == Person.CROUCH) accuracy /= 1.1;	// reduce by 10%
							if(target.stance == Person.PRONE) accuracy /= 1.2;	// reduce by 20%
							break;
						case Person.CROUCH:
							if(target.stance == Person.STAND) accuracy *= 1.1;	// improve by 10%
							if(target.stance == Person.PRONE) accuracy /= 1.1;	// reduce by 10%
							break;
						case Person.PRONE:
							if(target.stance == Person.STAND) accuracy *= 1.2;	// improve by 20%
							if(target.stance == Person.CROUCH) accuracy *= 1.1;	// improve by 20%
							break;
						default:
					}
				}

				targetName = target.logName;

				var chance_of_hit = Math.round(chance_range * accuracy * 100) / 100;
				var random = this.MT.random();

				// consider marksmanship
				chance_of_hit *= (this._stats.mrk / 100);

				// max 95% change of hit
				if(chance_of_hit > 0.95) chance_of_hit = 0.95;

				this.log(me +" tries to shoot "+ targetName +" with "+ chance_of_hit +" chance of hitting.");

				if(random <= chance_of_hit) {
					// hit
					var dmg = target.dealDamage(weapon, bodypart);

					var msg = me + " deals "+ dmg +" damage on "+ targetName +" leaving him with "+ target.hp +"hp.";
					if(target.bleeding) msg += " "+ targetName + " is bleeding.";

					// check death
					if(target.isDead) {
						msg += "<br/>"+ target.logName +" dies.";
					}

					this.log(msg);
				} else {
					// miss
					this.log(me, "misses.");
				}
			}
		}.bind(this)
	);

	return this;
};

/**
 *
 * @param {Weapon} weapon
 * @param {Person.HEAD|Person.BODY|Person.LEGS} [bodypart]
 * @returns {number} damage
 */
Person.prototype.dealDamage = function(weapon, bodypart) {
	if(!bodypart) bodypart = Person.BODY;

	/** @type {Wear} wear */
	var wear 			= this._wear[bodypart],
		ammoBodyProp 	= Ammo.PROPERTIES[weapon.ammo.type][0],
		ammoArmorProp 	= Ammo.PROPERTIES[weapon.ammo.type][1];

	// calculate damage
	var damage = (weapon.damage * ammoBodyProp) - (wear.armor * ammoArmorProp);
	if(damage < 0) damage = 0;

	// consider bodyparts
	if(bodypart == Person.HEAD) damage *= 1.5;

	// add random
	var random = this.MT.random();
	if(random <= 0.33) {
		damage -= Math.round(damage * 0.1 * this.MT.random());
	} else if(random > 0.66) {
		damage += Math.round(damage * 0.1 * this.MT.random());
	}

	// round damage
	damage = Math.round(damage);

	this._hp -= damage;

	// armors condition is reduced
	wear.condition -= 0.0015;

	// calculate bleeding (40% chance)
	if(!this._bleeding) this._bleeding = damage > 15 && this.MT.random() <= 0.4;

	return damage;
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

Object.defineProperty(Person.prototype, "bleeding", {
	get: function () {
		return this._bleeding;
	},

	/** @param {Boolean} val */
	set: function(val) {
		this._bleeding = val;
	}
});

Object.defineProperty(Person.prototype, "logName", {
	get: function () {
		return "<a href=\"#/people/"+ this._nickname +"\">"+ this._nickname +"</a>";
	}
});

Object.defineProperty(Person.prototype, "isDead", {
	get: function () {
		return this._hp <= 0;
	}
});
