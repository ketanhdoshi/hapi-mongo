'use strict';

// -----------------------------------------------
// This is our main file and the entry point for our server application.
// It creates the server, loads all plugins, defines the API routes and
// listens on a particular port for incoming connections
// -----------------------------------------------

// Include Hapi package
const Hapi = require('hapi');

const WebSrv = require ('./webback/websrv');
const ApiSrv = require ('./apiback/apisrv');

// -----------------------------------------------
// Create a server with a host and port
// Export the server variable for automated testing
// -----------------------------------------------
const server = new Hapi.Server();
const port = 3010;
module.exports = server;

WebSrv.init(server, port);
ApiSrv.init(server, port + 1);