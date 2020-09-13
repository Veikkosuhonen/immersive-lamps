#include frex:shaders/api/fragment.glsl
#include frex:shaders/lib/noise/noise2d.glsl
#include frex:shaders/api/world.glsl

varying vec2 v_noise_uv;

float fbm( in vec2 st )
{
    float G = 0.55;
    float a = 0.75;
    float t = 0.0;

    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(.5), sin(.5), -sin(.5), cos(.5));
     for( int i=0; i<3; i++ )
    {
        t += a*snoise(st);
        st = rot * st * 2.0 + shift;
        a *= G;
    } 
    return t*t;
}

void frx_startFragment(inout frx_FragmentData fragData)
{
    float mixVal = smoothstep(0.3, 1.3, fragData.spriteColor.r);
    
    float time = frx_renderSeconds() / 128.0;

    vec2 st = v_noise_uv / 5.0;
    st += vec2(time);

    vec2 q = vec2(.0);
    q.x = fbm(st - vec2(time) + vec2(8, 1));
    q.y = fbm(st - vec2(time));

    vec2 r = vec2(.0);
    r.x = fbm(st + q + vec2(48.6,15.8));
    r.y = fbm(st + q + vec2(5.3, 9.6) + vec2(time*3.));

    float f = fbm(st + r);
    
    vec3 color1 = vec3(0.0, 0.5608, 0.5333);
    vec3 color2 = vec3(0.1373, 0.8, 1.0) * f;
    vec3 color3 = vec3(0.0, 0.9804, 0.6549);

    vec3 color = color1 + color2 * f;
    color =      mix(color, color3, clamp(r.x, 0.0, 1.0));
    color += ((0.5-f) * (0.5-f) + q.y) * vec3(0.0, 0.6353, 1.0);
    
    fragData.spriteColor = mix(fragData.spriteColor, vec4( color, 1.0), mixVal);
    fragData.emissivity = frx_luminance(fragData.spriteColor.rgb);
    
    
    
}