//mongoDB files
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
var conf = require('../configuration');
var mongoose = require('mongoose');
//var mongoConnectString = "mongodb://localhost/ulboracms";
var mongoConnectString = "mongodb://";//localhost/ulboracms";
mongoConnectString += (conf.HOST + "/" + conf.DATABASE_NAME);
//this is specific to RedHat's OpenShift 
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    mongoConnectString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
}else if(process.env.ULBORA_IMS_DATABASE_NAME && process.env.ULBORA_IMS_DATABASE_USERNAME){
    // the database information is set in system variables and uses authentication
    mongoConnectString = process.env.ULBORA_IMS_DATABASE_USERNAME + ":" +
            process.env.ULBORA_IMS_DATABASE_PASSWORD + "@" +
            process.env.ULBORA_IMS_DATABASE_HOST + ':' +
            process.env.ULBORA_IMS_DATABASE_PORT + '/' +
            process.env.ULBORA_IMS_DATABASE_NAME;
    
}else if(process.env.ULBORA_IMS_DATABASE_NAME){
    mongoConnectString += (conf.ULBORA_IMS_DATABASE_HOST + "/" + conf.ULBORA_IMS_DATABASE_NAME);
}

mongoose.connect(mongoConnectString);

var addressSchema = require('../databaseSchema/addressSchema');
var userSchema = require('../databaseSchema/userSchema');
var orderItemSchema = require('../databaseSchema/orderItemSchema');
var orderSchema = require('../databaseSchema/orderSchema');
var productSchema = require('../databaseSchema/productSchema');

var Address = mongoose.model('Address', addressSchema);
var User = mongoose.model('User', userSchema);
var OrderItem = mongoose.model('OrderItem', orderItemSchema);
var Order = mongoose.model('Order', orderSchema);
var Product = mongoose.model('Product', productSchema);

exports.getAddress = function () {
    return Address;
};
exports.getUser = function () {
    return User;
};
exports.getOrderItem = function () {
    return OrderItem;
};
exports.getOrder = function () {
    return Order;
};
exports.getProduct = function () {
    return Product;
};

