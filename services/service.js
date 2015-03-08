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


authenticate = function (req, res, callback) {
    console.log("in auth");
    var token = req.header("authorization");
    //console.log("token:" + token);
    if (token !== undefined && token !== null) {
        var tokenArray = token.split(' ');
        if (tokenArray !== undefined && tokenArray !== null && tokenArray.length === 2) {
            var clearText = new Buffer(tokenArray[1], 'base64').toString();
            //console.log("clear text:" + clearText);
            var credentials = clearText.split(':');
            var User = db.getUser();
            User.findOne({username: credentials[0]}, function (err, results) {
                console.log("found user in auth:" + results);
                var loginInSuccess = false;
                //var roleAuthized = false;
                if (!err && results !== undefined && results !== null) {
                    var foundUser = results.toObject();
                    if (foundUser.password === manager.hashPasswordSync(credentials[0], credentials[1])) {
                        loginInSuccess = true;
                        console.log("correct password: " + loginInSuccess);
                        //var Role = db.getRole();
                       // Role.findById(foundUser.role, function (err, results) {
                            var callbackUserCreds = {
                                "id": "",
                                "username": ""
                            };
                            //console.log("Role:" + JSON.stringify(results));
                            //for (var cnt = 0; cnt < role.length; cnt++) {
                               // var r = role[cnt];
                                //if (results.name === r) {
                                    //roleAuthized = true;
                                    callbackUserCreds.id = foundUser._id;
                                    callbackUserCreds.username = credentials[0];
                                    //callbackUserCreds.role = results.name;
                                   // break;
                                //}
                           // }
                            //console.log("correct role: " + roleAuthized);
                            //if (!loginInSuccess) {
                               // res.status(401);
                               // res.send();
                            //} else if (!roleAuthized) {
                                //res.status(403);
                               // res.send();
                            //} else {
                                console.log("manager login success: " + true);
                                callback(callbackUserCreds);
                            //}
                       // });
                    } else {
                        console.log("correct password: " + false);
                        res.status(401);
                        res.send();
                    }
                } else {
                    res.status(401);
                    res.send();
                }
            });
        } else {
            res.status(401);
            res.send();
        }
    } else {
        res.status(401);
        res.send();
    }
};


exports.authenticate = authenticate;


//generic create
exports.create = function (req, res, manager) {
    if (req.is('application/json')) {
        var reqBody = req.body;
        var bodyJson = JSON.stringify(reqBody);
        console.log("body: " + bodyJson);
        authenticate(req, res, function () {
            console.log("in auth callback");
            manager.create(reqBody, function (result) {
                res.send(result);
            });
        });
    } else {
        res.status(415);
        res.send({success: false});
    }
};

/**
 * 
 * @param req
 *      
 * @param res
 *      
 */
exports.update = function (req, res, manager) {
    if (req.is('application/json')) {
        var reqBody = req.body;
        var bodyJson = JSON.stringify(reqBody);
        console.log("body: " + bodyJson);
        authenticate(req, res, function () {
            console.log("in auth callback");
            manager.update(reqBody, function (result) {
                res.send(result);
            });
        });
    } else {
        res.status(415);
        res.send({success: false});
    }
};

/**
 * 
 * @param req
 *      
 * @param res
 *      
 */
exports.delete = function (req, res, manager) {
    authenticate(req, res, function () {
        console.log("in auth callback");
        var id = req.params.id;
        if (id !== null && id !== undefined) {
            manager.delete(id, function (result) {
                res.send(result);
            });
        } else {
            res.send({success: false});
        }

    });
};


/**
 * 
 * @param req
 *      
 * @param res
 *      
 */
exports.get = function (req, res, manager) {
    authenticate(req, res, function () {
        console.log("in auth callback");
        var id = req.params.id;
        if (id !== null && id !== undefined) {
            manager.get(id, function (result) {
                res.send(result);
            });
        } else {
            res.send({});
        }

    });
};


/**
 * 
 * @param req
 *      
 * @param res
 *      
 */
exports.list = function (req, res, manager) {
    authenticate(req, res, function () {
        console.log("in auth callback");
        manager.list(function (result) {
            res.send(result);
        });
    });
};
