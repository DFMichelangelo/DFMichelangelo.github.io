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

Low latency consist in, among other things, low allocations (in best cases, no allocation at all).
JVM-based languages suffer from unexpected allocations and de-allocations which makes those language a double-edged sword.
To achieve this, there is the need to reuse objects and keep track of their evolution in the application. 
Long story short, mutability comes into place, with all the problems that come with it.
Battling against partial updates, inconsistent states and pointers going a bit too far in the execution than expected or concurrency issues,a set of priciples is needed to keep order and avoid issues.

Furthermore, object pooling might help to contribute to reduce allocations, but it's not the final goal we want to achieve.

The lifecycle of a mutable object in low latency applications never ends, but rather follows some predefined (trivial) states after its creation: _filled_, _clear_.
When an object is _filled_, it contains all the data that needs to be used for a certain computation, whereas an object is deemed _clear_ when it does not have any data in it, being therefore empty.
The objects we are talking about are in other words buffers.

A set of interfaces come to help to define how a custom buffer:

```java
interface Clearable{
    // clear the content of the buffer
    void clear()
}

interface CopyableFrom<T>{
    // copy the fields of "from" to this object
    void copyFrom(T from)
}

interface Mutable<T> implements Clearable, CopyableFrom<T>{ }
```

Using a custom buffer gives us the opportunity to be typesafe, avoid conversions to/from bytes.

It's important to highlight that in order to be efficient, the buffers we are going to create need to be composed by primitives or buffers such that no allocation or de-allocation occurs.
 
Therefore, objects composed as follows are not acceptable as clear method of [ArrayList](https://docs.oracle.com/javase/8/docs/api/?java/util/ArrayList.html) and [Hashmap](https://docs.oracle.com/javase/8/docs/api/?java/util/HashMap.html) involve garbage creation.


```java
class DataCache implements Mutable<T>{
    private final HashMap<String,Double> data1 = new HashMap<>();
    private final ArrayList<String,Double> data1 = new HashMap<>();
    void clear()
}

interface CopyableFrom<T>{
    // copy the fields of "from" to this object
    void copyFrom(T from)
}

interface Mutable<T> implements Clearable, CopyableFrom<T>{ }
```