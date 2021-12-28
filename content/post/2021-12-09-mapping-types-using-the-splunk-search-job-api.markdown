---
author: admin
date: 2021-12-09
draft: false
title: Mapping types using the Splunk search-job API
type: post
url: 2021/12/09/mapping-types-using-the-splunk-search-job-api
categories:
  - JavaScript
  - Splunk
tags:
  - Splunk
  - React
  - search-job
  - search
  - API
  - type
  - mapper
---

In case you’re using the [@splunk/search-job API](https://splunkui.splunk.com/Packages/search-job/Overview) you might find it annoying that the properties of the returned objects are all of type `string`. To fix this, I wrote a little type mapper (The unit test shows how to use it):

{{< gist marcusschiesser 3ba46e4eb20fc6ea8bbe5e559e0bc11c >}}
