// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/views/2d/engine/webgl/shaders/hlShaders.xml":'\x3c?xml version\x3d"1.0" encoding\x3d"UTF-8"?\x3e\r\n\x3c!--\r\n  Highlight generation and rendering shaders.\r\n\r\n  These shader sources are loaded by hlShaderSnippets.ts which in turn\r\n  is used by HighlightRenderer to instantiate the programs needed for\r\n  generating and rendering the highlights.\r\n\r\n  These shaders are intended to be used with full screen quads.\r\n--\x3e\r\n\x3csnippets\x3e\r\n  \x3c!--\r\n    Vertex shader: texturedVS\r\n\r\n    Identity vertex shader that outputs an untransformed 2-D vertex\r\n    and passes its texture coordinates unchanged to the interpolator.\r\n  --\x3e\r\n  \x3csnippet name\x3d"texturedVS"\x3e\r\n    \x3c![CDATA[\r\n    // Vertex position.\r\n    attribute mediump vec2 a_position;\r\n\r\n    // Texture coordinates.\r\n    attribute mediump vec2 a_texcoord;\r\n\r\n    // Texture coordinates to be interpolated.\r\n    varying mediump vec2 v_texcoord;\r\n\r\n    void main(void) {\r\n      // Pass the position unchanged.\r\n      gl_Position \x3d vec4(a_position, 0.0, 1.0);\r\n\r\n      // Pass the texture coordinates unchanged.\r\n      v_texcoord \x3d a_texcoord;\r\n    }\r\n    ]]\x3e\r\n  \x3c/snippet\x3e\r\n\r\n  \x3c!--\r\n    Fragment shader: blurFS\r\n\r\n    A gaussian blur shader. It blurs the alpha channel of its input\r\n    according to 4 different sigma and stores the results into the\r\n    four channel of the target framebuffer.\r\n\r\n    It is intended to be called twice; the first time to perform an\r\n    horizontal blur, and a second time to perform a vertical blur.\r\n\r\n    This shader is used to turn the highlight mask into a highlight\r\n    map. The highlight map is an approximation of the signed distance\r\n    field of the mask.\r\n  --\x3e\r\n  \x3csnippet name\x3d"blurFS"\x3e\r\n    \x3c![CDATA[\r\n    // Interpolated texture coordinates.\r\n    varying mediump vec2 v_texcoord;\r\n\r\n    // Blur direction information. There are two possible\r\n    // configurations that the host code can use.\r\n    //  - [1, 0, 1/WIDTH, 0] Used when blurring horizontally. In this\r\n    //    case u_direction[0] \x3d 1 is expressed in pixel and is fed to\r\n    //    the gauss function to produce the value of the gaussian weight\r\n    //    for that pixel, while u_direction[2] \x3d 1/WIDTH is in texel units\r\n    //    and is used to sample the right texel from the texture map.\r\n    //  - [0, 1, 0, 1/HEIGHT] Used when blurring vertically. In this\r\n    //    case u_direction[1] \x3d 1 is expressed in pixel and is fed to\r\n    //    the gauss function to produce the value of the gaussian weight\r\n    //    for that pixel, while u_direction[3] \x3d 1/HEIGHT is in texel units\r\n    //    and is used to sample the right texel from the texture map.\r\n    uniform mediump vec4 u_direction;\r\n\r\n    // Source to destination channel selection matrix.\r\n    uniform mediump mat4 u_channelSelector;\r\n\r\n    // The highlight map is obtained by blurring the alpha channel of the highlight\r\n    // mask accroding to these 4 values of the gaussian\'s sigma parameter.\r\n    uniform mediump vec4 u_sigmas;\r\n\r\n    // This is the highlight mask if we have not blurred horizontally yet, otherwise\r\n    // it is the horizontally blurred highlight map and blurring it one more time\r\n    // vertically will complete the process.\r\n    uniform sampler2D u_texture;\r\n\r\n    // The gaussian kernel. Note that it lacks the normalization constant, because\r\n    // we want to store it unnormalized in the highlight map (i.e. having a peak\r\n    // value of 1). Note also that we are using the SIMD (single instruction, multiple\r\n    // data) capabilities of the GPU to compute four different gaussian kernels, one\r\n    // for each sigma.\r\n    mediump vec4 gauss(mediump vec2 dir) {\r\n      return exp(-dot(dir, dir) / (2.0 * u_sigmas * u_sigmas));\r\n    }\r\n\r\n    mediump vec4 selectChannel(mediump vec4 sample) {\r\n      return u_channelSelector * sample;\r\n    }\r\n\r\n    // Sample the input texture and accumulated its gaussian weighted value and the\r\n    // total weight.\r\n    void accumGauss(mediump float i, inout mediump vec4 tot, inout mediump vec4 weight) {\r\n      // Computes the gaussian weights, one for each sigma.\r\n      // Note that u_direction.xy is [1, 0] when blurring horizontally and [0, 1] when blurring vertically.\r\n      mediump vec4 w \x3d gauss(i * u_direction.xy);\r\n\r\n      // Accumumates the values.\r\n      // Note that u_direction.xy is [1/WIDTH, 0] when blurring horizontally and [0, 1/HEIGHT] when blurring vertically.\r\n      tot +\x3d selectChannel(texture2D(u_texture, v_texcoord + i * u_direction.zw)) * w;\r\n\r\n      // Accumulates the weights.\r\n      weight +\x3d w;\r\n    }\r\n\r\n    void main(void) {\r\n      // Initialize accumulated values and weights to zero.\r\n      mediump vec4 tot \x3d vec4(0.0, 0.0, 0.0, 0.0);\r\n      mediump vec4 weight \x3d vec4(0.0, 0.0, 0.0, 0.0);\r\n\r\n      // Accumulates enough samples. These will be taken\r\n      // horizontally or vertically depending on the value\r\n      // of u_direction.\r\n      accumGauss(-5.0, tot, weight);\r\n      accumGauss(-4.0, tot, weight);\r\n      accumGauss(-3.0, tot, weight);\r\n      accumGauss(-2.0, tot, weight);\r\n      accumGauss(-1.0, tot, weight);\r\n      accumGauss(0.0, tot, weight);\r\n      accumGauss(1.0, tot, weight);\r\n      accumGauss(2.0, tot, weight);\r\n      accumGauss(3.0, tot, weight);\r\n      accumGauss(4.0, tot, weight);\r\n      accumGauss(5.0, tot, weight);\r\n\r\n      // Compute blurred values.\r\n      mediump vec4 rgba \x3d tot / weight;\r\n\r\n      // Return the values. Note that each channel will contain\r\n      // the result of a different blur operation, one for each\r\n      // of the four chosen sigma.\r\n      gl_FragColor \x3d vec4(rgba);\r\n    }\r\n    ]]\x3e\r\n  \x3c/snippet\x3e\r\n\r\n  \x3c!--\r\n    Fragment shader: highlightFS\r\n\r\n    Takes as input the highlight map, estimated the signed distance field,\r\n    and shades the fragments according to their estimated distance from the\r\n    edge of the highlighted feature.\r\n\r\n    A shade texture is used to turn distance values into colors; the shade\r\n    texture is basically a color gradient and is recomputed on the host\r\n    every time that the user alters the highlight options.\r\n  --\x3e\r\n  \x3csnippet name\x3d"highlightFS"\x3e\r\n    \x3c![CDATA[\r\n    // Interpolated texture coordinates.\r\n    varying mediump vec2 v_texcoord;\r\n\r\n    // The highlight map. Each channel is a blurred\r\n    // version of the alpha channel of the highlight mask.\r\n    //  - Channel 0 (red) corresponds to a gaussian blur with sigma \x3d u_sigmas[0];\r\n    //  - Channel 1 (green) corresponds to a gaussian blur with sigma \x3d u_sigmas[1];\r\n    //  - Channel 2 (blue) corresponds to a gaussian blur with sigma \x3d u_sigmas[2];\r\n    //  - Channel 3 (alpha) corresponds to a gaussian blur with sigma \x3d u_sigmas[3];\r\n    // As of today, only channel 3 is used for distance estimation.\r\n    // But the availability of different amounts of blur leaves the\r\n    // door open to multi-scale approaches.\r\n    uniform sampler2D u_texture;\r\n\r\n    // The highlight map was obtained by blurring the alpha channel of the highlight\r\n    // mask accroding to these 4 values of the gaussian\'s sigma parameter.\r\n    uniform mediump vec4 u_sigmas;\r\n\r\n    // A 1-D texture used to shade the highlight.\r\n    uniform sampler2D u_shade;\r\n\r\n    // The 1-D shade texture is spreaded between u_minMaxDistance[0] and u_minMaxDistance[1].\r\n    uniform mediump vec2 u_minMaxDistance;\r\n\r\n    // Signed distance estimation.\r\n    mediump float estimateDistance() {\r\n      // Use the largest sigma and the corresponding distance value stored in the\r\n      // last channel of the highlight map.\r\n      mediump float sigma \x3d u_sigmas[3];\r\n      mediump float y \x3d texture2D(u_texture, v_texcoord)[3];\r\n\r\n      // Estimates the distance by linearization and local inversion around\r\n      // the inflection point. The inflection point is in x \x3d 0.\r\n      const mediump float y0 \x3d 0.5;                           // Value of the convolution at the inflection point.\r\n      mediump float m0 \x3d 1.0 / (sqrt(2.0 * 3.1415) * sigma);  // Slope of the convolution at the inflection point.\r\n      mediump float d \x3d (y - y0) / m0;                        // Inversion of a local linearization.\r\n\r\n      // Return the estimated distance.\r\n      return d;\r\n    }\r\n\r\n    // Shading based on estimated distance.\r\n    mediump vec4 shade(mediump float d) {\r\n      // Maps the sampled distance from the [A, D] range (see HighlightRenderer::setHighlightOptions) to [0, 1].\r\n      mediump float mappedDistance \x3d (d - u_minMaxDistance.x) / (u_minMaxDistance.y - u_minMaxDistance.x);\r\n\r\n      // Force to [0, 1]; it should not be necessary because the shade texture uses the CLAMP address mode, so\r\n      // this should happen anyway internally to the sampler, but in practice it is needed to avoid weird\r\n      // banding artifacts.\r\n      // We don\'t really know if we need this or not.\r\n      mappedDistance \x3d clamp(mappedDistance, 0.0, 1.0);\r\n\r\n      // Sample the 1-D shade texture on its center line (i.e. on t\x3d0.5).\r\n      return texture2D(u_shade, vec2(mappedDistance, 0.5));\r\n    }\r\n\r\n    void main(void) {\r\n      // Estimate the distance.\r\n      mediump float d \x3d estimateDistance();\r\n\r\n      // Shade the distance.\r\n      gl_FragColor \x3d shade(d);\r\n    }\r\n    ]]\x3e\r\n  \x3c/snippet\x3e\r\n\x3c/snippets\x3e\r\n'}});
define(["require","exports","dojo/text!./hlShaders.xml","../../../../webgl/ShaderSnippets"],function(a,d,c,b){a=new b;b.parse(c,a);return a});