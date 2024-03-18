<a href="https://github.com/GameDev46" title="Go to GitHub repo">
    <img src="https://img.shields.io/static/v1?label=GameDev46&message=|&color=Green&logo=github&style=for-the-badge&labelColor=1f1f22" alt="GameDev46 - image_generator">
    <img src="https://img.shields.io/badge/Version-beta%200.3.0-orange?style=for-the-badge&labelColor=1f1f22" alt="GameDev46 - image_generator">
</a>


![Static Badge](https://img.shields.io/badge/--1f1f22?style=for-the-badge&logo=HTML5)
![Static Badge](https://img.shields.io/badge/--1f1f22?style=for-the-badge&logo=CSS3&logoColor=6060ef)
![Static Badge](https://img.shields.io/badge/--1f1f22?style=for-the-badge&logo=JavaScript)
    
<a href="https://github.com/GameDev46/image_generator/stargazers">
    <img src="https://img.shields.io/github/stars/GameDev46/image_generator?style=for-the-badge&labelColor=1f1f22" alt="stars - image_generator">
</a>
<a href="https://github.com/GameDev46/image_generator/forks">
    <img src="https://img.shields.io/github/forks/GameDev46/image_generator?style=for-the-badge&labelColor=1f1f22" alt="forks - image_generator">
</a>
<a href="https://github.com/GameDev46/image_generator/issues">
    <img src="https://img.shields.io/github/issues/GameDev46/image_generator?style=for-the-badge&labelColor=1f1f22&color=blue"/>
 </a>

<br>
<br>

<div align="left">
<a href="https://gamedev46.github.io/image_generator/">
    <img src="https://img.shields.io/badge/View_site-GH_Pages-2ea44f?style=for-the-badge&labelColor=1f1f22" alt="View site - GH Pages">
</a>
</div>

<br>

<p align="left">
<a href="https://twitter.com/gamedev46" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitter.svg" alt="gamedev46" height="30" width="40" /></a>
<a href="https://www.youtube.com/c/gamedev46" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/youtube.svg" alt="gamedev46" height="30" width="40" /></a>
</p>

# image_generator

A basic program that uses a neural network to try to recreate and blend between 2 simple input images (WIP)

# Usage

This project is still being worked and and so is only capable of recreating simple images with a limited number of colours!

*Activation Function* - This is the function that the neural networks use to learn the images, I reccomend leaving this on sigmoid but you can change it to visualise what each one does

*Colour* - This controls whether the network should use RGB values (default) or grayscale (which is easier for the network to learn using)

*Sliders* - Each slider is an input to the neural network, when they are all to the left it should be the first input image and when they are all to the right it should show the second input image

*File add button* - You can use this to add the 2 images to blend between, to actually load them the 2 images should be in a folder together which can then be selected via the add file button

*Train button* - Trains the neural network until stopped

*1 Epoch button* - Backpropigates through the network once

*Reset* - Resets the neural network back to an untrained state (randomises the weights and biases)
