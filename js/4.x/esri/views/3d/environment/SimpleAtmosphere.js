// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/views/3d/environment/materials/SimpleAtmosphereMaterial.xml":'\x3c?xml version\x3d"1.0" encoding\x3d"UTF-8"?\x3e\r\n\r\n\x3csnippets\x3e\r\n\r\n\x3csnippet name\x3d"vsSimpleAtmosphere"\x3e\x3c![CDATA[\r\n  $vsprecisionf\r\n\r\n  uniform mat4 proj;\r\n  uniform mat4 view;\r\n\r\n#ifndef PANORAMIC\r\n\r\n  const float TWICEPI \x3d 2.0*3.14159265;\r\n  const float ATMOSPHERE_RIM_SEGMENTS \x3d 128.0;\r\n\r\n  uniform vec3 silCircleCenter;\r\n  uniform vec3 silCircleV1;\r\n  uniform vec3 silCircleV2;\r\n  uniform vec2 texV;\r\n\r\n#endif\r\n\r\n  uniform vec3 lightDirection;\r\n\r\n  attribute vec3 $position;\r\n  varying vec2 vtc;\r\n  varying float falloff;\r\n\r\n  void main(void) {\r\n\r\n#ifdef PANORAMIC\r\n\r\n    vec3 pos \x3d $position;\r\n    float ndotl \x3d lightDirection.z;\r\n    vtc \x3d vec2(0, $position.z+0.05);\r\n\r\n#else\r\n\r\n    float phi \x3d $position.x * (TWICEPI / ATMOSPHERE_RIM_SEGMENTS) + 1.0;\r\n    vec3 pos \x3d (sin(phi) * silCircleV1 + cos(phi) * silCircleV2 + silCircleCenter) * $position.y;\r\n    float ndotl \x3d dot(normalize(pos), lightDirection);\r\n\r\n    vtc.x \x3d $position.x / ATMOSPHERE_RIM_SEGMENTS;\r\n    vtc.y \x3d texV.x * (1.0 - $position.z) + texV.y * $position.z;\r\n\r\n#endif\r\n\r\n    falloff \x3d max(0.0, (smoothstep(-1.0, 0.8, ndotl + ndotl)));\r\n\r\n    gl_Position \x3d proj * view * vec4(pos, 1.0);\r\n    gl_Position.z \x3d gl_Position.w; // project atmosphere onto the far plane\r\n  }\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"fsSimpleAtmosphere"\x3e\x3c![CDATA[\r\n  $fsprecisionf\r\n\r\n  uniform sampler2D tex;\r\n  uniform vec4 color;\r\n  varying vec2 vtc;\r\n  varying float falloff;\r\n\r\n  void main() {\r\n    vec4 texColor \x3d texture2D(tex, vtc);\r\n    gl_FragColor \x3d texColor * color * falloff;\r\n  }\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3c/snippets\x3e\r\n'}});
define("dojo/text!./materials/SimpleAtmosphereMaterial.xml dojo/Deferred ../../../core/watchUtils ../support/ExternalRenderer ../lib/glMatrix ../webgl-engine/lib/GeometryRenderer ../webgl-engine/lib/Texture ../webgl-engine/lib/Util ../webgl-engine/lib/GLTextureRep ../webgl-engine/lib/RenderPass ../webgl-engine/lib/RenderSlot ./resources/SimpleAtmosphereTexture ../support/earthUtils ../../webgl/Program ../webgl-engine/lib/DefaultVertexAttributeLocations".split(" "),function(w,x,y,z,q,A,B,m,C,D,E,F,
G,H,I){var l=G.earthRadius,c=q.vec3d,t=q.vec2d,u=q.mat4d,v=m.VertexAttrConstants,J=(l-1E4)/l,r=(l+3E5)/l,n=-1E4/3E5,p=1-n;return z.createSubclass({declaredClass:"esri.views.3d.environment.SimpleAtmosphere",properties:{view:{},needsRender:{value:!1},slot:{value:E.BACKGROUND,set:function(a){this.needsRender=!0;this._set("slot",a)}}},constructor:function(){this._renderData={texV:t.create(),silCircleCenter:c.create(),silCircleV1:c.create(),silCircleV2:c.create()};this._textureRep=this._texture=null},
initialize:function(){this._textureDfd=new x;this.addResolvingPromise(this._textureDfd.promise)},destroy:function(){this._currentViewChangedHandle&&(this._currentViewChangedHandle.remove(),this._currentViewChangedHandle=null);this._textureRep&&(this._texture&&(this._textureRep.release("SimpleAtmosphere"),this._textureRep.getTexture("SimpleAtmosphere").unload()),this._textureRep=null);this._program&&(this._program.dispose(),this._program=null);this._textureDfd&&(this._textureDfd.cancel(),this._textureDfd=
null)},initializeRenderContext:function(a){this._textureRep=new C({SimpleAtmosphere:new B(F,"SimpleAtmosphere",{wrapClamp:!0})},a.programRep,function(){return this.view.state.camera.viewport}.bind(this),a.rctx);this._texture=this._textureRep.aquire("SimpleAtmosphere",void 0,function(a){this._texture=a.getGLTexture();this._textureDfd.resolve();this._textureDfd=null}.bind(this))},setup:function(a){var d=this._createRibbonGeometryData();this._renderer=new A(d,[{name:"position",count:3,type:5126,offset:0,
stride:12,normalized:!1}],null,a.rctx);this._currentViewChangedHandle=y.init(this,"view.state.camera",this._update.bind(this),!0);a.shaderSnippets.vsSimpleAtmosphere||a.shaderSnippets._parse(w);this._program=new H(a.rctx,a.shaderSnippets.vsSimpleAtmosphere,a.shaderSnippets.fsSimpleAtmosphere,I.Default3D)},render:function(a){if(a.slot!==this.slot||a.pass!==D.MATERIAL)return!1;var d=this.renderContext.rctx,c=d.gl,b=this._program;d.bindProgram(b);b.setUniform4f("color",1,1,1,1);b.setUniformMatrix4fv("proj",
a.camera.projectionMatrix);b.setUniformMatrix4fv("view",a.camera.viewMatrix);b.setUniform3fv("silCircleCenter",this._renderData.silCircleCenter);b.setUniform3fv("silCircleV1",this._renderData.silCircleV1);b.setUniform3fv("silCircleV2",this._renderData.silCircleV2);b.setUniform2fv("texV",this._renderData.texV);d.bindTexture(this._texture,0);b.setUniform1i("tex",0);b.setUniform3fv("lightDirection",a.lightingData.direction);d.setDepthTestEnabled(!0);d.setDepthFunction(c.LEQUAL);d.setBlendingEnabled(!0);
d.setDepthWriteEnabled(!1);this._renderer.render(b);d.setBlendingEnabled(!1);d.setDepthWriteEnabled(!0);d.setDepthFunction(c.LESS);return!0},_update:function(a){var d=c.create(),k=c.create(),b=c.create(),e=this.view.renderCoordsHelper.getAltitude(a.eye);c.scale(a.eye,(l+50)/c.length(a.eye),b);this._computeSilhouetteCircle(b,a.center,a.up,l);c.add(this._renderData.silCircleCenter,this._renderData.silCircleV2,d);c.scale(d,r,k);var b=this._computeScreenRimWidth(b,a.up,d,k),g=0,h=1,f=1;50>e?(g=.001953125,
h=.1015625):500>e?(f=(e-50)/450,g=.001953125*(1-f)+.001953125*f,h=.1015625*(1-f)+.21875*f):5E3>e?(f=(e-500)/4500,g=.001953125*(1-f)+.001953125*f,h=.21875*(1-f)+.51171875*f):5E4>e&&(f=(e-5E3)/45E3,g=.001953125*(1-f)+.001953125*f,h=.51171875*(1-f)+.4140625*f);e=n+g*p;f=n+b*h*p;50<c.length(a.eye)-l&&(this._computeSilhouetteCircle(a.eye,a.center,a.up,l),c.add(this._renderData.silCircleCenter,this._renderData.silCircleV2,d),c.scale(d,r,k),a=this._computeScreenRimWidth(a.eye,a.up,d,k),a=m.clamp((a-1.5)/
(b-1.5),0,1),e=n+a*g*p,f=n+m.lerp(1,b*h,a)*p);t.set2(e,f,this._renderData.texV);this.needsRender=!0},_computeSilhouetteCircle:function(a,d,k,b){var e=c.length(a),g=b*Math.sqrt(e*e-b*b)/e,h=this._renderData.silCircleV1,f=this._renderData.silCircleV2;c.scale(a,Math.sqrt(b*b-g*g)/e,this._renderData.silCircleCenter);c.cross(a,d,h);1>c.length2(h)&&c.cross(a,k,h);c.scale(h,g/c.length(h));c.cross(h,a,f);c.scale(f,g/c.length(f));return g},_computeScreenRimWidth:function(a,d,k,b){var e=u.create();u.lookAt(a,
k,d,e);a=this.view.state.camera;m.project(k,e,a.projectionMatrix,a.viewport);m.project(b,e,a.projectionMatrix,a.viewport);return c.dist(k,b)/a.height},_createRibbonGeometryData:function(){for(var a=new Float32Array(768),d=new Uint32Array(768),c=0;128>c;c++){var b=6*c;a[b+0]=c;a[b+1]=J;a[b+2]=0;a[b+3]=c;a[b+4]=r;a[b+5]=1;var e=2*c,g=127===c?0:e+2;d[b+0]=e;d[b+1]=e+1;d[b+2]=g+1;d[b+3]=g+1;d[b+4]=g;d[b+5]=e}c={};c[v.POSITION]=d;d={};d[v.POSITION]={size:3,data:a};return{indices:c,vertexAttr:d}}})});