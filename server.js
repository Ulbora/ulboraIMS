#!/bin/env node
var express = require('express');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var logger = require('morgan');
var basicAuth = require('basic-auth');
var conf = require('./configuration');
var cors = require('./cors/cors');
var un = 'node';//change this to something private
var pw = 'password';//change this to something private



var ulboraIMS = function () {
    //  Scope.
    var self = this;
    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */
    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function () {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP || process.env.ULBORACMS_IP;
        self.port = process.env.OPENSHIFT_NODEJS_PORT || process.env.ULBORACMS_PORT || conf.PORT;


        if (typeof self.ipaddress === "undefined") {
            //  Log errors but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No IP address defined, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        }
        ;
    };

    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function (sig) {
        if (typeof sig === "string") {
            console.log('%s: Received %s - terminating sample app ...',
                    Date(Date.now()), sig);
            process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()));
    };

    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function () {
        //  Process on exit and signals.
        process.on('exit', function () {
            self.terminator();
        });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
            'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function (element, index, array) {
            process.on(element, function () {
                self.terminator(element);
            });
        });
    };

    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function () {

        self.app = express();
        self.app.use(logger('dev'));
        self.app.use(bodyParser.json());
        //self.app.use(express.cookieParser('7320s932h79993Ah4'));
        //self.app.use(express.cookieSession());
        self.app.use(express.static(__dirname + '/public'));
        if (conf.CORS_ENABLED) {
            self.app.use(cors.CORS);
        }

        //self.app.set("views", __dirname + "/");
        //var auth = basicAuth(un, pw);
        //var credentials = basicAuth(req);
        //db.initializeMongoDb();

        // initial web apps
        //initializeWebApp(self);



        self.app.get('/rs/test', function (req, res) {
            var credentials = basicAuth(req);
            authenticate(credentials, function (success) {
                if (success) {                    
                    res.send([{code: 2, name: "ken"}, {name: 'wine2'}]);
                } else {
                    reject(res);
                }
            });

        });

        self.app.use(errorHander);

    };

    /**
     *  Initializes the sample application.
     */
    self.initialize = function () {
        self.setupVariables();
        self.setupTerminationHandlers();
        // Create the express server and routes.
        self.initializeServer();
    };

    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function () {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function () {
            console.log('%s: Node server started on %s:%d ...',
                    Date(Date.now()), self.ipaddress, self.port);
        });
    };
};

var errorHander = function (req, res) {
    //res.status(404).send('Something broke!');
    res.status(404).sendfile("public/error.html");
};

var authenticate = function (creds, callback) {
    if (!creds || creds.name !== 'node' || creds.pass !== 'password') {
        callback(false);
    } else {
        callback(true);
    }
};

var reject = function (res) {
    res.status(401);
    res.send();
};

/**
 *  main():  Main code.
 */
var zapp = new ulboraIMS();
zapp.initialize();
zapp.start();