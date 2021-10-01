---
author: admin
date: 2008-09-09 12:33:01+00:00
draft: false
title: Google Maps API for Flex
type: post
url: /2008/09/09/google-maps-api-fur-flexgoogle-maps-api-for-flex/
categories:
- Flex
tags:
- api
- Component
- Flex
- google
- info
- map
- maps
- window
---

[As I pointed out before](/?p=70), it's unfortunately not possible to use Flex components as info windows for [Google Maps](http://code.google.com/apis/maps/documentation/flash/).
Another issue is that the map is not available as a Flex component itself, therefore it's a bit complicated to use it in Flex.
So I thought to address these issues in a little [Google Maps API for Flex](/downloads/map4flex/srcview/map4flex.zip) that you can download here under BSD license.
With `openFlexInfoWindows` I also added a method that allows you to use multiple Flex components as info window at once - nicely seperated in tabs.
Find an example below:

[Start Flash!](/downloads/map4flex/example_openwindow.swf)
[Source Code](/downloads/map4flex/srcview/)
