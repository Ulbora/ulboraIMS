/*     
 Copyright (C) 2015 Driven Solutions (www.drivensolutions.com)
 All rights reserved.
 
 Copyright (C) 2015 Ken Williamson
 All rights reserved.
 Copyright (C) 2015 Chris Williamson
 All rights reserved.
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 
 
 Author: Ken Williamson (ken@ulboralabs.com) 
 */
var db = require('../db/db');
var manager = require('../managers/manager');


/**
 * 
 * @param json
 *      
 */
exports.create = function (json, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(json);
    if (isOk) {
        var User = db.getUser();
        User.findOne({username: json.username}, function (err, results) {
            console.log("found user in create: " + JSON.stringify(results));
            if (!err && (results === undefined || results === null)) {
               // var allowAdd = true;
                //if (roleResults.roleName === manager.ROLE_SUPER_ADMIN && creds.role !== manager.ROLE_SUPER_ADMIN) {
                    //allowAdd = false;
               // }
                //if (allowAdd) {
                    json.password = manager.hashPasswordSync(json.username, json.password);
                    var u = new User(json);
                    u.save(function (err) {
                        if (err) {
                            returnVal.message = "save failed";
                            console.log("user save error: " + err);
                        } else {
                            returnVal.success = true;
                        }
                        callback(returnVal);
                    });
                //} else {
                    //callback(returnVal);
               // }

            } else {
                returnVal.message = "existing user";
                callback(returnVal);
            }
        });
    } else {
        callback(returnVal);
    }
};


/**
 * 
 * @param json
 *      
 */
exports.update = function (json, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(json);
    if (isOk) {
        var User = db.getUser();
        User.findById(json.id, function (err, foundUser) {
            console.log("found user: " + JSON.stringify(foundUser));
            if (!err && (foundUser !== undefined && foundUser !== null)) {
                if (json.password !== undefined && json.password !== null && json.password !== "") {
                    foundUser.password = manager.hashPasswordSync(foundUser.username, json.password);
                }
                if (json.firstName !== undefined && json.firstName !== null) {
                    foundUser.firstName = json.firstName;
                }
                if (json.lastName !== undefined && json.lastName !== null) {
                    foundUser.lastName = json.lastName;
                }
                if (json.emailAddress !== undefined && json.emailAddress !== null) {
                    foundUser.emailAddress = json.emailAddress;
                }

                foundUser.save(function (err) {
                    if (err) {
                        console.log("user update error: " + err);
                    } else {
                        returnVal.success = true;
                    }
                    callback(returnVal);
                });
            } else {
                console.log("bad json: " + JSON.stringify(json));
                callback(returnVal);
            }
        });

    } else {
        callback(returnVal);
    }
};



/**
 * 
 * @param id
 *      
 */
exports.get = function (id, callback) {
    var isOk = manager.securityCheck(id);
    if (isOk) {
        console.log("id: " + id);
        var User = db.getUser();
        User.findById(id, function (err, foundUser) {
            if (!err && (foundUser !== undefined && foundUser !== null)) {
                console.log("found user: " + JSON.stringify(foundUser));
                foundUser.password = "";
                callback(foundUser);
            } else {
                callback({});
            }
        });
    } else {
        callback({});
    }
};


/**
 * 
 * @param json
 *      
 */
exports.list = function (callback) {
    var returnVal = [];
    var User = db.getUser();
    User.find({}, null, {sort: {username: 1}}, function (err, results) {
        console.log("found user list: " + JSON.stringify(results));
        if (err) {
            callback({});
        } else {
            if (results !== undefined && results !== null) {
                for (var cnt = 0; cnt < results.length; cnt++) {
                    var u = results[cnt].toObject();
                    u.password = "";                   
                    returnVal.push(u);
                }
                callback(returnVal);
            } else {
                callback({});
            }
        }
    });
};
