---
title: "Mutability on data: running on quicksand"
date: 2024-06-12
duration: 10min
lang: en
description: how to deal with mutable data 
recording: false
type: note
development: true
---

[[toc]]

Low latency is among other things low allocations (in best cases, no allocation at all).
To achieve this, there is the need to reuse objects and keep track of their evolution in the application. 
Long story short, mutability comes into place, with all the problems that come with it.
Battling against partial updates, inconsistent states and pointers going a bit too far in the execution than expected, a set of priciples is needed to keep order and avoid issues.

Furthermore, object pooling might help to contribute to the solution but it's not the final goal we want to achieve.

The lifecycle of a mutable object in low latency applications never ends, but rather follows some predefined (trivial) states after its creation: _fill_, _clear_.

A set of interfaces come to help:
```java

```