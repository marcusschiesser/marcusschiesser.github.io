---
author: admin
date: 2009-02-27 18:38:59+00:00
draft: false
title: Adding Rows to a Grid in ExtJS 4.1
type: post
url: /2009/02/27/adding-rows-to-a-grid-in-extjs/
categories:
- ExtJS
tags:
- add
- ExtJS
- grid
- rows
---

**Note:** Has been updated for ExtJS 4.1

In the last article [we built a data grid mockup in ExtJS 4.1](http://www.marcusschiesser.de/?p=167). Now we want to add some rows to the grid.
Firstly we need to create a model class to store a data. We've done that also in the previously article, but for the better understanding, here's it again:


    
    
    Ext.define('Person', {
        extend: 'Ext.data.Model',
        fields: ['firstName', 'lastName']
    });
    



Having the `Person `class we can simply add new rows to the store (`people` in our case) by calling the `add` function with new instances of that class:


    
    
    people.add(new Person({
        firstName: 'Ned',
        lastName: 'Flanders'
    }));
    



And again the stuff in action:

<iframe src="http://jsfiddle.net/marcusschiesser/5QRcB/5/embedded/" style="width: 100%; height: 300px" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
