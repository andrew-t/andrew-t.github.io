---
title: The Megapixel
permalink: /megapixel/index.html
addTitle: true
---

As part of the [Manchester Science Festival](http://www.manchestersciencefestival.com/) 2016, [Katie Steckles](http://www.katiesteckles.co.uk) decided to build a monitor for the [domino computer](/maths/domputer). Or rather, to demonstrate how a computer monitor builds up an image from red, green and blue pixels by making a giant one from pens. This was [the Megapixel project](http://www.manchestermegapixel.com/).

<p><iframe class="hero" width="560" height="315" src="https://www.youtube.com/embed/AvO4s3bW-qI" frameborder="0" allowfullscreen></iframe></p>

<div class="float-right">
<p>This came about because <a href="http://www.standupmaths.com/">Matt Parker</a>, for <a href="http://festivalofthespokennerd.com/">Festival of the Spoken Nerd</a>’s <a href="http://festivalofthespokennerd.com/dvd/">Full Frontal Nerdity</a> show, wanted to convert photographs into spreadsheets. He did the first couple himself, longhand, but later asked me to build <a href="http://think-maths.co.uk/spreadsheet">a tool to automate the process</a>.
</p></div>

My PhD had a chapter or two on accurately *measuring* colours in digital images, and so I was given the job of applying that knowledge in reverse, to make sure the final Megapixel display was calibrated properly.

## Calibration

All computer displays, and some TVs, have a range of calibration settings to make sure images displayed on them look correct. Usually this is done by displaying an image with some sensible default calibration, adjusting it, and repeating until everything is correct. That is fine at the 25, 30 or 60fps a computer can push out, but it took us about three weeks to display one frame on the Megapixel, so we had to calibrate the display *before it had been built*.

### Gamma
The first step was easy. The first step was gamma.



On the other hand, it wasn't necessary to get it perfect. Most people have never bothered to calibrate their computer display because it looks fine with the defaults. There is quite a range of broadly-similar calibrations out there, roughly centred on the actual correct one, and I figured if we could get the Megapixel into that range, it would be fine.

So I made the bold (indeed, false) assumptions that all of our cameras and monitors were perfectly calibrated to the standard RGB colourspace *sRGB*, and that sRGB was a totally accurate model of human colour perception.

So we coloured a test pixel fully red, green and blue, and <span class="footnote" data-html="<p>I say &quot;measured the colours&quot;. Katie took a photo of it on her phone and we looked at the RGB value in Photoshop.</p>">measured the colours</span>.

Most modern displays, cameras and the like use a colour space very close to sRGB — that is to say, an digital photograph should look pretty much the same colour as the actual scene on nearly any monitor. This is not true of <span class="footnote" data-html="<p>For young people, an OHP (or over-head projector) is Powerpoint for shadow puppets.</p>">OHP</span> pens, which seem to be designed with no reference to any standardised RGB colour space.

My job therefore, was to build [a tool to convert sRGB image into Edding-pen-RGB](http://www.manchestermegapixel.com/minimegapixel/) (also available from Github either [hosted](http://github.andrewt.net/minimegapixel/) or [as a repo](https://github.com/andrew-t/minimegapixel)).
