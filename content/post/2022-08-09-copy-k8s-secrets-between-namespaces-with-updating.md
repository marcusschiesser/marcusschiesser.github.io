---
author: Marcus Schiesser
date: 2022-08-09
draft: false
title: Copy K8s Secrets Between Namespaces With Updating
type: post
url: 2022/08/09/copy-k8s-secrets-between-namespaces-with-updating
categories:
  - Kubernetes
tags:
  - Kubernetes
  - secrets
  - namespaces
  - update
---

K8S doesn't allow to share secrets between namespaces for security reasons. 

It might be acceptable from a security point of view to share secrets nevertheless - then a common workaround is to copy secrets between namespaces. One pattern is to keep a template of the secret in the `default` namespace and copy it from there to other namespaces.

Here's a version of copying secrets between namespaces that also works if the destination secret already exists - in this case it's just updated with the data from the source:

{{< gist marcusschiesser 0b6b36a1496cd68515870a6f5caa1ef5 >}}

This script requires `kubectl` and `yq` with version v4.x.
