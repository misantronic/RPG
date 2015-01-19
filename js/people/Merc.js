function Merc(stats) {
	Person.call(this, stats);
}

Merc.prototype = new Person();
Merc.prototype.constructor = Merc;