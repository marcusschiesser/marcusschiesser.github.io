---
author: Marcus Schiesser
date: 2022-02-10
draft: false
title: Using username or token authentication in Splunk from Python
type: post
url: 2022/02/10/splunk-use-either-username-or-token-authentication
categories:
  - Splunk
tags:
  - authentication
  - connect
---

For either using username or token authentication in Splunk, I wrote a small wrapper for the `connect` function.

The advantage compared to the existing `connect` function is that you can use the same line of code for both authentication methods depending on the parameters that you pass (here shown by using ENV variables):

{{< gist marcusschiesser 6b333f834bd79d66c60c0af04b026453 >}}

