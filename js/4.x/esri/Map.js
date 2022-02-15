// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ./core/tsSupport/declareExtendsHelper ./core/tsSupport/decorateHelper ./Basemap ./Ground ./core/Accessor ./core/CollectionFlattener ./core/Evented ./core/Logger ./core/accessorSupport/decorators ./support/basemapUtils ./support/groundUtils ./support/LayersMixin".split(" "),function(u,v,h,d,k,e,l,m,n,p,c,f,q,r){var t=p.getLogger("esri.Map");return function(g){function b(a){a=g.call(this)||this;a.basemap=null;a.ground=new e;a._basemapCache=f.createCache();return a}h(b,g);Object.defineProperty(b.prototype,
"allLayers",{get:function(){return new m({root:this,rootCollectionNames:["basemap.baseLayers","ground.layers","layers","basemap.referenceLayers"],getChildrenFunction:function(a){return a.layers}})},enumerable:!0,configurable:!0});b.prototype.castBasemap=function(a){return f.ensureType(a,this._basemapCache)};b.prototype.castGround=function(a){a=q.ensureType(a);return a?a:(t.error("Map.ground may not be set to null or undefined"),this._get("ground"))};d([c.property({readOnly:!0})],b.prototype,"allLayers",
null);d([c.property({type:k})],b.prototype,"basemap",void 0);d([c.cast("basemap")],b.prototype,"castBasemap",null);d([c.property({type:e})],b.prototype,"ground",void 0);d([c.cast("ground")],b.prototype,"castGround",null);return b=d([c.subclass("esri.Map")],b)}(c.declared(l,n,r))});