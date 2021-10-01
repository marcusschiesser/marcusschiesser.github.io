---
author: admin
date: 2011-12-01 16:06:30+00:00
draft: false
title: 'Using real POJOs (without JAXB Annotations) as transfer objects with JAX-RS '
type: post
url: /2011/12/01/using-real-pojos-without-jaxb-annotations-as-transfer-objects-with-jax-rs/
categories:
- Java
tags:
- annotations
- Java
- jax-rs
- jaxb
- jersey
- json
- marshall
- pojo
- rest
- serialize
---

Are you annoyed that you have to annotate your POJOs with `@XmlRootElement`, so they can be used with JAX-RS? If your using Jersey as JAX-RS implementation your lucky: Just add to the `<servlet>` tag in your `web.xml` the following snippet:


    
    
    <init-param>
    	<param-name>com.sun.jersey.api.json.POJOMappingFeature</param-name>
    	<param-value>true</param-value>
    </init-param>
    



After restarting your servlet, your POJOs are marshalled to JSON as a charme. Enjoy!
