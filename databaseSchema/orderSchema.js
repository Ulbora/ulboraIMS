//productSchema
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
var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    orderDate: {type: Date, default: Date.now},
    deliveryDate: {type: Date},
    user: {type: mongoose.Schema.ObjectId, required: true, ref: "User"},
    shippingAddress: {type: mongoose.Schema.ObjectId, required: true, ref: "Address"},
    billingAddress: {type: mongoose.Schema.ObjectId, required: true, ref: "Address"}
});
module.exports = orderSchema;