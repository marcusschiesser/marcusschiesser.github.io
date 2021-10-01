---
author: admin
date: 2014-08-22 11:45:10+00:00
draft: false
title: Restart a ExtJS 4.2 Application by recreating the Viewport
type: post
url: /2014/08/22/restart-a-extjs-4-2-application-by-recreating-the-viewport/
categories:
- ExtJS
tags:
- application
- ExtJS
- F5
- recreate
- restart
- viewport
---

If you are debugging your ExtJS application, it could be helpful from time to time to restart the application. Sure, simply pressing _F5_ usually does the trick, but it might happen that you want to keep the state of the application and just restart the [viewport](http://docs.sencha.com/extjs/4.2.2/#!/api/Ext.container.Viewport).

This is simply done by typing the following lines in your favorite [JavaScript console](https://developer.chrome.com/devtools):



	  1. Remove existing viewport with a ComponentQuery

    
    Ext.ComponentQuery.query('viewport')[0].removeAll();



	  2. Recreate viewport, here the viewport's class name is _myApp.myClass_

    
    Ext.create("myApp.myClass");





