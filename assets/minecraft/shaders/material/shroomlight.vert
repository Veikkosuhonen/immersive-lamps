#include frex:shaders/api/vertex.glsl
#include frex:shaders/lib/face.glsl

varying vec2 v_noise_uv;
varying float offset;

void frx_startVertex(inout frx_VertexData data) {
	v_noise_uv = frx_faceUv(data.vertex.xyz, data.normal);
	offset = 1024.0 * (data.vertex.x + data.vertex.y + data.vertex.z);
	
}