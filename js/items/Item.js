function Item() {

}

Item.prototype._weight = 0;

// GETTER / SETTER

Object.defineProperty(Item.prototype, "weight", {
	get: function () {
		return this._weight;
	},

	set: function(val) {
		this._weight = val;
	}
});