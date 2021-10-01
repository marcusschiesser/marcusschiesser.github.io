---
author: admin
date: 2009-02-09 10:40:08+00:00
draft: false
title: Generic error handler for ExtJS
type: post
url: /2009/02/09/generic-error-handler-for-extjs/
categories:
- ExtJS
- Technology
tags:
- communication
- error
- ExtJS
- generic
- handler
---

When you are doing client/server communication with ExtJS you probably run into the problem that you want to handle server side errors in a generic way.
A solution that I found is to override the `handleFailure` function in the `Ext.data.Connection` class:


    
    
    Ext.data.Connection.prototype._handleFailure = Ext.data.Connection.prototype.handleFailure;
    Ext.data.Connection.prototype.handleFailure = function(response, e) {
    	var errorText = Ext.DomQuery.selectValue("Reason/Text", response.responseXML, "Unknown Error");
    	Ext.Msg.alert('Error', errorText);
    	
    	Ext.data.Connection.prototype._handleFailure.call(this, response, e);
    };
    



This handler simply is called whenever a server side failure occurs. As the `Connection` class handles all communication this can happen also in `Ext.Ajax` or `Ext.data.HttpProxy`. In this example the error message to be displayed is retrieved from a server generated XML with the actual text being located at XPath `Reason/Text`.

So a server side error message might look like this:


    
    
    <reason>
    <text lang="en-US">Some error from the server-side</text>
    </reason>
    



