---
author: Marcus Schiesser
date: 2022-04-15
draft: false
title: Liveness And Readiness Checks For Splunk In K8s
type: post
url: 2022/04/15/liveness-and-readiness-checks-for-splunk-in-k8s
categories:
  - Splunk
  - Kubernetes
tags:
  - Kubernetes
  - Splunk
  - K8S
  - liveness
  - readiness
  - health
  - probes
  - rolling update
  - operator
  - startup
---

Usually, you'll use the [Splunk Operator](https://splunk.github.io/splunk-operator/) to run Splunk on K8S. There are some use cases where you might want to run Splunk without the operator though.

As with any deployment, it's good practice then to add [liveness probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-a-liveness-command) to restart Splunk if it's not healthy anymore.

Furthermore, as the Splunk container needs about one minute to startup, I'll recommend adding a [readiness probe](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-a-liveness-command). This ensures that no traffic is sent to a pod as long as Splunk hasn't been fully started yet. Also, it won't terminate older instances on an update if the new instances are not ready yet.

Here's how it's done:

{{< gist marcusschiesser a14e8a9f448d94053401bc315d3902e7 >}}
