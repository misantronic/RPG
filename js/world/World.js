World = {
	tileWidth		: 40,

	canvasCoord		: HTMLCanvasElement,
	canvasPeople	: HTMLCanvasElement,
	canvasSight		: HTMLCanvasElement,
	canvasObstacles	: HTMLCanvasElement,
	canvasWidth		: 0,
	canvasHeight	: 0,
	ctxCoord		: CanvasRenderingContext2D,
	ctxPeople		: CanvasRenderingContext2D,
	ctxSight		: CanvasRenderingContext2D,
	ctxObstacles	: CanvasRenderingContext2D,
	/** @type {Person} selectedMerc */
	selectedMerc	: Merc,

	_drawCoord		: true,
	_drawObstacles	: true,
	/** @type {Boolean} _drawSight */
	_drawSight		: null,

	init: function() {
		this.canvasCoord 		= document.getElementById('world-coord');
		this.ctxCoord 			= this.canvasCoord.getContext('2d');

		this.canvasPeople 		= document.getElementById('world-people');
		this.ctxPeople 			= this.canvasPeople.getContext('2d');

		this.canvasSight 		= document.getElementById('world-sight');
		this.ctxSight 			= this.canvasSight.getContext('2d');

		this.canvasObstacles 	= document.getElementById('world-obstacles');
		this.ctxObstacles		= this.canvasObstacles.getContext('2d');

		this.canvasWidth 	= this.canvasCoord.width;
		this.canvasHeight 	= this.canvasCoord.height;

		// keyboard
		window.addEventListener("keydown", function(e) {
			if(e.keyCode == 83 && ! this._drawSight) {
				// show sight
				this._drawSight = true;
				this.draw();
			}
		}.bind(this));

		window.addEventListener("keyup", function(e) {
			if(e.keyCode == 83) {
				// hide sight
				this._drawSight = false;
				this.draw();
			}
		}.bind(this));

		// obstacles
		var ob1 = new Obstacle(new Point(7, 7), 0.33);
		var ob2 = new Obstacle(new Point(7, 6), 0.66);
		var ob3 = new Obstacle(new Point(2, 3), 0.66);
		var ob4 = new Obstacle(new Point(9, 5), 0.66);
		var ob5 = new Obstacle(new Point(8, 3), 0.66);
		var ob6 = new Obstacle(new Point(8, 4), 0.66);
		var ob7 = new Obstacle(new Point(4, 2), 0.66);
		var ob8 = new Obstacle(new Point(2, 6), 0.66);
		var ob9 = new Obstacle(new Point(5, 8), 0.66);
		var ob10 = new Obstacle(new Point(5, 6), 0.66);
		var ob11 = new Obstacle(new Point(7, 2), 0.66);
		var ob12 = new Obstacle(new Point(6, 2), 0.66);
		var ob13 = new Obstacle(new Point(2, 7), 0.66);
		var ob14 = new Obstacle(new Point(3, 2), 0.66);

		World.OBSTACLES.push(ob1, ob2, ob3, ob4, ob5, ob6, ob7, ob8, ob9, ob10, ob11, ob12, ob13, ob14);

		this.draw();
	},

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
	},

	/**
	 *
	 * @param {Point} coord
	 * @return {Obstacle|null}
	 */
	getObstacle: function(coord) {
		var obstacle;
		for(var i=0; i < this.OBSTACLES.length; i++) {
			obstacle = this.OBSTACLES[i];
			if(obstacle.x == coord.x && obstacle.y == coord.y)
				return obstacle;
		}

		return null;
	},

	draw: function() {
		this.ctxPeople.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		this.ctxSight.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

		if(this._drawObstacles) {
			this.ctxObstacles.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		}

		// draw coordinates
		var maxX = this.canvasWidth / this.tileWidth;
		var maxY = this.canvasHeight / this.tileWidth;

		for(var y = 0; y < maxY; y++) {
			for(var x = 0; x < maxX; x++) {
				this._drawTile(new Point(x+1, y+1));
			}
		}

		this._drawObstacles = false;

		if(this._drawSight) {
			/** @type {Array} sight **/
			var sight = this.selectedMerc.calculateSight();
			/** @param {Point} p */
			var p;
			/** @type {Obstacle} obstacle **/
			var obstacle;
			var shadowLength = 1;

			for(var i=0; i < sight.length; i++) {
				p = sight[i];
				x = (p.x - 1) * this.tileWidth;
				y = (p.y - 1) * this.tileWidth;
				obstacle = p.obstacle;

				if(obstacle) {
					shadowLength = obstacle.shadowLength;

					function getAlpha(a, b) {
						var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

						// calculate alpha degree in triangle
						var alpha = Math.round(Math.asin(a/c) * (180 / Math.PI));
						if(alpha <= -90 || alpha >= 90) alpha = 0;

						return alpha;
					}

					var p1 = [],
						p2 = [],
						p3 = [],
						a = 0, b = 0;

					switch(this.selectedMerc.direction) {
						case Person.EAST:
							a = p.y - this.selectedMerc.coord.y;
							b = p.x - this.selectedMerc.coord.x;

							p1 = this._getPointsAdditions(p, 1, 1, shadowLength); // new Point(p.x+1, p.y+1);
							p2 = this._getPointsAdditions(p, 1, -1, shadowLength); // new Point(p.x+1, p.y-1);
							p3 = this._getPointsAdditions(p, 1, 0, shadowLength); // new Point(p.x+1, p.y);
							break;
						case Person.WEST:
							a = p.y - this.selectedMerc.coord.y;
							b = p.x - this.selectedMerc.coord.x;

							p1 = this._getPointsAdditions(p, -1, 1, shadowLength); // new Point(p.x-1, p.y+1);
							p2 = this._getPointsAdditions(p, -1, -1, shadowLength); // new Point(p.x-1, p.y-1);
							p3 = this._getPointsAdditions(p, -1, 0, shadowLength); // new Point(p.x-1, p.y);
							break;
						case Person.NORTH:
							a = this.selectedMerc.coord.x - p.x;
							b = p.y - this.selectedMerc.coord.y;

							p1 = this._getPointsAdditions(p, -1, -1, shadowLength); // new Point(p.x-1, p.y-1);
							p2 = this._getPointsAdditions(p, 1, -1, shadowLength); // new Point(p.x+1, p.y-1);
							p3 = this._getPointsAdditions(p, 0, -1, shadowLength); // new Point(p.x, p.y-1);
							break;
						case Person.SOUTH:
							a = p.x - this.selectedMerc.coord.x;
							b = p.y - this.selectedMerc.coord.y;

							p1 = this._getPointsAdditions(p, 1, 1, shadowLength); // new Point(p.x+1, p.y+1);
							p2 = this._getPointsAdditions(p, -1, 1, shadowLength); // new Point(p.x-1, p.y+1);
							p3 = this._getPointsAdditions(p, 0, 1, shadowLength); // new Point(p.x, p.y+1);
							break;
					}

					var alpha = getAlpha(a, b);

					console.log(p, alpha);

					/** @type {Array} points **/
					var points;

					if(alpha >= 34) {
						points = this._getPoints(sight, p1);
					} else if(alpha <= -34) {
						points = this._getPoints(sight, p2);
					} else {
						points = this._getPoints(sight, p3);
					}

					console.log("points", points);

					/** @type {Point} point */
					var point;
					for(var j=0; j < points.length; j++) {
						point = points[j];
						point.color = '#CC0000';
					}
				}

				this.ctxSight.fillStyle = p.color;

				this.ctxSight.fillRect(x, y, this.tileWidth, this.tileWidth);
				this.ctxSight.fill();
			}
		}

		this._drawCoord = false;
	},

	/**
	 *
	 * @param {Array} list
	 * @param {Point} point
	 * @returns {Point|null}
	 * @private
	 */
	_getPoint: function(list, point) {
		for(var i=0; i < list.length; i++) {
			if(list[i].x == point.x && list[i].y == point.y) return list[i];
		}
		return null;
	},

	/**
	 *
	 * @param {Array} list
	 * @param {Array} points
	 * @returns {Array}
	 * @private
	 */
	_getPoints: function(list, points) {
		/** @type {Point} point **/
		var point;
		var newPoints = [];
		for(var i=0; i < points.length; i++) {
			point = this._getPoint(list, points[i]);
			if(point) newPoints.push(point);
		}

		return newPoints;
	},

	/**
	 *
	 * @param {Point} point
	 * @param {number} addX
	 * @param {number} addY
	 * @param {number} length
	 * @private
	 */
	_getPointsAdditions: function(point, addX, addY, length) {
		var points = [];
		for(var i=0; i < length; i++) {
			points.push( new Point(point.x + addX, point.y + addY) );

			addX += addX == 0 ? 0 : addX > 0 ? 1 : -1;
			addY += addY == 0 ? 0 : addY > 0 ? 1 : -1;
		}

		return points;
	},

	/**
	 *
	 * @param {Point} coord
	 * @private
	 */
	_drawTile: function(coord) {
		var xi = coord.x - 1, yi = coord.y - 1,
			x = xi * this.tileWidth, y = yi * this.tileWidth;

		// draw coordinate
		if(this._drawCoord) {
			this.ctxCoord.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
			this.ctxCoord.strokeStyle = "#EEE";
			this.ctxCoord.rect(x, y, this.tileWidth, this.tileWidth);
			this.ctxCoord.stroke();

			// draw field number
			//this.ctxCoord.font = "11px sans-serif";
			//this.ctxCoord.fillStyle = "#F1F1F1";
			//this.ctxCoord.fillText("("+ coord.x +"/"+ coord.y +")", x, y - 5);
		}

		// look for people
		var person = this.getPerson(coord);
		if(person) {
			this.ctxPeople.font = "11px sans-serif";
			var text = this.ctxPeople.measureText(person.nickname.substr(0, 1).toUpperCase());
			this.ctxPeople.fillText(person.nickname.substr(0, 1).toUpperCase(), x + ((this.tileWidth / 2) - (text.width / 2)), y + (this.tileWidth / 2) - 4, this.tileWidth);
			if(person.AP != Infinity) {
				this.ctxPeople.font = "9px sans-serif";
				text = this.ctxPeople.measureText("("+person.AP+")");
				this.ctxPeople.fillText("("+person.AP+")", x + ((this.tileWidth / 2) - (text.width / 2)), y + (this.tileWidth / 2) + 6, this.tileWidth);
			}
		}

		// obstacles
		if(this._drawObstacles) {
			this.ctxObstacles.font = "11px sans-serif";
			this.ctxObstacles.fillStyle = "#CCC";

			this.OBSTACLES.forEach(
				/** @param {Obstacle} obstacle */
				function(obstacle) {
					if(obstacle.x == coord.x && obstacle.y == coord.y) {
						var text = this.ctxObstacles.measureText("O");
						this.ctxObstacles.fillText("O", x + this.tileWidth - 12, y + this.tileWidth - 4, this.tileWidth);
					}
				}.bind(this)
			);

			//this._drawObstacles = false;
		}
	}
};

World.NIGHT 	= 'night';
World.EVENING 	= 'evening';
World.DAY		= 'day';
World.MORNING 	= 'morning';

World.daytime = World.DAY;

World.OBSTACLES = [];
World.PEOPLE = [];
World.TEAMS = {
	A: [],
	B: []
};