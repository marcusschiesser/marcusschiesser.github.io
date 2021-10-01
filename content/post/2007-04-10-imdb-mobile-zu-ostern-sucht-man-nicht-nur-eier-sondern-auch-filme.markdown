---
author: admin
date: 2007-04-10 11:50:00+00:00
draft: false
title: 'IMDB Mobile: zu Ostern sucht man nicht nur Eier - sondern auch Filme!'
type: post
url: /2007/04/10/imdb-mobile-zu-ostern-sucht-man-nicht-nur-eier-sondern-auch-filme/
categories:
- Prototype
tags:
- Mashup
---

Was macht man zu Ostern, wenn man zu lange in der Sonne lag? Man schaut sich einen Film an!
Dumm nur, wenn man unterwegs ist und daher keinen Zugriff auf die [IMDB](http://german.imdb.com/) hat. Wie soll man ohne IMDB wissen, ob einem der Film überhaupt gefallen könnte? Ein echtes Problem.
Da ich für mein schickes Handy ([Nokia E61](http://www.nokia.de/de/mobiltelefone/modelluebersicht/e61/startseite/185058.html)) schon immer mal etwas programmieren wollte, dachte ich mir warum nicht einen mobilen IMDB client.
Gesagt getan, nachdem ich ein wenig mit der [J2ME](http://de.wikipedia.org/wiki/Java_Platform,_Micro_Edition)-API herumgespielt hatte, hier nun das Ergebnis, ein mobiler IMDB Client:



	  * [Online-Demo](http://www.marcusschiesser.de/wp-content/uploads/2008/06/demo.swf)
	  * [Download](http://www.marcusschiesser.de/wp-content/uploads/2008/06/imdb-j2me.zip)

Viel Spass damit!

Für Technikinteressierte: Habe mit [OpenKapow](http://openkapow.com) einen [REST Service](http://de.wikipedia.org/wiki/Representational_State_Transfer) erstellt, der ein [JSON](http://de.wikipedia.org/wiki/JSON) Array mit den gefundenen Filmdaten zurückgibt. Der J2ME-Client benutzt diesen Service über eine HttpConnection und parst das JSON mit [JSON-J2ME](http://tavon.org/work/JSON-J2ME). Die JSON-Daten werden per Hand an die UI-Elemente weitergeleitet.

Lesons learnd:



	  * Schockierend, dass J2ME weder JSON noch Databinding unterstützt, da kann Sun einiges von [Flex](http://www.adobe.com/de/products/flex/) lernen (gibt leider noch keine Möglichkeit Flash Lite mit Flex zu erstellen).
	  * [Netbeans](http://www.netbeans.org/) (habe die Anwendung mit dem Mobility Pack entwickelt) hat sich übrigens ganz schön weiterentwickelt - hat mir bis auf das Refactoring und die fehlende Source-Generation (Getter/Setter, Delegates, etc.) sogar besser als Eclipse gefallen. Well done Sun!

