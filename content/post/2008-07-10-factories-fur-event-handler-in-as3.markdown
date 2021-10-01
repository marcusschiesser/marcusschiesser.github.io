---
author: admin
date: 2008-07-10 19:55:46+00:00
draft: false
title: Factories für Event-Handler in AS3
type: post
url: /2008/07/10/factories-fur-event-handler-in-as3/
categories:
- Flex
tags:
- actionscript
- closure
- DRY
- factory
- handler
---

In meinem letzten Projekt ist mir ein nettes Pattern für die Verwendung von [Closures](http://en.wikipedia.org/wiki/Closure_(computer_science)) in Actionscript 3 eingefallen: Factories für Event-Handler.

Hier ein sehr einfaches Beispiel für einen Handler, der einen Alert anzeigt:


    
    
    public static function createAlertHandler(text:String, title:String):Function {
    	return function():void
    	{
    		Alert.show(text, title);
    	}
    }		
    



Das Ganze kann man sich nun in der Praxis noch mit weiteren Parametern und natürlich einer komplexeren Handlerfunktion vorstellen. 
Der Vorteil an diesem Pattern ist, das über die Parameter der Factorymethode verschiedene Handler erstellt werden können, d.h. ähnliche Handler können zu diesem Pattern zusammengefasst werden. Der Code-Reuse wird erhöht oder [DRY](http://en.wikipedia.org/wiki/Don%27t_repeat_yourself), wie man dazu ja neuerdings sagt.
