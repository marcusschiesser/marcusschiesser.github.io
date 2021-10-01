---
author: admin
date: 2009-04-08 16:52:08+00:00
draft: false
title: Component for selecting multiple items in Ext
type: post
url: /2009/04/08/component-for-selecting-multiple-items-in-ext/
categories:
- ExtJS
- Technology
tags:
- combo
- Component
- ext
- items
- multiple
- select
- selector
---

Ext already provides [a component to select multiple items](http://extjs.com/deploy/dev/examples/multiselect/multiselect-demo.html). The thing I do not like about it is that it covers too much space on the screen.
Therefore I thought of a component that initially looks like a combo box and then opens a new window to let the user select the items.

As a nice example tells more than thousand words - here it is:



As you can see, it is actually based on the component provided by the Ext examples. 

And here's the source code for the example:


    
    
    Ext.onReady(function(){
        var model = new Ext.data.SimpleStore({
            fields: ['label', 'value'],
            data: [['Homer', 1], ['Marge', 2], ['Maggie', 3], ['Bart', 4], ['Lisa', 4]]
        });
        var panel = new Ext.FormPanel({
            frame: true,
            labelWidth: 50,
            width: 300,
            
            items: [{
                fieldLabel: 'I like',
                xtype: 'singleLineMultiSelect',
                store: model,
                anchor: '90%',
                mode: 'local',
                displayField: 'label',
                fromLegend: 'available',
                toLegend: 'selected',
                valueField: 'value',
                deleteText: 'delete',
                emptyText: 'Which Simpsons do you like?'
            }]
        });
        var element = Ext.query('script[src$=ext-multiselector.js]')[0];
        var renderElement = element.parentNode;
        panel.render(renderElement);
    });
    
    



Altough the example binds an in-memory store, you can also use an external store. If so, please remove the `mode` property - similar to a combo box.

**Update:** You can find this code and all my other ExtJS components bundled in [a library called 'extensive'](http://code.google.com/p/extensive/). Enjoy the code and feel free to support the project by participating.
