---
author: Marcus Schiesser
date: 2022-02-07
draft: false
title: Latest 2022 EKS Cluster with Load Balancing Controller and External DNS
type: post
url: 2022/02/07/latest-eks-cluster-with-load-balancing-controller-and-external-dns
categories:
  - AWS
tags:
  - AWS
  - Terraform
  - EKS
  - Load Balancer Controller
  - External DNS
  - Route 53
  - Ingress
  - AWS Certificate Manager
---

Need a terraform script to setup the latest 2022 EKS cluster including the best goodies like Helm, [AWS Load Balancer Controller](https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html) and [External DNS](https://github.com/kubernetes-sigs/external-dns)?

Then please have a look at my GitHub repository [eks-cluster-with-lb-controller](https://github.com/marcusschiesser/eks-cluster-with-lb-controller).

The advantage of its configuration is that for the lifecycle of application specific resources (DNS entries, load balancers, target groups), Terraform is not needed. [Kubernetes ingress resources](https://kubernetes.io/docs/concepts/services-networking/ingress/) with [specific annotations](https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.2/guide/ingress/annotations/) are sufficient and can be checked into each application's repository to fulfill IaC requirements.

If certificates are added to the [AWS Certificate Manager](https://aws.amazon.com/certificate-manager/) in the cluster's account, the applications will be able to use the certificates as well. The certificates are discovered using [Certificate Discovery](https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.2/guide/ingress/cert_discovery/#discover-via-ingress-rule-host). This works with wildcard certificates as well.

[k8s/game2048.yaml](./k8s/game2048.yaml) is the [2048 game example](https://docs.aws.amazon.com/eks/latest/userguide/alb-ingress.html) used by the AWS Load Balancer Controller, but this version is configured to use HTTP and HTTPS.

This configuration doesn't create a VPC, but if needed one can easily be added by using the [VPC Terraform module](https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws/latest).

> Note: This setup is loosely based on [Provisioning Kubernetes clusters on AWS with Terraform and EKS](https://learnk8s.io/terraform-eks#three-popular-options-to-provision-an-eks-cluster), but is using the latest software versions from 2022 and supports External DNS as well.
