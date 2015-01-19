function Abstract() {
	this.MT = new MersenneTwister();
}

/**
 *
 * @type {Image}
 * @private
 */
Abstract.prototype._thumb = Image;

Abstract.prototype._log_output = "";

Abstract.prototype.log = function() {
	var msg = "";
	for (var i in arguments) {
		if(arguments.hasOwnProperty(i)) {
			msg += arguments[i] + ' ';
		}
	}

	document.getElementById('log').innerHTML += msg +"<br/>";
};

// GETTER / SETTER

Object.defineProperty(Abstract.prototype, "thumb", {
	get: function () {
		return this._thumb;
	},

	set: function(val) {
		var img = new Image();
		img.src = val;
		this._thumb = img;
	}
});