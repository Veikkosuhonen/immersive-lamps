#include frex:shaders/api/fragment.glsl
#include frex:shaders/lib/noise/noise2d.glsl
#include frex:shaders/api/world.glsl

void frx_startFragment(inout frx_FragmentData fragData)
{
    //float emission = step(0.6, fragData.spriteColor.r);
    fragData.spriteColor = vec4(1.0);
    //fragData.emissivity = emission;
}