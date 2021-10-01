---
author: admin
date: 2013-04-27 18:56:46+00:00
draft: false
title: Securing Your Play 2.1.1 Web Application Using a Filter
type: post
url: /2013/04/27/securing-your-play-2-1-1-web-application-using-a-filter/
categories:
- Other
tags:
- filter
- play
- play 2.1
- scala
- security
---

After deploying my [Play 2.1.1](http://www.playframework.com/) based application to [Cloudbees](http://www.cloudbees.com/), I had the problem that everyone could access it. Not very ideal if you want to restrict your program to only a single audience.

To solve the problem you would usually write a complicated user-based authentication system. Slightly an overkill, if you don't need different users accessing your program at all. My idea was more that the user has to add an URL parameter with a secret key, the first time the application is called. For later requests the key would just be stored in the session object.

That way you basically access the program via the following URL:
`http://myapp.cloudbees.net/?access_key=secret`
instead of just using:
`http://myapp.cloudbees.net`

The solution is quite simple. You just have to add a [Filter](http://www.playframework.com/documentation/api/2.1.1/scala/index.html#play.api.mvc.Filter) that is checking every request. If the desired URL parameter is passed the request will be processed as usual. If not, we just log the potential threat and return a [404](http://en.wikipedia.org/wiki/HTTP_404) (IMHO way better than returning a [401](http://en.wikipedia.org/wiki/HTTP_401#4xx_Client_Error) and motivate the intruder that way to hack your site).
Let's have a look at the following object called `AuthFilter`: 

https://gist.github.com/marcusschiesser/5474213

Don't blame me if the code above is not ideal - it's not only my first program using Play but also using Scala. 

To activate the filter, you have to enhance the `Global` object (store it in the default package):


    
    
    import play.api.mvc.WithFilters
    import util.AuthFilter
    
    object Global extends WithFilters(AuthFilter)
    



You may wonder about the method `validSession` in the `AuthFilter`. It's purpose is to add a valid token in your unit tests. Here's an example with a [FakeRequest](http://www.playframework.com/documentation/api/2.1.1/scala/index.html#play.api.test.FakeRequest) to /:


    
    
    route(FakeRequest(GET, "/").withSession(AuthFilter.validSession)).get
    



Have fun hiding your applications! Don't forget that the secret key is transferred unencrypted. So if you need some extra security, add SSL. Unfortunately this cost something on [Cloudbees](http://developer.cloudbees.com/bin/view/RUN/AppSSL).... 
