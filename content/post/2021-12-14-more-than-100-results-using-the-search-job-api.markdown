---
author: admin
date: 2021-12-14
draft: false
title: More than 100 results using the search-job API in Splunk
type: post
url: 2021/12/14/more-than-100-results-using-the-search-job-api
categories:
  - JavaScript
  - Splunk
tags:
  - Splunk
  - React
  - search-job
  - search
  - API
  - results
---

If you’re using the [@splunk/search-job API](https://splunkui.splunk.com/Packages/search-job/Overview) and want to return more than the 100 results (the default value), you’ll have to pass `count` to the `getResults` function, e.g.:

```javascript
new SearchJob.create({
  search: myQuery,
}).getResults({ count: 500 });
```
