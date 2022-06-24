---
author: Marcus Schiesser
date: 2022-06-24
draft: false
title: Injecting passwords from Kubernetes secrets into Splunk config files
type: post
url: 2022/06/24/injecting-passwords-from-kubernetes-secrets-into-splunk-config-files
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

Currently, the Splunk K8S operator doesn't support injecting passwords from Kubernetes secrets into the Splunk config. The workaround is to store a complete configuration file as a secret, see https://github.com/splunk/splunk-operator/issues/657

As configuration files can be quite large, I created a [small bash script](https://gist.github.com/marcusschiesser/bfa110fe3189ca5969f8a764c435a247) that is using template files for the configuration and filling in the secrets based on user input. You can create the K8S secret containing the configuration by calling:

```bash
create-config.sh $NAMESPACE config.tpl
```

The example is just asking for the _Active Directory_ password, but you can easily extend it with more variables. 

The resulting secret is named `splunk-config-secret` and stored in the namespace `$NAMESPACE`.

You can then reference the secret in your splunk-operator resource, e.g.:

```yaml
apiVersion: enterprise.splunk.com/v2
kind: Standalone
metadata:
  name: s1
  finalizers:
  - enterprise.splunk.com/delete-pvc
spec:
  volumes:
    - name: default
      secret:
        secretName: splunk-config-secret
  defaultsUrl: /mnt/default/default.yml
```



