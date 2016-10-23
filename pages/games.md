---
title: Games
permalink: /games/index.html
tab: true
---

# Games

Sometimes I make little games, mostly played in web browsers because that seems strangely to be the best platform for building such things.

# 3Doku

<div class="float-right"><a href="http://github.andrewt.net/3doku"><img src="/img/games/3doku.png" style="width: 18.15em; height: 18.4em;"></a></div>

[3Doku](http://github.andrewt.net/3doku) is a 3D version of sudoku (or, if you are a mathematician, a 2D version of sudoku wrapped around a cube). Each of the six faces of the cube is a 4&times;4 grid, which must contain the numbers 1–16. The other groups are bands going around the cube: pick any square, and move either vertically or horizontally, folding around the edges of the cube as you go. Once you reach the square you started from, you should have covered 16 squares — which should of course contain the numbers 1–16.

3Doku is also available [as an Android app](https://play.google.com/store/apps/details?id=net.andrewt.sudokube).

# 4tris

[4tris](http://github.andrewt.net/4tris) is much like Connect Four, except that when you make a line, you simply get a point. The line vanishes, and any new lines made when the other blocks fall are scored in the same way. The game ends when the board fills up. Whoever made the most lines is the winner.

# monsters

<div class="float-left"><a href="https://andrew-tls.github.io/monsters"><img src="/img/games/pokemon.png" style="width: 14em; height: 10em;"></a></div>

[monsters](https://andrew-tls.github.io/monsters) is a wholly original AR monster-catching game. Just point your phone at the monster, and tap the ball to throw it at the monster. (You do not need to swipe the ball; I don’t know why people keep trying to swipe it as if there is another similar game where you do swipe it. But I have checked, and there isn’t.)

Sadly it only works on Chrome for Android, since it uses the camera API which isn't supported on iPhone, and the motion-sensor API, and just generally a lot of fiddly and hard-to-debug things that aren't really worth implementing for the nine people who actually use Firefox on mobile. But if you have an Android device with a back-facing camera and accelerometers, then do try to find all the monsters in my game.

I am well up for [pull requests with new monsters](https://github.com/andrew-t/monsters).

# #kpnuptris

In 2016, Paul and [Katie](http://www.katiesteckles.co.uk) got married, and it was the most strongly branded wedding I have ever seem — just look at their [wedsite](http://www.kpnupts.com). [Mark](http://www.markstephentaylor.com) decided there had to be a block-matching game based on this branding, and Paul and Katie love the 2p pushing machines that take all your money at the seaside. And it was for a wedding, so obviously it was going to be a two-player co-op.

[Here is the finished product](http://github.andrewt.net/kpnupts).

# Analogue Snake

In these modern times, *Snake* looks as dated as the Nokia phones that made it famous. But need it?

Perhaps the issue is that the low-res, right-angle-based graphics are dragging it down. So I created [Analogue Snake](http://github.andrewt.net/snake), where you can turn at any angle you like.

But that still seemed a little dated. So I thought, perhaps the issue is the rather primitive game engine. So I built [Analogue Snake II](http://github.andrewt.net/snake2), which has ragdoll physics and gamepad/mouse controls.

To be honest, it still feels a tad old-fashioned.
