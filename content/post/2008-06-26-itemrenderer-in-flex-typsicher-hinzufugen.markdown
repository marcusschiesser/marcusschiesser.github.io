---
author: admin
date: 2008-06-26 17:41:22+00:00
draft: false
title: ItemRenderer in Flex typsicher hinzufügen
type: post
url: /2008/06/26/itemrenderer-in-flex-typsicher-hinzufugen/
categories:
- Flex
tags:
- Flex
- itemrenderer
---

Da ich es gerade mal wieder gebraucht habe (und mich nicht sofort daran erinnern konnte):

Die Antwort auf die Frage, wie man in Flex einen ItemRenderer in MXML typsicher hinzufügt (Dies ist die etwas einfachere Variante von einem [Flex Cookbook-Artikel](http://www.adobe.com/cfusion/communityengine/index.cfm?event=showdetails&postId=5762&productId=2&loc=en_US) von mir).

Normalerweise fügt man in Flex einen [ItemRenderer](http://www.adobe.com/devnet/flex/quickstart/using_item_renderers/) folgendermassen hinzu: Man schreibt den [Fully Qualified Name](http://en.wikipedia.org/wiki/Fully_qualified_name) des ItemRenderers (also den Klassennamen mit Package) in das Attribut `itemRenderer`.

Verwendet man beispielsweise die Klasse `MyItemRenderer` im Package `itemrenders` , so sieht das dann bei einer `TileList` so aus:


    
    <mx:tilelist itemrenderer="itemrenders.MyItemRenderer"></mx:tilelist>



Soweit so gut - Leider gibt es folgenden Nachteil: Nach dem Umbenennen der Klasse oder des zugehörigen Packages ist Flex der Meinung, dass der ItemRenderer nicht mehr existiert.

Verwendet man stattdessen jedoch:


    
    <mx:tilelist itemrenderer="{new ClassFactory(MyItemRenderer)}"></mx:tilelist>



So hat man folgende Vorteile:



	  * Beim Umbennen wird der Fehler vor der Laufzeit gefunden
	  * Benutzt man die [Refactoringfunktion von Flex 3](http://labs.adobe.com/technologies/flex/videos/refactoringdemo/), so wird diese typsichere Referenz automatisch mit umbennant
	  * Man kann im Editor mit CTRL+SPACE einfach den neuen Fully Qualified Name des ItemRenders finden

