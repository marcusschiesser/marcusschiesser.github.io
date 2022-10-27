---
author: Marcus Schiesser
date: 2022-10-27
draft: false
title: Configuring Splunk Instances Running K8s
type: post
url: 2022/10/27/configuring-splunk-instances-running-k8s
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

The recommendations to configure Splunk instances that are running on K8S using the Splunk operator is by bundling `.conf` files 
in Splunk apps.

Unfortunately some things can't be configured with Splunk apps, e.g. adding a user. Then you have two options:
1. Adding the user manually via CLI or UI and therefore not having the configuration in Git _OR_
2. Deploying a second instance in K8S that is doing the configuration for the first instance

Here's the deployment YAML for this second option:

{{< gist marcusschiesser 1002ae9c90be16afb1e216df593c8392 >}}

It's just calling remotely `/opt/splunk/bin/splunk add user rest -password test -role rest` periodically every 60s to ensure that the user exists.

I know this is just a workaround, please support therefore: https://github.com/splunk/splunk-operator/issues/875