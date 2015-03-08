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
exports.create = function (json, creds, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(json);
    if (isOk) {
        var Address = db.getAddress();
        Address.findById(json.billingAddress, function (berr, billingAdd) {
            console.log("found in billing address: " + JSON.stringify(billingAdd));
            if (!berr && (billingAdd !== undefined && billingAdd !== null)) {
                Address.findById(json.shippingAddress, function (bserr, shipAdd) {
                    console.log("found in shipping address: " + JSON.stringify(shipAdd));
                    if (!bserr && (shipAdd !== undefined && shipAdd !== null)) {
                        var orderItemList = json.items;
                        delete json.items;
                        var Order = db.getOrder();
                        json.user = creds.id;
                        var ord = new Order(json);
                        ord.save(function (err) {
                            if (err) {
                                returnVal.message = "save failed";
                                console.log("save error: " + err);
                                callback(returnVal);
                            } else {
                                if (orderItemList !== undefined && orderItemList !== null && orderItemList.length > 0) {
                                    var OrderItem = db.getOrderItem();
                                    //var fail = false;
                                    for (var cnt = 0; cnt < orderItemList.length; cnt++) {
                                        var item = orderItemList[cnt];
                                        item.order = ord._id;
                                        var oi = new OrderItem(item);
                                        oi.save(function (err) {
                                            if (err) {
                                                returnVal.message = "save failed";
                                                console.log("save error: " + err);
                                                fail = true;
                                            }
                                        });
                                        if (cnt === orderItemList.length - 1) {
                                            //if (!fail) {
                                            returnVal.success = true;
                                            //}
                                            callback(returnVal);
                                        }
                                    }
                                } else {
                                    returnVal.success = true;
                                    callback(returnVal);
                                }
                            }
                        });
                    } else {
                        callback(returnVal);
                    }
                });
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
        var Order = db.getOrder();
        Order.findById(json.id, function (err, results) {
            console.log("found in update: " + JSON.stringify(results));
            if (!err && (results !== undefined && results !== null)) {
                var prod = results;
                prod.deliveryDate = json.deliveryDate;
                prod.shippingAddress = json.shippingAddress;
                prod.billingAddress = json.billingAddress;
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
        var Order = db.getOrder();
        Order.findById(id, function (err, results) {
            console.log("found for delete: " + JSON.stringify(results));
            if (!err && (results !== undefined && results !== null)) {
                results.remove();
                returnVal.success = true;
                deleteItems(id);
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
        var Order = db.getOrder();
        Order.findById(id, function (err, results) {
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
        var Order = db.getOrder();
        Order.find({user: json.user}, null, {sort: {title: 1}}, function (prodErr, results) {
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

exports.customerOrderlist = function (userId, callback) {
    var Order = db.getOrder();
    Order.find({user: userId}, null, {sort: {title: 1}}, function (prodErr, results) {
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

deleteItems = function (orderId) {
    var OrderItem = db.getOrderItem();
    OrderItem.find({order: orderId}, function (err, results) {
        console.log("found list: " + JSON.stringify(results));
        if (!err && (results !== undefined && results !== null)) {
            for (var cnt = 0; cnt < results.length; cnt++) {
                var i = results[cnt];
                i.remove();
            }
        }
    });
};
