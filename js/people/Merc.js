function Merc(stats, name, nickname) {
	Human.call(this, stats, name, nickname);
}

Merc.prototype = new Human();
Merc.prototype.constructor = Merc;