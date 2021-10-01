---
author: admin
date: 2008-08-20 11:37:29+00:00
draft: false
title: Adding custom info windows to Google Maps in Flex
type: post
url: /2008/08/20/eigene-info-fenster-einer-google-map-in-flash-hinzufugen/
categories:
- Flex
tags:
- flash
- Flex
- google
- map
---

I just tried to create a custom info window for a Google Map using the [Google Maps API For Flash](http://code.google.com/apis/maps/documentation/flash/). Unfortunately it does not seem to work as expected by setting the `customContent` property in an object of type `InfoWindowOptions`. Therefore I wrote this little workaround that creates a popup window:


    
    
    private function createInfoWindow(map:Map, marker:Marker, infoWindow:Class):IFlexDisplayObject {
      var popup:IFlexDisplayObject = PopUpManager.createPopUp(map, infoWindow);
      var globalPos:Point = map.localToGlobal(map.fromLatLngToViewport(marker.getLatLng()));
      popup.move(globalPos.x - popup.width/2, globalPos.y - popup.height - marker.getDisplayObject().height);
      return popup;
    }
    
