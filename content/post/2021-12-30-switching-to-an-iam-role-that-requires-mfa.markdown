---
author: admin
date: 2021-12-30
draft: false
title: Switching to an IAM role that requires MFA in AWS
type: post
url: 2021/12/30/switching-to-an-iam-role-that-requires-mfa
categories:
  - AWS
tags:
  - AWS
  - MFA
  - IAM
  - CLI
  - role
  - profile
---

IAM roles are a great way to increase security in AWS. A user can switch to a specific role and get a new set of permissions.
The [Switching to an IAM role article](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-cli.html) explains how to do this for the AWS CLI, but unfortunately leaves out how to switch to a role that requires MFA.

The trick is to add a `mfa_serial` parameter to the profile in the `~/.aws/config` file, e.g.:

```
[profile myprofile]
    role_arn = arn:aws:iam::{ACCOUNT_ID}:role/{ROLE}
    source_profile = default
    mfa_serial = {MY_MFA_DEVICE}
```

You can get your `{MY_MFA_DEVICE}` configuration from https://console.aws.amazon.com/iam/home#/security_credentials. 