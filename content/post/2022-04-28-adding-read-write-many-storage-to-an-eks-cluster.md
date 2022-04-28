---
author: Marcus Schiesser
date: 2022-04-28
draft: false
title: Adding ReadWriteMany Storage To An EKS Cluster
type: post
url: 2022/04/28/adding-read-write-many-storage-to-an-eks-cluster
categories:
  - EKS
  - Kubernetes
  - Terraform
tags:
  - Kubernetes
  - EKS
  - Storage
  - ReadWriteMany
  - EFS
  - PersistentVolume
  - EFS CSI driver
  - Terraform
---

I needed an EKS cluster that supports [_Persistent Volumes_](https://kubernetes.io/docs/concepts/storage/persistent-volumes) with [_Access Mode_](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes) `ReadWriteMany`.

Therefore I updated my [EKS Terraform template](/2022/02/07/latest-eks-cluster-with-load-balancing-controller-and-external-dns/) to support adding the [EFS CSI driver](https://docs.aws.amazon.com/eks/latest/userguide/efs-csi.html) if needed.

Usage is pretty simple, you'll just have to add `enable_efs = true` to your [Terraform cluster definition](https://github.com/marcusschiesser/eks-cluster-with-lb-controller/blob/e18f19685cc2bb03e49957e88d1fa50be3b0037e/main.tf#L10).

This will also create an EFS file system (storage will by provisioned dynamically depending on the requested persistent volume).

You'll just have to retrieve the file system ID from your AWS console and use it to create a new K8S storage class:

```yaml
kind: StorageClass
apiVersion: storage.k8s.io/v1
metadata:
  name: efs-sc
provisioner: efs.csi.aws.com
parameters:
  provisioningMode: efs-ap
  fileSystemId: <MY_FILESYSTEM_ID>
  directoryPerms: "700"
```

Once created, you can reference the new storage class in the persistent volumes that you're about to add.
