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
var service = require('./service');
var orderManager = require('../managers/orderManager');


/**
 * 
 * @param req
 *      
 * @param res
 *      
 */
exports.create = function (req, res) {
    service.create(req, res, orderManager);
};


/**
 * 
 * @param req
 *      
 * @param res
 *      
 */
exports.update = function (req, res) {
    service.update(req, res, orderManager);
};


/**
 * 
 * @param req
 *      
 * @param res
 *      
 */
exports.delete = function (req, res) {
    service.delete(req, res, orderManager);
};


/**
 * 
 * @param req
 *      
 * @param res
 *      
 */
exports.get = function (req, res) {
    service.get(req, res, orderManager);
};


/**
 * 
 * @param req
 *      
 * @param res
 *      
 */
exports.list = function (req, res) {
    service.authenticate(req, res, function (creds) {
        console.log("in auth callback");
        orderManager.customerOrderlist(creds.id, function (result) {
            res.send(result);
        });
    });
};