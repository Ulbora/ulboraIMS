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

var crypto = require('crypto');


hashPasswordSync = function (username, pw) {
    return crypto.pbkdf2Sync(pw, username, 250, 128).toString('base64');
};

exports.hashPasswordSync = hashPasswordSync;

exports.hashPassword = function (username, pw, callback) {
    crypto.pbkdf2(pw, username, 250, 128, callback);
};

exports.securityCheck = function (obj) {
    var returnVal = true;
    if (obj !== undefined || obj !== null) {
        var json = JSON.stringify(obj)
        if (json !== undefined && json !== null) {
            var n = json.indexOf("function");
            if (n > -1) {
                console.log("Security Alert: " + json);
                returnVal = false;
            }
        } else {
            returnVal = false;
        }
    } else {
        returnVal = false;
    }

    return returnVal;
};



exports.aes256Encrypt = function (text) {
    var cipher = crypto.createCipher(algorithm, key);
    var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    return encrypted;
};

exports.aes256Decrypt = function (text) {
    var decipher = crypto.createDecipher(algorithm, key);
    var decrypted = decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
    return decrypted;
};

