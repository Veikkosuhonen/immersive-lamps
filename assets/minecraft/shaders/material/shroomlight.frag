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
        vec3 st = vec3(v_noise_uv * 4.0, 16.0*time);

        vec4 flashColor = vec4(0.4314, 0.6314, 1.0, 1.0);
        
        float smallFlash = snoise(st/4.0) * 0.7;
        float period = snoise(st / 48.0) * 0.55;
        float flash = smoothstep(0.6, 1.0, smallFlash + period);
        fragData.spriteColor = fragData.spriteColor * (1.0 - flash) + flashColor * flash;
        fragData.emissivity = fragData.emissivity * (1.0 - flash) + flash * 2.0;
    }
}