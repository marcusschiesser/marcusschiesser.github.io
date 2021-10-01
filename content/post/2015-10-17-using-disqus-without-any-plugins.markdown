---
author: admin
date: 2015-10-17 03:30:44+00:00
draft: false
title: Using Disqus without any plugins
type: post
url: /2015/10/17/using-disqus-without-any-plugins/
categories:
- JavaScript
- Other
tags:
- disqus
- plugin
- shortname
- snippet
- Wordpress
---

At [TurnGeek](http://www.turngeek.press) we recently had the task to include [Disqus](https://disqus.com/) (which is great by the way) into our site, so readers of our books can leave comments for each chapter.

For a couple of reasons we couldn't use their Wordpress plugin although the site is running on Wordpress. If you're running in the same issue or you just don't want the dependency of another plugin, you can paste the following snippet in your Wordpress posts (by the way, this also works with non WordPress sites):
 

    
    <script type="text/javascript" src="http://www.turngeek.press/js/disqus.js" data-name="{my_disqus_shortname}"></script>


 
Using the `data-name` attribute you have to set the [shortname](https://help.disqus.com/customer/portal/articles/466208) you're using on Disqus. This means you have to replace `my_disqus_shortname` with this shortname, in our case it is `turngeekpress`, so our snippet looks like this:


    
    <script type="text/javascript" src="http://www.turngeek.press/js/disqus.js" data-name="{turngeekpress}"></script>



Have fun using this and let me know your thoughts.
