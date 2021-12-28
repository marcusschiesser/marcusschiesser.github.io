---
author: admin
date: 2021-12-20
draft: false
title: Enforce arrays for multi-values in Splunk searches
type: post
url: 2021/12/20/enforce-arrays-for-multi-values-in-splunk
categories:
  - Python
  - Splunk
tags:
  - Splunk
  - Python
  - search
  - multi-values
  - array
  - string
---

The [Splunk SDK for Python](https://docs.splunk.com/DocumentationStatic/PythonSDK/1.6.16/index.html) is returning for [multi-values](https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/MultivalueEvalFunctions) that only have one entry a string instead of an array. To enforce
arrays, you can do the following workaround:

{{< gist marcusschiesser d7772a329a465cf403e431aa77a294d0 >}}
