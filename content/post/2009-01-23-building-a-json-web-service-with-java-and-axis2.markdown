---
author: admin
date: 2009-01-23 15:05:04+00:00
draft: false
title: Building a JSON web service with Java and Axis2
type: post
url: /2009/01/23/building-a-json-web-service-with-java-and-axis2/
categories:
- Java
tags:
- axis2
- dynamic response
- Java
- jettison
- json
- pojo
- web service
---

It is said that in Java usually the easiest things are the hardest. The following is a nice example as it took me some time to figure out how to do it.
I wanted to build a simple URL request based web service in Java that returns an JSON object. Yes, you can do that with a simple Servlet too, the advantage of using [Axis2](http://ws.apache.org/axis2/) is that you can also call your deployed services using SOAP without any configuration changes. 




  1. [Download Axis2 as WAR](http://apache.autinity.de/ws/axis2/1_4_1/axis2-1.4.1-war.zip) and install it in your servlet container
  2. [Download the DynamicResponseHandler module](http://dist.wso2.org/maven2/org/wso2/dynamicresponse/wso2dynamic-response/SNAPSHOT/wso2dynamic-response-20080916.170559-241.mar) and add it to Axis by copying it to WEB-INF/modules
  3. [Patch Jettison](http://markmail.org/message/cu2tw43qnrqgqgwp) or [download my patched version](http://www.marcusschiesser.de/wp-content/uploads/2009/01/jettison-11-snapshot.jar) and replace it with the one installed in WEB-INF/lib
  4. Add the DynamicResponseHandler module reference to the axis2.xml configuration (located in WEB-INF/conf):

    
    <module ref="DynamicResponseHandler"></module>
	  5. Add the JSON Message formatters to the axis2.xml:

    
    <messageformatter contenttype="application/json" class="org.apache.axis2.json.JSONMessageFormatter"></messageformatter>
    <messageformatter contenttype="application/json/badgerfish" class="org.apache.axis2.json.JSONBadgerfishMessageFormatter"></messageformatter>
	  6. Add JSON Message builders to the axis2.xml:

    
    <messagebuilder contenttype="application/json" class="org.apache.axis2.json.JSONOMBuilder"></messagebuilder>
    <messagebuilder contenttype="application/json/badgerfish" class="org.apache.axis2.json.JSONBadgerfishOMBuilder"></messagebuilder>
  7. 
 Start your servlet container and test the standard version service by calling this url:
[http://localhost:8080/axis2/services/Version/getVersion?response=application/json](http://localhost:8080/axis2/services/Version/getVersion?response=application/json)

Now you are ready to add your own web services. Here you can find an example [how to deploy a simple POJO service](http://ws.apache.org/axis2/1_1/pojoguide.html). Have fun!

**Update**: Zeno (see comments) sent me [patch](http://www.marcusschiesser.de/wp-content/uploads/2009/01/jettison-1.2-patch.zip.zip) for usage with Jettison 1.2 - otherwise he received a NullPointerException. I haven't checked it, but I hope it helps you! Thanks Zeno!

