import express from "express";
import path from "path";

import srvRender from '../built/serverbundle.js';

// -----------------------------------------------
// We have to run the web server using Babel so that it can dynamically 
// transpile every code file as it is loaded. There are two equivalent
// ways to do this:
//   1) Run "babel-node webback/express.js" from the command-line
//   2) Run "node expressStart.js". Create a file 'expressStart.js' that 
//      contains just two lines:
//          require('@babel/register');
//          require('./webback/express');
//
// These two lines in .babelrc.json are to make sure that we can still use the debugger
// using our original line numbers in the source code. Otherwise since Babel has
// transpiled the code, all the line numbers get shifted.
//
//       "sourceMaps": "inline",
//       "retainLines": true
// 
// In addition, we could also add the "--nolazy" flag in package.json when 
// running the web server ie. "babel-node --nolazy webback/express.js"
// Comments are not allowed in .json files, so putting the note here.
// -----------------------------------------------

// Server var
const app = express();

// View engine setup
app.set("views", path.join(__dirname, "templates"));
console.log(path.join(__dirname, "templates"));
app.set("view engine", "ejs");

// Middleware - this serves the bundles built by Webpack from ../built
// eg. styles.css, clientbundle.js
console.log(__dirname);
app.use(express.static(path.join(__dirname, '..')));
console.log(path.join(__dirname, '..'));

app.get('/hi', function(req, res, next) {
    res.render('index.ejs')
})

/* app.get('/', (req, res) => {
    console.log('req received');
    return res.status(200).send(<div><h5>Hello View</h5></div>)
}); */

hmr();

// For all routes except those starting with '/built' as those are handled
// either by the HMR middlewares or express.static 
app.get(/^\/(?!built).*/, srvRender);

const port = 3010;

app.listen(port, function listenHandler() {
    console.info(`Running on ${port}`)
});

function hmr () {
    var webpack = require('webpack');
    var webpackConfig = require('../webpack.config.js');
    // Use only the client configuration from the webpack config file to rebuild the 
    // bundle dynamically on a source code change. Do not use the server 
    // configuration to rebuild the server bundle. In any case, Webpack HMR has no way to
    // reload the changed server modules on the server side. Secondly, building two webpack
    // bundles (client and server) causes the HMR hash numbers to get out of sync
    // by 1. So the HMR Client Runtime keeps asking the HMR Server for the manifest for
    // the Next hash rather than the Current hash.
    var clientConfig = webpackConfig[0];
    var compiler = webpack(clientConfig);
    
    // Tell express to use the webpack-dev-middleware and use the webpack.config.js
    // configuration file as a base.
    app.use(require("webpack-dev-middleware")(compiler, {
        publicPath: clientConfig.output.publicPath,
        serverSideRender: true // enable serverSideRender
    }));

    app.use(require("webpack-hot-middleware")(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 2000
    }));
}

/* const isObject = require('is-object');

// This function makes server rendering of asset references consistent with different webpack chunk/entry configurations
function normalizeAssets(assets) {
  if (isObject(assets)) {
    return Object.values(assets);
  }

  return Array.isArray(assets) ? assets : [assets];
}
 */

function wdmAssets(request, res) {
    const { devMiddleware } = res.locals.webpack;
    const outputFileSystem = devMiddleware.outputFileSystem;
    const jsonWebpackStats = devMiddleware.stats.toJson();

    /* const { assetsByChunkName, outputPath } = jsonWebpackStats;
    
    cssFiles = normalizeAssets(assetsByChunkName.main)
        .filter((path) => path.endsWith('.css'))
        .map((path) => outputFileSystem.readFileSync(path.join(outputPath, path)))
        .join('\n')

    jsFiles = normalizeAssets(assetsByChunkName.main)
        .filter((path) => path.endsWith('.js'))
        .map((path) => `<script src="${path}"></script>`)
        .join('\n') */


    const webpackJson = typeof jsonWebpackStats.assetsByChunkName === "undefined" ? jsonWebpackStats.children : jsonWebpackStats
    webpackJson.forEach(item => {

        const assetsByChunkName = item.assetsByChunkName;
        const outputPath = item.outputPath;
        const hash = item.hash;
        
        console.log('Asset is ->', assetsByChunkName.main, outputPath, hash);

        Object.values(assetsByChunkName).forEach(chunk => {

            if (typeof chunk === 'string') {
                chunk = [chunk];
            }
            if (typeof chunk === 'object' && chunk.length) {
                chunk.forEach(item => {
                    console.log('File generated by webpack ->', item);
                });
            }
        });
    });
}

// The Server Webpack generates a hash and sends it to the client. The client is supposed to ask
// for a manifest with that hash for the next iteration. Then in the next iteration the Server builds
// a manifest with that hash. The problem we are facing right now is that the client is asking for
// the manifest in this same iteration itself.
//
// Asset is -> [ 'styles.css', 'clientbundle.js' ] /workspaces/yucatan/built/ 447670a0eed4af368921
// File generated by webpack -> styles.css
// File generated by webpack -> clientbundle.js
// Asset is -> [ 'serverbundle.js' ] /workspaces/yucatan/built/ d22614ec496d4bd23c3e
// File generated by webpack -> serverbundle.js

// webpack built client 953133285b6221eabe53 in 3390ms
// webpack built server d22614ec496d4bd23c3e in 32411ms

// client:
//   assets by status 112 KiB [cached] 1 asset
//   assets by path *.js 6.54 MiB
//     asset clientbundle.js 6.49 MiB [emitted] (name: main)
//     asset main.447670a0eed4af368921.hot-update.js 49 KiB [emitted] [immutable] [hmr] (name: main)
//   asset main.447670a0eed4af368921.hot-update.json 28 bytes [emitted] [immutable] [hmr]
//   Entrypoint main 6.65 MiB = styles.css 112 KiB clientbundle.js 6.49 MiB main.447670a0eed4af368921.hot-update.js 49 KiB


// Asset is -> [
//   'styles.css',
//   'clientbundle.js',
//   'main.447670a0eed4af368921.hot-update.js'
// ] /workspaces/yucatan/built/ 953133285b6221eabe53
// File generated by webpack -> styles.css
// File generated by webpack -> clientbundle.js
// File generated by webpack -> main.447670a0eed4af368921.hot-update.js
// Asset is -> [ 'serverbundle.js' ] /workspaces/yucatan/built/ d22614ec496d4bd23c3e
// File generated by webpack -> serverbundle.js
