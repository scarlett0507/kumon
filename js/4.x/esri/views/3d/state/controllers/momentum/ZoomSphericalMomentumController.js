// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../core/tsSupport/extendsHelper ../../../camera/constraintUtils ../../../lib/glMatrix ./MomentumController ../../utils/navigationUtils".split(" "),function(d,f,g,h,b,k,c){Object.defineProperty(f,"__esModule",{value:!0});d=function(d){function e(a,l,c,e,f){a=d.call(this,a,1)||this;a.momentum=l;a.screenCenter=b.vec2d.create();a.sceneCenter=b.vec3d.create();a.tmpSceneCenter=b.vec3d.create();a.tmpZoomAxis=b.vec3d.create();a.sphere={center:b.vec3d.create(),radius:0};
b.vec2d.set(c,a.screenCenter);b.vec3d.set(e,a.sceneCenter);a.sphere.radius=f;return a}g(e,d);e.prototype.momentumStep=function(a,b){a=this.momentum.valueDelta(0,a);c.applyZoomOnSphere(this.sphere,b,a);this.constraintOptions.interactionType=1;h.applyAll(this.view,b,this.constraintOptions);c.sphereOrSilhouettePointFromScreenPoint(this.sphere,b,this.screenCenter,this.tmpSceneCenter);a=c.rotationAndAxisFromPoints(this.sceneCenter,this.tmpSceneCenter,this.tmpZoomAxis);c.applyRotation(b,this.sphere.center,
this.tmpZoomAxis,a);this.constraintOptions.interactionType=4};return e}(k.MomentumController);f.ZoomSphericalMomentumController=d});