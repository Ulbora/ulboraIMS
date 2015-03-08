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
        var OrderItem = db.getOrderItem();
        var Order = db.getOrder();
        var Product = db.getProduct();
        Order.findOne({order: json.order}, function (err, order) {
            console.log("found in create: " + JSON.stringify(order));
            if (!err && (order === undefined || order === null)) {
                Product.findOne({product: json.product}, function (prodErr, prod) {
                    if (!prodErr && (prod === undefined || prod === null)) {
                        var oi = new OrderItem(json);
                        oi.save(function (err) {
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
        var OrderItem = db.getOrderItem();
        OrderItem.findById(json.id, function (err, results) {
            console.log("found in update: " + JSON.stringify(results));
            if (!err && (results !== undefined && results !== null)) {
                var oi = results;
                oi.count = json.count;
                oi.save(function (err) {
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
        var OrderItem = db.getOrderItem();
        OrderItem.findById(id, function (err, results) {
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
        var OrderItem = db.getOrderItem();
        OrderItem.findById(id, function (err, results) {
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
exports.list = function (json, callback) {
    var isOk = manager.securityCheck(json);
    if (isOk) {
        var OrderItem = db.getOrderItem();
        OrderItem.find({order: json.order}, null, function (prodErr, results) {
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
    } else {
        callback({});
    }
};
