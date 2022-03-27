---
author: Marcus Schiesser
date: 2022-03-23
draft: false
title: Converting Simplified Extended ISO8601 In Splunk
type: post
url: 2022/03/23/converting-simplified-extended-iso8601-in-splunk
categories:
  - Splunk
tags:
  - ISO8601
  - convert
  - Javascript
  - Splunk
  - time
  - date
  - extended
---

Wonder how to use the [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) format in Splunk?

Simplified extended ISO8601 is for example used in Javascript's [toISOString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) function.
 
It's a great way (readable and to timezone agnostic) to exchange timestamps between Splunk and Splunk Apps.

Here's how it's done:

{{< gist marcusschiesser dec0c98840084970b83e0703c92e02d5 >}}