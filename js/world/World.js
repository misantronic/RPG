World = {
	tileWidth		: 40,
	canvasCoord		: HTMLCanvasElement,
	canvasPeople	: HTMLCanvasElement,
	canvasSight		: HTMLCanvasElement,
	canvasWidth		: 0,
	canvasHeight	: 0,
	ctxCoord		: CanvasRenderingContext2D,
	ctxPeople		: CanvasRenderingContext2D,
	ctxSight		: CanvasRenderingContext2D,

	_drawCoord		: true,
	/** @type {Person} _drawSight */
	_drawSight		: null,

	init: function() {
		this.canvasCoord 	= document.getElementById('world-coord');
		this.ctxCoord 		= this.canvasCoord.getContext('2d');

		this.canvasPeople 	= document.getElementById('world-people');
		this.ctxPeople 		= this.canvasPeople.getContext('2d');

		this.canvasSight 	= document.getElementById('world-sight');
		this.ctxSight 		= this.canvasPeople.getContext('2d');

		this.canvasWidth 	= this.canvasCoord.width;
		this.canvasHeight 	= this.canvasCoord.height;

		window.addEventListener("keydown", function(e) {
			if(e.keyCode == 83 && ! this._drawSight) {
				// show sight
				this._drawSight = shadow;
				this.draw();
			}
		}.bind(this));

		window.addEventListener("keyup", function(e) {
			if(e.keyCode == 83) {
				// hide sight
				this._drawSight = null;
				this.draw();
			}
		}.bind(this));

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

	draw: function() {
		this.ctxPeople.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

		// draw coordinates
		var maxX = this.canvasWidth / this.tileWidth;
		var maxY = this.canvasHeight / this.tileWidth;

		for(var y = 0; y < maxY; y++) {
			for(var x = 0; x < maxX; x++) {
				this._drawTile(new Point(x+1, y+1));
			}
		}

		if(this._drawSight) {
			console.log(this._drawSight);
		}

		this._drawCoord = false;
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
		}

		// look for people
		var person = this.getPerson(coord);
		if(person) {
			this.ctxPeople.font = "11px sans-serif";
			var text = this.ctxPeople.measureText(person.nickname);
			this.ctxPeople.fillText(person.nickname, x + ((this.tileWidth / 2) - (text.width / 2)), y + (this.tileWidth / 2) - 4, this.tileWidth);
			if(person.AP != Infinity) {
				this.ctxPeople.font = "9px sans-serif";
				text = this.ctxPeople.measureText("("+person.AP+")");
				this.ctxPeople.fillText("("+person.AP+")", x + ((this.tileWidth / 2) - (text.width / 2)), y + (this.tileWidth / 2) + 6, this.tileWidth);
			}
		}
	}
};

World.PEOPLE = [];
World.TEAMS = {
	A: [],
	B: []
};