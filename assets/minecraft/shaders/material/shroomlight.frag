#include frex:shaders/api/fragment.glsl
#include frex:shaders/lib/noise/noise3d.glsl
#include frex:shaders/api/world.glsl

varying vec2 v_noise_uv;
varying float offset;

void frx_startFragment(inout frx_FragmentData fragData)
{
    if (0.8 < fragData.spriteColor.g)
    {
        float time = frx_renderSeconds();
        vec2 st = v_noise_uv;

        vec4 flashColor = vec4(0.5294, 0.9882, 0.9098, 1.0);
        
        float smallFlash = snoise(vec3(st, 8.0 * time));
        float period = snoise(vec3(st / 5.0, time / 16.0)) * 0.75;
        float flash = smoothstep(0.62, 0.9, smallFlash * period + period);
        fragData.spriteColor = fragData.spriteColor * (1.0 - flash) + flashColor * flash;
        fragData.emissivity = fragData.emissivity * (1.0 - flash) + flash * 2.0;
    }
}