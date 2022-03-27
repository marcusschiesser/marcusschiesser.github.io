---
author: Marcus Schiesser
date: 2022-03-27
draft: false
title: Running Mapped Subsearches Without Limits In Splunk
type: post
url: 2022/03/27/running-mapped-subsearches-without-limits-in-splunk
categories:
  - Splunk
tags:
  - map
  - search
  - Splunk
  - subsearch
  - savedsearch
  - limit
---

If you're running saved searches in Splunk as subsearches inside of the `map` command, they are bound by the [`subsearch`](https://docs.splunk.com/Documentation/Splunk/8.2.5/Admin/Limitsconf#[subsearch]) limitation.

This is an alternative command that doesn't have this limitation as it starts a new job for each subsearch. 

{{< gist marcusschiesser bd6e6cfabb3890ccb1b39029ff50fddc >}}

To use it, instead of calling:
```
| makeresults 
| map test
```

You're using:
```
| makeresults 
| mapsearch search=test
```

Missing the full flexibility of `map`, the command also passes each event's values as input parameters to each called saved search. Optionally, you can specify a list of fields that will be copied from the input events to the output events.

