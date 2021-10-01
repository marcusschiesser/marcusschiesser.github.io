---
author: admin
date: 2009-11-02 20:54:28+00:00
draft: false
title: 'How to detect whether an element is in a scrollable parent '
type: post
url: /2009/11/02/how-to-detect-whether-an-element-is-in-a-scrollable-parent/
categories:
- Technology
tags:
- css
- detect
- element
- hidden
- javascript
- overflow
- parent
- scroll
- scrollable
- visible
---

Just think of having an element in a scrollable parent (the CSS property `overflow` is set to `scroll`) and you want to test whether the element is visible or not.

Using this little function you can do the trick:

    
    
    function isInView(node){
                var offsetParent = node.offsetParent;
                var top = offsetParent.scrollTop;
                var height = offsetParent.offsetHeight;
                var y = node.offsetTop;
                return y >= top && y <= (top + height);
    }



And here's a small use case - this one scrolls the element into the visible region, if it is not already in the view:

    
    
    if(!isInView(element)) {
                element.scrollIntoView();
    }
    
