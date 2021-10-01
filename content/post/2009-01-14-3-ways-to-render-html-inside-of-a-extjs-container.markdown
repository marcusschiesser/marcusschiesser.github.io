---
author: admin
date: 2009-01-14 14:23:43+00:00
draft: false
title: 3 Ways to render HTML inside of a ExtJS container
type: post
url: /2009/01/14/3-ways-to-render-html-inside-of-a-extjs-container/
categories:
- ExtJS
- Technology
tags:
- container
- ExtJS
- html
- render
---

It has been a while since my last blog post. The main reason is that I am now having a nice new job at [efiport](http://www.efiport.de/) which leads to the situation that I am doing now good old Javascript (mainly [ExtJS](http://extjs.com/)) instead of Flex. 
So I think in the future there will be more posts about ExtJS then Flex. Sorry Flex folks.

To tribute the change a bit, I start with the problem of adding HTML code inside of a ExtJS container.
I thought of three different ways - let's take a look at them:

<iframe src="http://jsfiddle.net/JZG56/embedded/" style="width: 100%; height: 360px" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

It's easy to think about the first one and you can find it quite often by googling around. Just setting the `html` property of a panel. The problem I am having with it is that the overhead of a panel is generated and the HTML is just static - I can't generate similar values at runtime (e.g. a different link label in the example).

So apart from the second example that uses a template, I thought of the third solution that generates a DOM element at runtime using the `DomHelper` (the `autoEl` property calls this implicitly) and wraps it in a component. What do you think?
