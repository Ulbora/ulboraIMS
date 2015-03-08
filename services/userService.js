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
var manager = require('../managers/manager');
var userManager = require('../managers/userManager');
var service = require('./service');

/**
 * 
 * @param req
 *      
 * @param res
 *      
 */
exports.create = function (req, res) {
    if (req.is('application/json')) {
        var reqBody = req.body;
        var bodyJson = JSON.stringify(reqBody);
        console.log("body: " + bodyJson);
        userManager.create(reqBody, function (result) {
            res.send(result);
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
exports.update = function (req, res) {
    service.update(req, res, userManager);
};





/**
 * 
 * @param req
 *      
 * @param res
 *      
 */
exports.get = function (req, res) {
    service.get(req, res, userManager);
};


/**
 * 
 * @param req
 *      
 * @param res
 *      
 */
exports.list = function (req, res) {
    console.log("in auth callback");
    userManager.list(function (result) {
        res.send(result);
    });
};
