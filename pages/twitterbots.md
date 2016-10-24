---
title: Twitterbots
permalink: /twitterbots/index.html
---

# Fish Exist.

<div class="float-right"><a href="http://twitter.com/fishexist"><img src="/img/fish-exist.png" style="width: 15em; height: 15em;"></a></div>

[Fish Exist](http://twitter.com/fishexist) is a parody of QI’s excellent podcast [No Such Thing as a Fish](http://qi.com/podcast), designed to generate interesting facts instead of researching them.

It first pulls Wikipedia’s [list of No Such Thing As A Fish episodes](https://en.wikipedia.org/wiki/List_of_No_Such_Thing_as_a_Fish_episodes), pulls out all the headline facts, and feeds them into [my Markov chain implementation](https://github.com/andrew-t/markov/). Every few hours, it picks a fact from the real list, and uses the first two words as a seed to generate a sentence. (If it generates one of the original facts verbatim, it rejects it and generates another — although it does sometimes rephrase them.)

[The source code is on GitHub](https://github.com/andrew-t/fish/), and it generates things like:

* A kangaroo's tail is used as an apartment block.
* Kaiser Wilhelm II once lost a valuable arms contract for Germany because he was feeling irritable.
* The Aztecs wore necklaces made out of marzipan and got angry when people ate them.
* David Frost used to scare woodpeckers.
* Desperate Dan stopped eating cow pies because of a pork carcass, and Rosemary Einstein who came up with glowing mushrooms.
* Tomorrow will be the same time, they would know who it came from.

# 823 Years

People seem interested by unusual-looking dates. This meme, for example, gained a surprising amount of traction considering how strangely confused it is about how two-digit years correspond to four-digit ones:

> At exactly 06 mins and 07 seconds after 5 o’clock on Aug 9th 2010, it will be 05:06:07 08/09/10. This won’t happen again until the year 3010.

And then there's this one, which is just mad.

> AN INTERESTING FACT ABOUT AUGUST 2010. This August has 5 Sundays, 5 Mondays, 5 Tuesdays, all in one month. It happens once in 823 years.

All Augusts do that. Not always with Sunday, Monday and Tuesday, but near enough, and the exact combination isn't rare. Even if it were, the calendar loops every 400 years so nothing like this could possibly happen every 823. It would be an astonishing coincidence if the 1-in-823 freak August contained the 1-in-1000 freak county date thing.

But how impressive is the county date thing really? I mean, yes, it won't happen again until 2110, but if you use the UK date format it happened again in September. If you use the US date format, but write the time after the date, then it happened again later that morning.

And you don't have to start at five. You could start at six, and it happened in 2011. If you start at eight, and it happened in 2013.

And you don't have to count in ones. You could do just the odd numbers. Or just the primes. Or...

So I did what anyone would do: I [fired up Python](http://github.com/andrew-t/oeiscal), scraped the [Online Encyclopedia of Integer Sequences](http://oeis.org/), and [set my Raspberry Pi tweeting every interesting date it could find](http://twitter.com/823years).
