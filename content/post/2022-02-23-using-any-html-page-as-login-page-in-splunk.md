---
author: Marcus Schiesser
date: 2022-02-23
draft: false
title: Using Any Html Page As Login Page In Splunk
type: post
url: 2022/02/23/using-any-html-page-as-login-page-in-splunk
categories:
  - Splunk
tags:
  - authentication
  - login
  - splunk web
  - page
  - custom
  - html
---

The [configuration options in Splunk to customize the login page](https://docs.splunk.com/Documentation/Splunk/8.2.5/AdvancedDev/CustomizeLogin) are not sufficient? You want to use an arbitrary HTML page?

This static login page can be used to customize the login experience for Splunk (Tested with Enterprise 8.2.3):

{{< gist marcusschiesser 905b1daeb32a1c56e9d7e8b4bedc5015 >}}

To activate it, you have to copy this file to `$SPLUNK_HOME/share/search_mrsparkle/exposed/login.html` (it will be served by Splunk Web as a static file) and add the following entry to the `settings` stanza in the [`web.conf`](https://docs.splunk.com/Documentation/Splunk/8.2.4/Admin/Webconf):

```
login_content = <script>window.location.replace("http://localhost:8000/static/login.html?cval="+__splunkd_partials__['/services/session'].entry[0].content.cval)</script>
```

This JS snippet automatically redirects every login attempt to this static HTML page and injects the necessary `cval` value for authentication. 