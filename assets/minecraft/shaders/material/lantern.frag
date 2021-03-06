#include frex:shaders/api/fragment.glsl
#include frex:shaders/lib/noise/noise2d.glsl
#include frex:shaders/api/world.glsl

varying vec2 v_noise_uv;

float fbm( in vec2 st )
{
    float G = 0.5;
    float a = 0.75;
    float t = 0.0;

    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(.5), sin(.5), -sin(.5), cos(.5));
     for( int i=0; i<4; i++ )
    {
        t += a*snoise(st);
        st = rot * st * 2.0 + shift;
        a *= G;
    } 
    return t*t;
}

void frx_startFragment(inout frx_FragmentData fragData)
{
    float mixVal = smoothstep(0.26, 1.4, fragData.spriteColor.r);
    float time = frx_renderSeconds();
    vec2 st = v_noise_uv / 2.0;
    st += vec2(0.0, -time * 1.5);

    float f = 0.7 * fbm(st) + 0.3;
    
    vec3 color = vec3(0.6) + vec3(1.0, f, f/3.0) * f;

    fragData.spriteColor = mix(fragData.spriteColor, vec4( color, 1.0), mixVal);
    fragData.emissivity = frx_luminance(fragData.spriteColor.rgb);
}