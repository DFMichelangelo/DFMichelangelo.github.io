---
title: What I've Learnt in eFX Market Making - Part 1
date: 2023-12-02T00:00:00Z
duration: 20min
lang: en
description: description
recording: false
type: blog
development: true
---
[[toc]]


From June 2022 to August 2023 I had the opportunity to be part of the eFX Quantitative Developers Team in the Trading Floor of [UniCredit](https://www.unicredit.it/) in Milan, Italy.

Since then, I've learnt how the eFX business works, not only thanks to my colleagues (Traders and Quants) but also watching the vaste amonunt of information spread across the internet, spanning from videos on YouTube related to low latency trading to reading LinkedIn posts of FX professionals. 

In 1 years and 3 months I've contributed to the development of the low-latency core pricing engine for eFX (Spot, Forwards,NDFs, Flexi-Forwards, Swaps, Blocks) market making and auto-hedging of the spot leg.

In this article I want to share the knowledge I've gathered from the resources I've found on the internet which I deem fundamental to understand what practicioners give for granted.
Nonetheless, eFX Market Making is not only about Finance and Macro knowledge, but needs a deep understanding of computer science concepts in order to have a tangible edge against the market (and not being just a victim of it).


## Back to the Very Basics: what's FX?
Although the internet is full of articles explaining what's FX, they lack of technicalities as they refer to a broader public rather than practicioners and professionals who want to broaden their knowledge.

> A great reference on how FX works can be found in the first chapter this book: [Foreign Exchange Option Pricing: A Practitioner's Guide](https://www.wiley.com/en-au/Foreign+Exchange+Option+Pricing:+A+Practitioner's+Guide-p-9780470683682) by Iain J. Clark (He also worked in UniCredit, can you belive it?)


**Base Currency**
**Term Currency**
**Dealt Currency**
**Pivot Currency**
**Contra Currency**


## Back to Basics: how does FX business works?

Before diving deep into specific arguments, I deem necessary to have a broad view on FX business, who are the participants and what's the role of currencies in the market.

### Products


### Usages
Financial markets are not just about speculation, but they also provide services to retails (people), corporates and institutions (banks, funds).

A market actor might need to make an FX transaction and use different financial products to achieve their objective.

<table>
  <thead>
    <tr>
        <th>Financial Product</th>
        <th>Client Type</th>
        <th>Problem</th>
        <th>Use of the Financial Product</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td rowspan=3 style='vertical-align: middle;'>Spot FX</td>
        <td >Retail</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Corporate</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>Institutional</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td rowspan=2 style='vertical-align: middle;' >FX Future</td>
        <td>Corporate</td>
        <td></td>
        <td></td>        
    </tr>
    <tr>
        <td>Institutional</td>
        <td></td>
        <td></td> 
    </tr>
    <tr>
        <td rowspan=2 style='vertical-align: middle;'>FX Swap</td>
        <td>Corporate</td>
        <td></td>
        <td></td>        
    </tr>
    <tr>
        <td>Institutional</td>
        <td></td>
        <td></td> 
    </tr>
        <tr>
        <td rowspan=2 style='vertical-align: middle;'>Block</td>
        <td>Corporate</td>
        <td rowspan=2>dsf</td>        
        <td rowspan=2>sdf</td>
    </tr>
    <tr>
        <td>Institutional</td>
    </tr>
  </tbody>
</table>

## Dismanting Common Beliefs

People that talk about FX and  in particular High Frequency Trading use to describe these fields only by taking extremes, whereas the reality is quite different from what is the common tale narrated by them.

### Be fast or don't do it
