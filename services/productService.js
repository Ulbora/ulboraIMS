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
var productManager = require('../managers/productManager');

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
        console.log("in auth callback");
        productManager.create(reqBody, function (result) {
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
    if (req.is('application/json')) {
        var reqBody = req.body;
        var bodyJson = JSON.stringify(reqBody);
        console.log("body: " + bodyJson);        
        console.log("in auth callback");
        productManager.update(reqBody, function (result) {
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
exports.delete = function (req, res) {    
    console.log("in auth callback");
    var id = req.params.id;
    if (id !== null && id !== undefined) {
        productManager.delete(id, function (result) {
            res.send(result);
        });
    } else {
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
exports.get = function (req, res) {    
    console.log("in auth callback");
    var id = req.params.id;
    if (id !== null && id !== undefined) {
        productManager.get(id, function (result) {
            res.send(result);
        });
    } else {
        res.send({});
    }   
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
    productManager.list(function (result) {
        res.send(result);
    });    
};