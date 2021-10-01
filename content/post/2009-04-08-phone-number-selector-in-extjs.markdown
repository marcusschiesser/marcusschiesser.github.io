---
author: admin
date: 2009-04-08 17:10:42+00:00
draft: false
title: Phone number selector in ExtJS
type: post
url: /2009/04/08/phone-number-selector-in-extjs/
categories:
- ExtJS
- Technology
tags:
- code
- country
- ext
- ExtJS
- field
- number
- phone
- selector
---

Wouldn't it be nice to use a combo box of flag images to select the country code of phone numbers? 

If you use a [country selection component](http://www.marcusschiesser.de/?p=209) that's quite easy. Just wrap it in a re-usable component together with a textfield for the local number and the result looks like this:



And here's the example's source:


    
    
    Ext.onReady(function(){
        var panel = new Ext.FormPanel({
            style: 'padding: 10px;',
            frame: true,
            labelWidth: 50,
            width: 400,
            
            items: [{
                fieldLabel: 'Mobile',
                xtype: 'phonefield',
                anchor: '100%',
                emptyText: '(e.g.: 423-423-423)',
                defaultCountryCode: '49',
                maskRe: /[0-9 -]/
            }]
        });
        var element = Ext.query('script[src$=phonefield.js]')[0];
        var renderElement = element.parentNode;
        panel.render(renderElement);
    });
    



**Update:** You can find this code and all my other ExtJS components bundled in [a library called 'extensive'](http://code.google.com/p/extensive/). Enjoy the code and feel free to support the project by participating.
