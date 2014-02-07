'use strict';



/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
};

/**
 * Logout
 */
exports.logout = function(req, res) {
    req.session.user = null;
    res.render("index",{
      notloggedin : true
    });
};

/**
 * Session
 */
exports.session = function(req, res) {
    var user = req.body;
    console.log(user, "LOGGING IN");
    User.findOne({pid : user.pid, password : user.password}, function(err, doc){
        if(doc){
            req.session.user = doc; 
    res.render('index', {
      user : req.session.user,
      loggedin : true
    });
        }else{
            res.render("index",{
                notloggedin : true
            });
        }
        
    })
};

/**
 * Create user
 */
exports.create = function(req, res, next) {
    var user = new User(req.body);
    var message = null;

    user.provider = 'local';
    user.save(function(err) {
        if (err) {
            switch (err.code) {
                case 11000:
                case 11001:
                    message = 'Username already exists';
                    break;
                default:
                    message = 'Please fill all the required fields';
            }

            return res.render('/signup', {
                message: message,
                user: user
            });
        }
        exports.session(req, res);
    });
};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};