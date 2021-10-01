---
author: admin
date: 2013-01-17 00:17:11+00:00
draft: false
title: How to use JSF 2.2 with JBoss 7.1
type: post
url: /2013/01/17/how-to-use-jsf-2-2-with-jboss-7-1/
categories:
- Java
tags:
- how to
- jboss
- jboss 7
- jsf
- jsf 2.2
- mojarra
---

As the new JSF 2.2 is nearly finished, we all want to play with [the new features of it](http://jdevelopment.nl/jsf-22/). 

[Markus Eisele](http://blog.eisele.net/) has shown in his blog post [Testdriving Mojarra 2.2.0-m08](http://blog.eisele.net/2013/01/testdriving-mojarra-220-m08-on.html) how to do this with Glassfish 3. He's German too, I begin to wonder if only we guys are that curious or no one else is using JSF any more ;) 

Unfortunately with JBoss 7 we face the same problem he had: We can not just add the new libraries to our WAR archive as they will clash with the JSF 2.1 version of Mojarra (the reference implementation of JSF) already provided by JBoss 7. 
So basically we have to disable this old version and activate the new version directly in the application server.

I will show you how to do it with JBoss 7.1.1 and the M08 release of Mojarra 2.2, but it should work for other versions the very same way:

JSF is divided into two parts: The implementation and the API. 

We firstly exchange the former one by starting to [download jsf-impl-2.2.0-m08.jar](https://maven.java.net/content/repositories/releases/com/sun/faces/jsf-impl/2.2.0-m08/jsf-impl-2.2.0-m08.jar), which is the JAR archive containing the implementation.
After downloading, copy this archive to the folder of the old JSF implementation of your JBoss installation, which will be `%JBOSS_HOME%/modules/com/sun/jsf-impl/main` in that case.
In the same directory you will find a file called `module.xml`. Edit it and change the contents of the `resources` tag like this:

    
    
    <resources>
        <resource-root path="jsf-impl-2.2.0-m08.jar"></resource-root>
    </resources>
    


This is important as it tells JBoss which of the provided JAR archives (now there are two of them) to use. If you want to know more about this: Take a look at [JBoss Modules](https://docs.jboss.org/author/display/MODULES/Home), a module class loading approach JBoss 7 is using.
After that you have finished with exchanging the implementation and basically you have to do the same for the API part:

Firstly download the [jsf-api-2.2.0-m08.jar](https://maven.java.net/content/repositories/releases/com/sun/faces/jsf-api/2.2.0-m08/jsf-api-2.2.0-m08.jar) archive and copy it to `%JBOSS_HOME%/modules/javax/faces/api/main`. Secondly edit the `module.xml` in the same directory by exchanging the resources tag:

    
    
    <resources>
        <resource-root path="jsf-api-2.2.0-m08.jar"></resource-root>
    </resources>
    


Basically you should be finished now, but there is a bug in the milestone 8 of the API that it has a dependency to the implementation. For that reason you have to declare it by adding the following contents to the `dependencies` tag of the same `module.xml` file:

    
    
    <module name="com.sun.jsf-impl"></module>
    



After that you can restart your modified JBoss instance. As JSF is lazily loaded you have to deploy a WAR referencing JSF to check whether our changes work. If so, you should see a log message like this:

`[javax.enterprise.resource.webcontainer.jsf.config] (MSC service thread 1-2) Mojarra 2.2.0-m08` 

Finally, if you want to use the new features in application, you have to add the following dependency to your `pom.xml`:


    
    
    <dependency>
       <groupid>com.sun.faces</groupid>
       <artifactid>jsf-api</artifactid>
       <version>2.2.0-m08</version>
       <scope>provided</scope>
    </dependency>
    



And now have fun using JSF 2.2!
