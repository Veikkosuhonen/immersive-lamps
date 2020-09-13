![](https://github.com/Veikkosuhonen/immersive-lamps/blob/master/immersive-lamps.png)

# immersive-lamps

Custom material shaders for lamps in Minecraft using the shader api provided by [Canvas rendering mod](https://github.com/grondag/canvas) 

To use this resourcepack, you need the [Fabric mod loader](https://fabricmc.net/use/), 
[Fabric API](https://www.curseforge.com/minecraft/mc-mods/fabric-api) and 
[Canvas](https://github.com/grondag/canvas/releases).

With those installed, put this pack in your resourcepacks folder and load it like any other resourcepack.

## Features

All the implemented materials have some interesting procedural patterns created by noise shaders. This means the effects are nonrepeating and each block is unique.

- [x] Flickering flame effect for lanterns and soul lanterns 
- [x] Sea lanterns have a trippy swirling effect (maybe reminiscent of bioluminescence or some glowy fluid)
- [x] Shroomlights occassionally flash in mysterious patterns
- [ ] Something cool for glowstone
- [ ] Something cool for redstone lamp
- [ ] Something cool for end rod

## Troubleshooting

**This resourcepack was made in less than 24h and uses features of Canvas that will be deprecated, do not expect to receive support**

It seems to be working correctly with Canvas 1.0.936. At the time of writing, Canvas is in early development and unstable so this resourcepack will likely not work properly with newer or older versions of Canvas.

## A note on performance

The resourcepack adds custom shaders and will negatively affect performance when rendering the implemented blocks. It will not affect framerate when the none of the implemented blocks are visible. Expect around 5-10% framerate drops when rendering the custom materials on gpu bottlenecked systems (for example on Intel graphics). The sea lantern is particularly heavy on framerate (up to 60% drop on a low-end system) and you may want to disable it on lower end systems.

## Customization

If want to disable a material (for example because of performance reasons), simply unzip the pack folder and remove the corresponding json-file at `assets/minecraft/materialmaps/block/` (For example `assets/minecraft/materialmaps/block/sea_lantern.json`.
