// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("./Promise ./Accessor ./Error ./Warning dojo/aspect dojo/_base/lang dojo/Deferred".split(" "),function(c,b,d,e,f,g,h){return c.createSubclass([b],{declaredClass:"esri.core.Loadable","-chains-":g.mixin(b._meta.chains,{load:"after"}),constructor:function(){this._set("loadWarnings",[]);var a=new h;this.addResolvingPromise(a.promise);f.around(this,"load",function(k){return function(){"not-loaded"===this.loadStatus&&(this.loadStatus="loading",k.apply(this));a&&(a.resolve(),a=null);return this.when()}});
this.when(function(a){this.loadStatus="loaded"}.bind(this),function(a){this.loadStatus="failed";this.loadError=a}.bind(this))},properties:{loaded:{readOnly:!0,dependsOn:["loadStatus"],get:function(){return"loaded"===this.loadStatus}},loadError:null,loadStatus:"not-loaded",loadWarnings:{type:[e],readOnly:!0}},load:function(){},cancelLoad:function(){if(this.isFulfilled())return this;this.loadError=new d("load:cancelled","Cancelled");this._promiseProps.cancel(this.loadError);return this}})});