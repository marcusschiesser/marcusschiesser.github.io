---
author: admin
date: 2013-06-10 22:12:58+00:00
draft: false
title: Adding Buttons in a Dataview using ExtJS 4.2
type: post
url: /2013/06/10/adding-buttons-in-a-dataview-using-extjs-4-2/
categories:
- ExtJS
tags:
- button
- dataview
- ExtJS
- listener
---

If you have a dataview in your ExtJS application, it might be possible that you want to add some action buttons for each of its items. With some good old Javascript this is actually quite easy.
You just have to create a template that contains the HTML markup for the button and give it a distinguishable class name. In the `itemmousedown` listener of the dataview you later check for the class name. 
Here's a small example that uses this approach: 
 
<iframe src="http://jsfiddle.net/marcusschiesser/M2scs/embedded/" allowfullscreen="allowfullscreen" width="100%" frameborder="0" height="300"></iframe>
