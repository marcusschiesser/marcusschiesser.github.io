---
author: admin
date: 2015-03-13 06:30:30+00:00
draft: false
title: Proxy Your Requests With Grunt
type: post
url: /2015/03/13/proxy-your-requests-with-grunt/
categories:
- JavaScript
tags:
- backend
- connect
- frontend
- grunt
- javascript
- middleware
- proxy
---

Probably you're already using grunt to serve your local frontend code. Everything is fine, but if you're developing your backend with something different than JavaScript (Being a Java developer I heard that might happen), you will have problems accessing this backend while running `grunt server`. 
With [grunt-connect-proxy](https://github.com/drewzboto/grunt-connect-proxy) there exists a grunt module to help you out. It basically delegates requests that match a given URL to a different backend of your choice. Unfortunately I found it rather difficult to configure, if you are unaware of the [connect middleware concept](http://stackoverflow.com/questions/5284340/what-is-node-js-connect-express-and-middleware).

Basically you just need to add two things to your `Gruntfile.js` file:

Firstly add the connect server configuration to your config JSON inside of `grunt.initConfig`. This example delegates all requests to `http://localhost:8000/services` to `http://localhost:8090/services` - keep in mind the grunt server is running on port 8000 and the backend on port 8090:


    
    
    connect: {
        site1: {
            options: {
                port: 8000,
                base: '.',
                keepalive: true,
                middleware: function (connect, options, middlewares) {
                    middlewares.unshift(require('grunt-connect-proxy/lib/utils').proxyRequest);
                    return middlewares;
                }
            },
            proxies: [
                {
                    context: '/services',
                    host: 'localhost',
                    port: 8090,
                    https: false,
                    xforward: false
                }
            ]
        }
    }
    



Secondly register your grunt server task:


    
    
    grunt.registerTask('server', function (target) {
        grunt.task.run([
            'configureProxies:site1',
            'connect:site1'
        ]);
    });
    



then you can call your grunt server with the configured proxy via :
`grunt server`
from the command line.

Enjoy!
