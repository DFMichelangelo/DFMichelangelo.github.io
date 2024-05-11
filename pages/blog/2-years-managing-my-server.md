---
title: "Two years managing my server: lessons learnt"
date: 2024-06-12T16:00:00Z
duration: 30min
lang: en
description: description
recording: false
type: blog
development: true
---

In May 2022, after being away from personal projects for a while, I've decided to rent a server with good specs and start something new.

I've worked on many Linux servers but I have never been totally independent as I have always been limited by the statuses of each server I've dealt with: architectural blockers, technologies that couldn't be used or simply it was too hard to drastically change the structure of the server.

## Lessons learnt, before starting

In 2018 I got asked to setup a [LAMP](https://www.digitalocean.com/community/tutorials/how-to-install-lamp-stack-on-ubuntu) Linux server: I quickly acknowledged that setting up a server is hard, time consuming, and most importantly that most of the times choosing a technology to install would mean an inevitable lock-in. What if you want to uninstall it and totally eradicate it from the machine? it's practically impossible if you install any software natively.

What if you want to update a service to the latest version? it's dramatic.

There is a clear need for an abstraction level that gives you the possibility to install and uninstall sofware quickly without interfering too much with the OS and every sofware should be self contained: [Docker](https://www.docker.com/) [^1] is the answer!

**First Lesson learnt**: the Server should be clean[^2] 🪥

----

Docker is a great tool to manage the services inside a server, but connecting multiple dockers together (i.e.: a database to a service, like [Gitea](https://about.gitea.com/) that requires access to a SQL database) is yet difficult, error prone and therefore time consuming.
It's indeed very easy to find ourselves in a trial-and-error situation when trying to make 2 services communicate each other and "failing fast" is great to not lose momentum.

On the other hand, a server may not be enough, we want to "think big" and we might want to suddently upgrade our server or renting other ones. We already acknolwedged that _the Server is Lava_, but now we want to be able to move and change fast our configuration.

The two abovementioned motivations lead to the necessity to have something to manage the whole infrastructure and to change the setup as quickly as possible: [Terraform](https://www.terraform.io/) [^3] is the answer!

**Second Lesson learnt**: the Server should move fast 🏎️

----

Chaos is the first thing in my mind when I think about a server that has been used for a couple of years: requirements change, the initial rules that have been set are traded with speed of execution and flaky compromises start to appear in the server _"to make it work"_.

I didn't want to fall in this trap and I decided to stick to some principles that unfortunately are only governed by self-discipline, there isn't another way to enforce them.

My principles are the following:
1. Each service installed should be used to its full potential to avoid service redundancy;
1. Configurations should not be set manually in the server, but rather in configuration volumes in Docker;
1. Explicit refernce to the IP should be avoided in the configurations to keep the infrastructure server-neutral, instead, internal [Docker Network](https://docs.docker.com/network/) should be used;
1. Services should be maintainable, inspectable and accessible easily;
1. Services should be updated frequently 

**Third Lesson learnt**: the Server should have solid principles ⚖️

Foundations are now set: service provisioning will be done by Terraform, which will spawn Docker containers with the services. 

## Set up of the Server

Although there might be different ways to use a server, I deem some serv

## Lesson learnt, again


[^1]: Or [Podman](https://podman.io/)
[^2]: Also known as: _The Server is Lava_ 🌋
[^3]: Or [OpenTofu](https://opentofu.org/), or directly [Docker Compose](https://docs.docker.com/compose/), even though recents developments of Terraform makes it more suitable
