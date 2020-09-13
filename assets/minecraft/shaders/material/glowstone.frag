#include frex:shaders/api/fragment.glsl
#include frex:shaders/lib/noise/noise3d.glsl
#include frex:shaders/api/world.glsl

varying vec2 v_noise_uv;
varying float offset;

void frx_startFragment(inout frx_FragmentData fragData)
{
    if (0.6 < fragData.spriteColor.r)
    {
        float time = frx_renderSeconds();
        vec3 st = vec3(v_noise_uv / 3.0, time);

        vec4 flashColor = vec4(0.9843, 1.0, 0.749, 1.0);
        
        float longFlash = snoise(st / 2.0);
        float shortFlash = snoise(st * 4.0) * 0.2;

        float flash = longFlash + shortFlash * (1.0 + longFlash);
        flash *= 0.3;
        fragData.spriteColor = fragData.spriteColor * (1.0 - flash) + flashColor * flash;
        fragData.emissivity = fragData.emissivity + 0.1 + flash * 2.0;
    }
}