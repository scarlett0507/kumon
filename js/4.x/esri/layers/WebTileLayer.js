// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("dojo/_base/lang dojo/_base/url dojo/string ../core/Error ../core/MultiOriginJSONSupport ../core/urlUtils ../geometry/SpatialReference ../geometry/Extent ../geometry/Point ./TiledLayer ./mixins/OperationalLayer ./mixins/ScaleRangeLayer ./mixins/PortalLayer ./mixins/RefreshableLayer ./support/TileInfo ./support/LOD ./support/commonProperties".split(" "),function(e,g,l,m,n,h,d,p,q,r,t,u,v,w,k,b,x){return r.createSubclass([t,n,u,v,w],{declaredClass:"esri.layers.WebTileLayer",normalizeCtorArgs:function(a,
c){return"string"===typeof a?e.mixin({urlTemplate:a},c||{}):a},getDefaults:function(a){var c=new p(-2.0037508342787E7,-2.003750834278E7,2.003750834278E7,2.0037508342787E7,d.WebMercator);return e.mixin(this.inherited(arguments),{fullExtent:c,tileInfo:new k({size:256,dpi:96,format:"PNG8",compressionQuality:0,origin:new q({x:-2.0037508342787E7,y:2.0037508342787E7,spatialReference:d.WebMercator}),spatialReference:d.WebMercator,lods:[new b({level:0,scale:5.91657527591555E8,resolution:156543.033928}),new b({level:1,
scale:2.95828763795777E8,resolution:78271.5169639999}),new b({level:2,scale:1.47914381897889E8,resolution:39135.7584820001}),new b({level:3,scale:7.3957190948944E7,resolution:19567.8792409999}),new b({level:4,scale:3.6978595474472E7,resolution:9783.93962049996}),new b({level:5,scale:1.8489297737236E7,resolution:4891.96981024998}),new b({level:6,scale:9244648.868618,resolution:2445.98490512499}),new b({level:7,scale:4622324.434309,resolution:1222.99245256249}),new b({level:8,scale:2311162.217155,resolution:611.49622628138}),
new b({level:9,scale:1155581.108577,resolution:305.748113140558}),new b({level:10,scale:577790.554289,resolution:152.874056570411}),new b({level:11,scale:288895.277144,resolution:76.4370282850732}),new b({level:12,scale:144447.638572,resolution:38.2185141425366}),new b({level:13,scale:72223.819286,resolution:19.1092570712683}),new b({level:14,scale:36111.909643,resolution:9.55462853563415}),new b({level:15,scale:18055.954822,resolution:4.77731426794937}),new b({level:16,scale:9027.977411,resolution:2.38865713397468}),
new b({level:17,scale:4513.988705,resolution:1.19432856685505}),new b({level:18,scale:2256.994353,resolution:.597164283559817}),new b({level:19,scale:1128.497176,resolution:.298582141647617})]})})},properties:{copyright:{type:String,value:"",json:{write:!0}},fullExtent:{json:{write:!0}},legendEnabled:{json:{read:{source:["showLegend"],reader:function(a,c){return null!=c.showLegend?c.showLegend:!0}},write:{target:"showLegend"}}},levelValues:{dependsOn:["tileInfo"],get:function(){var a=[];if(!this.tileInfo)return null;
this.tileInfo.lods.forEach(function(c){a[c.level]=c.levelValue||c.level},this);return a}},operationalLayerType:"WebTiledLayer",popupEnabled:x.popupEnabled,refreshInterval:{json:{write:!0}},spatialReference:{type:d,value:d.WebMercator,json:{read:{source:["spatialReference","fullExtent.spatialReference"],reader:function(a,c){return a||c.fullExtent&&c.fullExtent.spatialReference&&d.fromJSON(c.fullExtent.spatialReference)}}}},subDomains:{type:[String],value:null,json:{write:!0}},tileInfo:{type:k,json:{write:!0}},
tileServers:{value:null,dependsOn:["urlTemplate","subDomains"],get:function(){if(!this.urlTemplate)return null;var a=new g(this.urlTemplate),c=a.scheme?a.scheme+"://":"//",b=c+a.authority+"/",d=this.subDomains,e,f=[];-1===a.authority.indexOf("{subDomain}")&&f.push(b);d&&0<d.length&&1<a.authority.split(".").length&&d.forEach(function(b){-1<a.authority.indexOf("{subDomain}")&&(e=c+a.authority.replace(/\{subDomain\}/gi,b)+"/");f.push(e)},this);return f=f.map(function(a){"/"!==a.charAt(a.length-1)&&(a+=
"/");return a})}},type:{value:"web-tile",json:{read:!1}},urlPath:{dependsOn:["urlTemplate"],get:function(){if(!this.urlTemplate)return null;var a=this.urlTemplate,c=new g(a);return a.substring(((c.scheme?c.scheme+"://":"//")+c.authority+"/").length)}},urlTemplate:{type:String,json:{origins:{"portal-item":{read:{source:"url"}}},read:{source:["urlTemplate","templateUrl"],reader:function(a,c){return a||c.templateUrl}},write:{target:"templateUrl",writer:function(a,c,b){a&&h.isProtocolRelative(a)&&(a=
"https:"+a);c[b]=a?h.normalize(a):a}}}},url:{json:{write:!1}},wmtsInfo:{json:{write:!0}}},getTileUrl:function(a,c,b){a=this.levelValues[a];var d=this.tileServers[c%this.tileServers.length]+l.substitute(this.urlPath,{level:a,col:b,row:c});return d=d.replace(/\{level\}/gi,a).replace(/\{row\}/gi,c).replace(/\{col\}/gi,b)},load:function(){var a=this.loadFromPortal({supportedTypes:["WMTS"]}).then(function(){if(!this.urlTemplate)throw new m("layer:load","WebTileLayer (title: '"+this.title+"', id: '"+this.id+
"') is missing the required 'urlTemplate' property value");}.bind(this));this.addResolvingPromise(a);return this}})});