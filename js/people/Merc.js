function Merc(stats) {
	Human.call(this, stats);
}

Merc.prototype = new Human();
Merc.prototype.constructor = Merc;