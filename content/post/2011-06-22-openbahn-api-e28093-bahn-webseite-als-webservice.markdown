---
author: admin
date: 2011-06-22 20:13:17+00:00
draft: false
title: Openbahn-API – Bahn-Webseite als Webservice
type: post
url: /2011/06/22/openbahn-api-%e2%80%93-bahn-webseite-als-webservice/
categories:
- Articles
- Idea
- Java
tags:
- appengine
- bahn
- booking
- Java
- jersey
- rest
- ticket
- webservice
---

As this is only of interest for German users - this article is in German only. It's about a new project of mine. Sorry folks.

Ich bin gerade dabei eine Android-App zu entwickeln, mit der es möglich ist Fahrkarten für Bahn-Pendler einfacher zu buchen.
Bei der Entwicklung ist mir aufgefallen, dass die Bahn leider keine Webservices nach außen zur Verfügung stellt – die Webseite [www.bahn.de](http://www.bahn.de) ist zusammen mit der mobilen Variante [m.bahn.de](http://m.bahn.de) die einzige Schnittstelle.

Daher habe ich das Projekt [Openbahn-API](http://code.google.com/p/openbahn-api) ins Leben gerufen: Es handelt sich um eine API, die Funktionalitäten der Bahn-Webseite als Webservices zur Verfügung stellt. Über diese Services können eigene Programme die verfügbaren Bahnhöfe oder Zugverbindungen inkl. Zeiten und Preise abrufen. Des Weiteren ist es über die Schnittstelle möglich, Zugtickets zu buchen oder Sitzplätze zu reservieren.

Die Dokumentation und URLs zu den einzelnen Services finden sich auf der Projektseite unter [http://code.google.com/p/openbahn-api](http://code.google.com/p/openbahn-api). Diese werden über HTTP-GET aufgerufen und liefern JSON Objekte zurück. So gibt der Aufruf von [http://openbahnapi.appspot.com/rest/stations/list?contains=karlsr](http://openbahnapi.appspot.com/rest/stations/list?contains=karlsr) eine Liste von JSON-Objekten zurück, die alle Bahnhöfe enthalten, die im Namen „karlsr“ enthalten. Im Beispiel sind dies die gesamten Bahnhöfe im Stadtgebiet von Karlsruhe.

Die API kann verwendet werden, um eigene Anwendungen zu entwickeln, die Bahndaten benötigen.

Um die Qualität des Parsers zu sichern, wird der Code komplett als GPL auf Google Code unter [http://code.google.com/p/openbahn-api](http://code.google.com/p/openbahn-api) zur Verfügung gestellt – jeder Entwickler ist herzlich dazu eingeladen Verbesserungen und Erweiterungen vorzunehmen. Das Hosting erfolgt über die Google AppEngine. Die Ergebnisse der Anfragen werden über einen Cache zwischengespeichert, so dass die Kommunikation mit der Bahn-Webseite minimiert wird und für vorhandene Ergebnisse auch funktioniert, wenn diese offline ist.

Ich bin gespannt auf eure Meinung und wünsche euch viel Spaß mit der neuen API.
