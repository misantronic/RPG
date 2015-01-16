function Item() {

}

Item.prototype._name = '';
Item.prototype._weight = 0;
Item.prototype._size = '';
Item.prototype._type = '';
Item.prototype._hands = 0;

Item.SMALL 	= 'sm';
Item.MEDIUM = 'md';
Item.LARGE 	= 'lg';


// GETTER / SETTER

Object.defineProperty(Item.prototype, "name", {
	get: function () {
		return this._name;
	},

	set: function(val) {
		this._name = val;
	}
});

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

Object.defineProperty(Item.prototype, "type", {
	get: function () {
		return this._type;
	},

	set: function(val) {
		this._type = val;
	}
});

Object.defineProperty(Item.prototype, "hands", {
	/** @return {number} */
	get: function () {
		return this._hands;
	},

	set: function(val) {
		this._hands = val;
	}
});