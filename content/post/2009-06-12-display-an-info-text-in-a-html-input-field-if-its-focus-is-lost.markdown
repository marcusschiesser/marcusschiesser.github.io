---
author: admin
date: 2009-06-12 09:18:02+00:00
draft: false
title: Display an info text in a HTML input field if its focus is lost
type: post
url: /2009/06/12/display-an-info-text-in-a-html-input-field-if-its-focus-is-lost/
categories:
- Component
- ExtJS
tags:
- core
- ext
- ExtJS
- field
- focus
- html
- info
- input
- lost
- text
---


Now that with [Ext Core](http://extjs.com/products/extcore) a light-weight version (just 25kB) of ExtJS has been released, I thought it's time to build a nice example with it.

The result is something very useful that you can see in actually a lot of web sites: Display a info text inside of a input text field if it is empty and does not have the focus. 

Here's how it looks like:



E-Mail: 


To add this behaviour to a input field you just have to call this single line:

    
    
    Extensive.behaviours.setInfoText(inputElement, 'Your email like max@mustermann.de');
    


As always you can find the code for this component in a library called '[extensive](http://code.google.com/p/extensive/)'. Feel free to support the project by participating.
