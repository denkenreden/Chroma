# Chroma
A Color-Mixing Library

## What is Chroma
Chroma is a Color-Mixing library. It was designed to simplify and organize the process of mixing different contanly changing colorsources.

## The Purpose
I've written Chroma to prototype an idea I had. My goal was to animate different RGB-LEDs with different colors and different animation patterns. The LEDs should mimic the color of the sky (sunset, sunny, flickering stars etc.).

## How to use
Chroma consists of 5 parts:
* ChromaMixer
* ChromaChannel
* ChromaLayer
* ChromaOutput
* A Color Generator

A color generator produces colors. Each generator has to have 2 methods:
* update, which is called before
* render is called. Render has to return a ChromaColor.

A ChromaLayer consists of color generators. Their colors will, literally, add together.

A ChromaChannel contains ChromaLayers,
a ChromaMixer contains ChromaChannels and
a ChromaOutput outputs one ChromaChannel.

## Example
```
// Create all objects
var myMixer = new ChromaMixer();
var myOutput = new ChromaOutput();
var myChannel = new ChromaChannel();
var myLayer = new ChromaLayer();

var myDrawer1 = new ColorDrawer();  // ColorDrawer is a class which can render colors
var myDrawer2 = new RandomDrawer(); // The same applies here

// Link' em up
myLayer.addGenerator(myDrawer1);
myLayer.addGenerator(myDrawer2);
myChannel.setLayer(myLayer);
myMixer.addChannel(myChannel);
myMixer.linkChannelToOutput(myOutput, 0);

// now you could...
myOutput.update();
var color = myOutput.getColor();
´´´

## Please note...
...that this is more of a concept than a production-ready library. This is not meant to be used in real applications!
