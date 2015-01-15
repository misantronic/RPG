function Item() {

}

Item.prototype._weight = 0;
Item.prototype._size = '';

Item.SMALL 	= 'sm';
Item.MEDIUM = 'md';
Item.LARGE 	= 'lg';


// GETTER / SETTER

Object.defineProperty(Item.prototype, "weight", {
	get: function () {
		return this._weight;
	},

	set: function(val) {
		this._weight = val;
	}
});

Object.defineProperty(Item.prototype, "size", {
	get: function () {
		return this._size;
	},

	set: function(val) {
		this._size = val;
	}
});