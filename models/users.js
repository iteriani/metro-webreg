'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * User Schema
 */
var UserSchema = new Schema({
    pid : String,
    major : String,
    year : String,
    password : String
});

mongoose.model('User', UserSchema);