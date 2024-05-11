---
title: "Before Reactive Frameworks, Disruptors and Queues: The Flow"
date: 2020-06-12T16:00:00Z
duration: 30min
lang: en
description: description
recording: false
type: blog
development: true
---

When I first started to work with reactive programming the solution to most of the problems encountered in this field has been given to me: _"We use the [LMAX Disruptor](https://lmax-exchange.github.io/disruptor/), it's a standard"_.

I suddently realized how powerful this framawork was, but I wasn't sure on how to use it and why some APIs were developed in a certain way: I was given a powerful tool, without having experienced all the issues of reactive programming beforehand.

Back to Google, I think I found the most useful resources to understand how the disruptor works:
* [LMAX Disruptor Documentation](https://lmax-exchange.github.io/disruptor/)
* [Producer/Consumer, The RingBuffer and The Log](https://www.youtube.com/watch?v=uqSeuGQhnf0)
* [The LMAX Architecture](https://martinfowler.com/articles/lmax.html)
* [Facciamo le code alla JVM](https://youtu.be/HFnhGbe0I34?si=oXseFk8NqFlslgNX) unfortunately only in italian
* [Disruptor, your code on the metal](https://www.youtube.com/watch?v=lUY4tj8-wG4) unfortunately only in italian

and after almost 50 hours spent on understanding how the disruptor works, it was stil unclear to me:
* Why the consumer was retrieving the data in batches instead of one by one
* Why I needed to know when the consumer reached the end of batch
* How to fill the ring buffer and use it the proper way
* How can I ensure that my producer(s) is faster than the consumer, but not so fast to override the data that isn't already read by the consumer?

Other reactive programming "empirical" patterns include having a service that pushes (most of the time, in a fan-out manner or pub-sub) the data to another service that receives it: simple, effective and pain free. 
But even in this particular case
* What if the business logic of the receiver is stateful and takes more time to compute compared to the "pusher" that pushes data in a faster manner? it would result in having a queue full of elements. "Scaling" and "doing the business logic in parallel" are not always the easier solutions
* Push-Pull patterns imply huge IO: how should I cope with it if I want to ensure the perfomance?

In almost 2 years of reactive programming, I realized that rely on a framework, a library or an "industry standard" is not enough if you want to deeply understand what you're doing and you want to achieve the highest possible perfomance: there is the need to go back to the origins, understand the issues and only in that case, adopt "comfortable" solutions instead of reinventing the wheel.