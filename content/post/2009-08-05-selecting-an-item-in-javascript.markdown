---
author: admin
date: 2009-08-05 13:31:29+00:00
draft: false
title: Let the user select an item in a modal dialog
type: post
url: /2009/08/05/selecting-an-item-in-javascript/
categories:
- Component
- YUI
tags:
- choose
- Component
- item
- javascript
- selector
- YUI
- yui3
---

After having used the shiny new [YUI3](http://developer.yahoo.com/yui/3/) library for a project, it's about time to share my YUI3 experiences with you.
For the project I built an item selector: A modal dialog is openend and the user has to select an item. After selection the dialog is closed and the selected item is passed to a callback function.

Here you can find the [full source](http://www.marcusschiesser.de/wp-content/uploads/2009/08/ItemSelector.js) for the item selector. An example to use the selector can be as simple as this:

    
    
    ms.ItemSelector.selectItem(['Bart', 'Lisa', 'Homer', 'Marge', 'Maggie', 'Ned', 'Barney', 'Bob'], function(item){
      alert(item + ' is your favorite character.');
    });
    



Just click on the following button, to start the example. Enjoy and let me know your comments.


        
        

