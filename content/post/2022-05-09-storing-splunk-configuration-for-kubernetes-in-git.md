---
author: Marcus Schiesser
date: 2022-05-29
draft: false
title: Storing Splunk Configuration for Kubernetes in Git
type: post
url: 2022/05/29/storing-splunk-configuration-for-kubernetes-in-git
categories:
  - Kubernetes
  - Splunk
tags:
  - Splunk
  - Kubernetes
  - configuration
  - apps
  - Gitops
  - splunk-operator
---

After having [discussions about how to use Gitops with Splunk](https://splunk-usergroups.slack.com/archives/C01M8M2R3AM/p1651309478456499?thread_ts=1650596987.931899&cid=C01M8M2R3AM), I created this template to store the complete configuration (apps and system configuration) of a Splunk installation running on Kubernetes in Git:

https://github.com/marcusschiesser/splunk-gitops.

Having the complete configuration in a single repository is an important prerequisite to enjoy the [benefits of GitOps](https://www.weave.works/technologies/gitops/).

To ensure that this template is running with future versions of Splunk, it is solely extending Splunk Docker images according to the [docker-splunk](https://splunk.github.io/docker-splunk/) configuration. Furthermore for deploying the images it is using the [splunk-operator](https://github.com/splunk/splunk-operator) for Kubernetes as recommended by Splunk.
