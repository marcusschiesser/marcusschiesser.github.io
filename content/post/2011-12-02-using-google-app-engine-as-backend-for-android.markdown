---
author: admin
date: 2011-12-02 17:40:57+00:00
draft: false
title: Using Google App Engine as Backend for Android
type: post
url: /2011/12/02/using-google-app-engine-as-backend-for-android/
categories:
- Android
tags:
- android
- app engine
- backend
- jersey
---

If you're looking for a way to create a backend for your Android application, Google App Engine looks like the perfect choice: You can use Java as you can do for Android and you don't need to think too much about hosting, as it is all stored in the cloud. 

Another benefit is that you can reuse your [transfer objects](http://java.sun.com/blueprints/patterns/TransferObject.html) on the client and on server side. But as it is often there are some problems doing this in practice. So you don't have the same ones I had, I am glad to share my experiences with you.

So first question is what libraries are to use for the client/server communication. At start I tried [Restlet 2.0](http://www.restlet.org). Looked like a great choice as there are special editions for App Engine and for Android available. In practice it is not very useful as the libraries are to big for Android and I also very much disliked that fully serialized java objects are transfered.

Best approach I found so far is to use [Jersey 1.6](http://jersey.java.net/): It is easy to use and implements the JAX-RS (JSR 311) standard. To set it up on the App Engine, please consult these blog posts from me: [Using real POJOs (without JAXB Annotations) as transfer objects with JAX-RS](/2011/12/using-real-pojos-without-jaxb-annotations-as-transfer-objects-with-jax-rs/) and [Storing large images RESTful in the cloud using Google App Engine](/2011/12/storing-large-images-restful-in-the-cloud-using-google-app-engine/).

Ok, so far about the server side. To keep things small and simple on the Android side, I mainly created the following wrapper class for the `HttpClient` to handle the HTTP requests:

https://gist.github.com/marcusschiesser/5474307

This implementation is far from perfect, especially exception handling and passing parameters need to be improved, but it works so far :)

Using this class it is easy to store a file using the `FileServerResource` from my former blog post. Just call:


    
    
    File imageFile = new File(new URI(myimgage.getImageURL()));
    String url = HttpUtils.getInstance().doPutFile("file/store", imageFile);
    



Also it is easy to store a transfer object using the `doPut` method. Note that is is using the `ObjectMapper` class from [Jackson](http://jackson.codehaus.org/), the same JSON processor that is also used by Jersey.
Jackson is therefore the only additional library that you need on the Android side which keeps the executable small. If you use the same version of Jackson on the client side as on the server side you're also ensured that the (un-)marshalling process of your transfer objects works flawlessly on both sides.

Hope you liked this approach - feel free to discuss here further ideas.
