---
author: admin
date: 2013-12-21 07:39:51+00:00
draft: false
title: Dynamically Changing the Structure of a Grid in ExtJS 4.2
type: post
url: /2013/12/21/dynamically-changing-the-structure-of-a-grid-in-extjs-4-2/
categories:
- ExtJS
tags:
- columns
- dynamic
- ExtJS
- grid
- structure
---

If you have a grid in ExtJS, it might happen that you want to change the columns of the grid depending on the data you receive from the server.
In my new pet project [Bulks](https://github.com/marcusschiesser/bulks) I was facing this exact problem, so I thought it might be worth sharing the solution with you.
In the example below we try to render differently structured JSON arrays in the same grid. The function `getKeysFromJson` retrieves the keys from such an array. With this
information we can build the ExtJS columns array easily in the `createColumns` function by [mapping](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) each key to a column definition object. 
The function `createStore` further shows us how to create an ExtJS store from the JSON and the keys array. 
The store and the columns array are needed to call the [reconfigure](http://docs.sencha.com/extjs/4.2.2/#!/api/Ext.grid.Panel-method-reconfigure) function of the ExtJS grid which changes the data and column layout of the grid. 
Play with the following small example - I hope it demonstrates the idea:
 
<iframe width="100%" allowfullscreen="allowfullscreen" src="http://jsfiddle.net/marcusschiesser/GvGCX/embedded/" frameborder="0" height="300"></iframe>

BTW: Don't wonder about the Chinese characters, I am just trying to learn that language and as everyone I am very happy being able to write my first characters...
