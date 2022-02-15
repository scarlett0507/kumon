// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../Color ../../../core/JSONSupport ../../../core/lang ../../../core/accessorSupport/decorators ../../../core/accessorSupport/ensureType".split(" "),function(b,c,f,e,g,h,k,d,l){Object.defineProperty(c,"__esModule",{value:!0});b=function(b){function a(){var a=null!==b&&b.apply(this,arguments)||this;a.description=null;a.label=null;a.minValue=0;a.maxValue=0;a.color=null;return a}f(a,b);c=
a;a.prototype.clone=function(){return new c({description:this.description,label:this.label,minValue:this.minValue,maxValue:this.maxValue,color:k.clone(this.color)})};e([d.property({type:String,json:{write:!0}})],a.prototype,"description",void 0);e([d.property({type:String,json:{write:!0}})],a.prototype,"label",void 0);e([d.property({type:Number,json:{read:{source:"classMinValue"},write:{target:"classMinValue"}}})],a.prototype,"minValue",void 0);e([d.property({type:Number,json:{read:{source:"classMaxValue"},
write:{target:"classMaxValue"}}})],a.prototype,"maxValue",void 0);e([d.property({type:g,json:{type:[l.Integer],write:!0}})],a.prototype,"color",void 0);return a=c=e([d.subclass("esri.renderers.support.pointCloud.ColorClassBreakInfo")],a);var c}(d.declared(h));c.ColorClassBreakInfo=b;c.default=b});