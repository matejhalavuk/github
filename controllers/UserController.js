var User = require('../models/User');

module.exports = {

	find: function(params, callback) {
		User.find(params, function(err, users) {
			if(err) {
				callback(err, null);
				return;
			}
			callback(null, users);
		}); 
	},

	findById: function(id, callback) {
		User.findById(id, function(err, user) {
			if(err) {
				callback(err, null);
			} else {
				callback(null, user);
			}
		});
	},

	create: function(params, callback) {
		User.create(params, function(err, user) {
			if(err) {
				callback(err, null);
			} else {
				callback(null, user);
			}
		});
	},

	update: function(id, params, callback) {
		User.findByIdAndUpdate(id, params, {new:true}, function(err, user) {
			if(err) {
				callback(err, null);
			} else {
				callback(null, user);
			}
		});
	},

	delete: function(id, callback) {
		User.findByIdAndRemove(id, function(err) {
			if(err) {
				callback(err, null);
			} else {
				callback(null, null);
			}
		});
	},
};
