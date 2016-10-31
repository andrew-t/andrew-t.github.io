---
title: The Megapixel
permalink: /megapixel/index.html
addTitle: true
---

<script type="text/x-mathjax-config">MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['&#92;(','&#92;)']]}});</script><script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

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

The human eye evolved to see a black panther hiding in the shadows at night, and so is very good at seeing even very small differences between dark colours. Small differences between light colours are less important — when there is so much light about, the differences are bigger. Therefore digital images don't waste bandwidth storing lots of shades of white. Instead, they use those bits for storing lots of shades of black and other dark colours.

In 8-bit, there are 256 shades of grey, defined by RGB values from 0 to 255. But a grey where the RGB values are 128 is only 22% as bright as one where they're 255. RGB 64, a quarter of the way up the scale, is about 5% as bright as RGB 255. That said, the scale looks roughly linear to human eyes, because we are very good at seeing that 5%.

The maths used for this is deliberately simple. It isn't designed to exactly mimic human vision — it's just there to save data, and to be easy to calculate and combine — so we use a power law:

$$
\text{Amount of light} \propto \frac{RGB}{255}^\gamma
$$

and by convention, $\gamma = 2.2$. We mostly want to work in terms of light rather than RGB values, so we apply this correction to everything from here on.

<div class="float-left"><p>
There are some notable exceptions to all this: the old Asteroids arcade machines, for example, used line graphics on a single-colour screen, and they did this by directly controlling the beam of the electron gun in <span class="footnote" data-html="<p>Then just called &quot;a display&quot;.</p>">an old CRT display</span>. This meant the game was just in black and white, but did mean that <i>it did not have pixels at all</i>, arguably making it higher-resolution than any modern gaming system.
</p></div>

Most screens have a slightly non-linear output as well: if the computer asks for two colours, one twice as bright as the other, it probably won't get exactly that. Low-end systems use another gamma factor to correct for this, again, not because it's accurate but because it's easy and basically works. But the Megapixel, by its design, does not suffer from this. It stands to reason that colouring forty pixels gives twice as much light as colouring twenty, since there's twice as much space for it to pass through. So to display images on the Megapixel display, we set gamma to exactly one — or don't bother applying it at all.

### Colour Correction
All displays use red, green and blue sub-pixels to create colour images, but not all of them use exactly the same shades of red, green and blue. This is usually corrected for by taking RGB values from one "colour space", and converting them to another using a matrix. We had to do exactly this for the Megapixel, and since displaying even a small test image takes a day, we had to do it more-or-less blind.

<div class="float-right"><p>
It is a myth that the eye has red, green and blue light receptor cells. It does have three types of colour-receptive "cone" cells, but all of them respond at least a little to any colour of visible light, and the sensitivity peaks are really at violet, green and yellow. When building a display, you can choose any three primary colours you want, and the range of colours it will be able to display (its 'gamut') will depend on what you choose. It is not possible for the gamut to include all the colours, but choosing good shades of red, green and blue lets you get most of them.
</p></div>

Worse, we were starting out quite a long way from the idea configuration. Our shades or red, green and blue were decided by the colours of Edding <span class="footnote" data-html="<p>For young people, an OHP (or over-head projector) is Powerpoint for shadow puppets.</p>">OHP</span> pens, which were apparently not designed with this use case in mind.

On the other hand, it wasn't necessary to get it perfect. Most people have never bothered to calibrate their computer display because it looks fine with the defaults. There is quite a range of broadly-similar calibrations out there, roughly centred on the actual correct one, and I figured if we could get the Megapixel into that range, it would be fine.

So I made the bold (indeed, false) assumptions that all of our cameras and monitors were perfectly calibrated to the standard RGB colourspace *sRGB*, and that sRGB was a totally accurate model of human colour perception.

Next, we coloured a test pixel fully red, green and blue, and <span class="footnote" data-html="<p>I say &quot;measured the colours&quot;. Katie took a photo of it on her phone and we looked at the RGB value in Photoshop.</p>">measured the colours</span> (accounting for gamma, of course). We assumed that the black pen was totally black. Again, this is demonstrably false, but didn't seem to affect the process apart from making the maths simpler.

In order to create test images without actually doing any colouring in, I wrote some code to blow up an image, and replace each pixel with a tiny picture of a Megapixel pixel — so instead of one white pixel, it would display many red, green and blue pixels. This worked pleasingly well, so I replaced the shades of red, green and blue with those from the photograph of the test pixel, and the image immediately turned purple. This was the colour distortion we needed to correct.




My job therefore, was to build [a tool to convert sRGB image into Edding-pen-RGB](http://www.manchestermegapixel.com/minimegapixel/) (also available from Github either [hosted](http://github.andrewt.net/minimegapixel/) or [as a repo](https://github.com/andrew-t/minimegapixel)).
