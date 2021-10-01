---
author: admin
date: 2009-03-11 10:37:40+00:00
draft: false
title: Putting ExtJS templates in separate files
type: post
url: /2009/03/11/putting-extjs-templates-in-separate-files/
categories:
- ExtJS
tags:
- ExtJS
- lazy
- loading
- template
- xtemplate
---

To create a [template in ExtJS](http://extjs.com/deploy/ext/docs/output/Ext.Template.html) you usually have to put the template code inline in your javascript. 
That could lead to problems if you want to edit your code and the designer wants to change the template. Therefore it's a good idea to put the template in a separate file. 

For that reason I built this loader singleton that is capable of lazy loading ExtJS templates:


    
    
    Ext.ns('templates');
    
    templates.Loader = function(){
    	var that = {};
    	
    	var map = {};
    		
    	that.getTemplate = function(url, callback) {
    		if (map[url] === undefined) {
    			Ext.Ajax.request({
    				url: url,
    				success: function(xhr){
    					var template = new Ext.XTemplate(xhr.responseText);
    					template.compile();
    					map[url] = template;
    					callback(template);
    				}
    			});
    		} else {
    			callback(map[url]);
    		}
    	};
    	
    	return that;
    }();
    



Then you can just use your template by calling:


    
    
    templates.Loader.getTemplate('', '/templates/mytemplate.tpl', function(tpl) {
       // do something with the template 'tpl'
    });
    



If you call the template loader a second time, the template is not loaded again but retrieved from cache, so you may also preload all your templates before the application starts.

**Update:** You can find this code and all my other ExtJS components bundled in [a library called 'extensive'](http://code.google.com/p/extensive/). Enjoy the code and feel free to support the project by participating.
