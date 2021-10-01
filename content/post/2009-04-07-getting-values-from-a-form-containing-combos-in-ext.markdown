---
author: admin
date: 2009-04-07 15:54:45+00:00
draft: false
title: Getting values from a form containing combos in Ext
type: post
url: /2009/04/07/getting-values-from-a-form-containing-combos-in-ext/
categories:
- ExtJS
tags:
- combo
- ext
- form
- values
---

Actually it is pretty easy to get the values of all fields of a form in Ext: You just have to call the `getValues()` method of the `BasicForm`.
The problem with that approach is that it just takes the values directly from the DOM and is not calling the `getValue()` for each field (Which I assumed). One consequence is that you don't get the values of combo boxes, but their labels.
To get the real values, I just did the following:

Firstly, I retrieved an array of all fields of the form:

    
    
    var fields = that.findBy(function(comp) {
    	return comp.xtype != 'fieldset';
    });
    


(In my case these were just all children that were no fieldsets. You might have to change the condition above to suit your needs.)

Then, I just iterated over all fields and added the name/value pair to a result object:

    
    
    var result = {};
    fields.forEach(function(field){
    	var name = field.getName();
    	var value = field.getValue();
    	result[name] = value;
    });
    



That's it - now `result` contains the real values of all fields.
