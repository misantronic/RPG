function Abstract() {

}

Abstract.prototype._log_output = "";

Abstract.prototype.log = function() {
	var msg = "";
	for (var i in arguments) {
		msg += arguments[i] + ' ';
	}

	this._log_output += msg + "\n";

	console.log(msg);
};