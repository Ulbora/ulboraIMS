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
        var Product = db.getProduct();
        Product.findOne({name: json.name}, function (err, results) {
            console.log("found in create: " + JSON.stringify(results));
            if (!err && (results === undefined || results === null)) {
                var prod = new Product(json);
                prod.save(function (err) {
                    if (err) {
                        returnVal.message = "save failed";
                        console.log("save error: " + err);
                    } else {
                        returnVal.success = true;
                    }
                    callback(returnVal);
                });
            } else {
                returnVal.message = "existing";
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

        var Product = db.getProduct();
        Product.findById(json.id, function (err, results) {
            console.log("found in update: " + JSON.stringify(results));
            if (!err && (results !== undefined && results !== null)) {
                var prod = results;
                prod.name = json.name;
                prod.desc = json.desc;
                prod.externalLink = json.externalLink;
                prod.imageLocation = json.imageLocation;
                prod.promoVideoLink = json.promoVideoLink;
                prod.published = json.published;
                prod.currencyCode = json.currencyCode;
                prod.price = json.price;
                prod.save(function (err) {
                    if (err) {
                        console.log(" save error: " + err);
                    } else {
                        returnVal.success = true;
                    }
                    callback(returnVal);
                });

            } else {
                returnVal.message = " not found";
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
exports.delete = function (id, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(id);
    if (isOk) {
        console.log("id: " + id);
        var Product = db.getProduct();
        Product.findById(id, function (err, results) {
            console.log("found for delete: " + JSON.stringify(results));
            if (!err && (results !== undefined && results !== null)) {
                results.remove();
                returnVal.success = true;
                callback(returnVal);
            } else {
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
        var Product = db.getProduct();
        Product.findById(id, function (err, results) {
            console.log("found: " + JSON.stringify(results));
            if (!err && (results !== undefined && results !== null)) {
                callback(results);
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
    var Product = db.getProduct();
    Product.find({}, null, {sort: {title: 1}}, function (prodErr, results) {
        console.log("found list: " + JSON.stringify(results));
        if (prodErr) {
            callback({});
        } else {
            if (results !== undefined && results !== null) {                
                callback(results);
            } else {
                callback({});
            }
        }
    });
};
