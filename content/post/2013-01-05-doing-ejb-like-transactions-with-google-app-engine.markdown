---
author: admin
date: 2013-01-05 12:10:03+00:00
draft: false
title: Doing EJB-like transactions with Google App Engine
type: post
url: /2013/01/05/doing-ejb-like-transactions-with-google-app-engine/
categories:
- Java
tags:
- app engine
- ejb
- Java
- transactions
---

Using Google App Engine you can't define a method as transactional with a simple annotation as you can in EJB. 
You always need to call some boilerplate code which gets quite annoying. 
Therefore the following utility class comes handy, which takes care of the transaction handling for you:

https://gist.github.com/marcusschiesser/5474348

To make use of it, you have to set the same [persistence unit](https://developers.google.com/appengine/docs/java/datastore/jpa/overview) as in your `persistence.xml` configuration file first. Do this by changing the parameter of the method `createEntityManagerFactory`. 

After that you can easily define transcation boundaries like this:

    
    
    TXUtils.doTransaction(new TXUtils.Transaction<string>() {
        public String doit(EntityManager em) {
    	// do something with the EntityManager
        }
    });
    


In this example the transaction method has a return type of `String` - change this if you need a different one.
The transaction is always starting a new transaction, similar to `REQUIRES_NEW` in EJB (more about that in the [Java EE 6 tutorial](http://docs.oracle.com/javaee/6/tutorial/doc/bncij.html)). If you want to use another transaction strategy, you will have to modify the code.
It is still not as easy as setting an annotation in EJB, but way better than without. If you want to define transactions for Google App Engine via annotations, you will need some DI engine like [Guice](http://code.google.com/p/google-guice/) or [CDI](http://www.seamframework.org/Weld), but then you add a lot of other code that you probably don't need.
