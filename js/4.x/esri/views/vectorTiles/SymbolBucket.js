// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/extendsHelper ../../core/tsSupport/decorateHelper dojox/string/BidiEngine ../2d/engine/webgl/Geometry ../2d/engine/webgl/TextShaping ./Bucket ./GeometryUtils ./Placement ./style/StyleLayer".split(" "),function(N,O,I,P,J,A,K,L,t,F,G){function M(t,g){if(t.iconMosaicItem&&g.iconMosaicItem){if(t.iconMosaicItem.page!==g.iconMosaicItem.page)return t.iconMosaicItem.page<g.iconMosaicItem.page?-1:1}else{if(t.iconMosaicItem&&!g.iconMosaicItem)return 1;if(!t.iconMosaicItem&&
g.iconMosaicItem)return-1}return 0}(function(){return function(){}})();return function(H){function g(a,b,e,c,h,d,f,y){b=H.call(this,a,b)||this;b._markerMap=new Map;b._glyphMap=new Map;b._glyphBufferDataStorage=new Map;b._sdfMarkers=!1;if(a.hasDataDrivenIcon!==e.isDataDriven())throw Error("incompatible icon buffer");if(a.hasDataDrivenText!==h.isDataDriven())throw Error("incompatible text buffer");b._iconVertexBuffer=e;b._iconIndexBuffer=c;b._textVertexBuffer=h;b._textIndexBuffer=d;b._placementEngine=
f;b._workerTileHandler=y;return b}I(g,H);Object.defineProperty(g.prototype,"markerPageMap",{get:function(){return this._markerMap},enumerable:!0,configurable:!0});Object.defineProperty(g.prototype,"glyphsPageMap",{get:function(){return this._glyphMap},enumerable:!0,configurable:!0});Object.defineProperty(g.prototype,"sdfMarker",{get:function(){return this._sdfMarkers},enumerable:!0,configurable:!0});g.prototype.copy=function(a,b,e,c,h){a=new g(this.layer,this.zoom,a,b,e,c,h,this._workerTileHandler);
a.layerIndex=this.layerIndex;a.layerExtent=this.layerExtent;a._iconIndexStart=b.index;a._textIndexStart=c.index;a._iconIndexCount=0;a._textIndexCount=0;a._symbolInstances=this._symbolInstances;a._workerTileHandler=this._workerTileHandler;a._fontArray=this._fontArray;a._textLayout=this._textLayout;a._iconLayout=this._iconLayout;a._isLinePlacement=this._isLinePlacement;a._avoidEdges=this._avoidEdges;return a};g.prototype.getResources=function(a,b,e){var c=this.layer,h=this.zoom,d=c.hasDataDrivenIcon,
f=c.hasDataDrivenText;a&&a.setExtent(this.layerExtent);for(var y=c.getLayoutProperty("icon-image"),m=c.getLayoutProperty("text-field"),D=c.getLayoutValue("text-font",h),q=c.getLayoutValue("text-transform",h),v=[],k=0,u=this._features;k<u.length;k++){var l=u[k],n=l.getGeometry(a);if(n&&0!==n.length){var x=void 0;y&&(x=c.getLayoutValue("icon-image",h,l),y.isDataDriven||(x=this._replaceKeys(x,l.values)),x&&b.add(x));var p=void 0,r=!1;if(m&&(p=c.getLayoutValue("text-field",h,l),m.isDataDriven||(p=this._replaceKeys(p,
l.values)),p)){switch(q){case 2:p=p.toLowerCase();break;case 1:p=p.toUpperCase()}g._bidiEngine.hasBidiChar(p)&&(r=void 0,r="rtl"===g._bidiEngine.checkContextual(p)?"IDNNN":"ICNNN",p=g._bidiEngine.bidiTransform(p,r,"VLYSN"),r=!0);var w=p.length;if(0<w)for(var z=0,t=D;z<t.length;z++){var C=t[z],A=e[C];A||(A=e[C]=new Set);for(C=0;C<w;C++){var E=p.charCodeAt(C);A.add(E)}}}if(x||p)w=c.getLayoutValue("icon-size",h,l),z=c.getLayoutValue("text-size",h,l),l={sprite:x,label:p,rtl:r,geometry:n,iconSize:w,iconRotate:c.getLayoutValue("icon-rotate",
h,l),ddIconValues:d?{color:c.getPaintValue("icon-color",h,l),opacity:c.getPaintValue("icon-opacity",h,l),size:w}:null,textSize:z,textRotate:c.getLayoutValue("text-rotate",h,l),ddTextValues:f?{color:c.getPaintValue("text-color",h,l),opacity:c.getPaintValue("text-opacity",h,l),size:z}:null},v.push(l)}}this._symbolFeatures=v};g.prototype.processFeatures=function(a,b){a&&a.setExtent(this.layerExtent);var e=this.layer,c=this.zoom;b=this._isLinePlacement=1===e.getLayoutValue("symbol-placement",c);a=this._avoidEdges=
e.getLayoutValue("symbol-avoid-edges",c)&&!b;var h=8*e.getLayoutValue("symbol-spacing",c),d=e.getLayoutProperty("icon-image"),f=e.getLayoutProperty("text-field"),y=this._workerTileHandler,m,D;d&&(this._iconLayout=new G.IconLayout(e,c,b),m=y.getSpriteItems(),D=this._getTranslate(!0));var q,v,k;if(f){q=this._textLayout=new G.TextLayout(e,c,b);this._fontArray=q.fontArray;k=.5;switch(q.anchor){case 5:case 1:case 7:k=0;break;case 6:case 2:case 8:k=1}v=.5;switch(q.anchor){case 5:case 3:case 6:v=0;break;
case 7:case 4:case 8:v=1}e=.5;switch(q.justify){case 0:e=0;break;case 2:e=1}var c=24*q.letterSpacing,d=b?0:24*q.maxWidth,f=24*q.lineHeight,u=[24*q.offset[0],24*q.offset[1]];q=this._fontArray.map(function(a){return y.getGlyphItems(a)});v=new K(q,d,f,c,u,k,v,e);k=this._getTranslate(!1)}this._iconIndexStart=this._iconIndexBuffer.index;this._textIndexStart=this._textIndexBuffer.index;this._textIndexCount=this._iconIndexCount=0;this._markerMap.clear();this._glyphMap.clear();this._symbolInstances=e=[];
c=this._textLayout;d=1;c&&c.size&&(d=c.size/24);f=c?c.maxAngle*t.C_DEG_TO_RAD:0;q=c?8*c.size:0;for(var u=0,l=this._symbolFeatures;u<l.length;u++){var n=l[u],x=void 0;n.sprite&&(x=m[n.sprite])&&x.sdf&&(this._sdfMarkers=!0);var p=void 0,r=n.label,w=0;if(r&&(p=v.getShaping(r,n.rtl))&&0<p.length){for(var w=1E30,r=-1E30,z=0,B=p;z<B.length;z++)var C=B[z],w=Math.min(w,C.x),r=Math.max(r,C.x);w=(r-w+48)*d*8}r=0;for(z=n.geometry;r<z.length;r++){var B=z[r],A=void 0;b?(p&&0<p.length&&c&&c.size&&g._smoothVertices(B,
8*c.size*(2+Math.min(2,4*Math.abs(c.offset[1])))),A=g._findAnchors(B,h,w)):A=[new F.Anchor(B[0].x,B[0].y)];for(C=0;C<A.length;C++){var E=A[C];0>E.x||4096<E.x||0>E.y||4096<E.y||b&&0<w&&0===c.rotationAlignment&&!g._honorsTextMaxAngle(B,E,w,f,q)||e.push({shaping:p,line:B,iconMosaicItem:x,anchor:E,iconSize:n.iconSize,iconRotate:n.iconRotate,ddIconValues:n.ddIconValues,textSize:n.textSize,textRotate:n.textRotate,ddTextValues:n.ddTextValues})}}}e.sort(M);for(m=0;m<e.length;m++)this._processFeature(e[m],
D,k,a);this._addPlacedGlyphs()};g.prototype.updateSymbols=function(){this._iconIndexStart=this._iconIndexBuffer.index;this._textIndexStart=this._textIndexBuffer.index;this._textIndexCount=this._iconIndexCount=0;this._markerMap.clear();this._glyphMap.clear();var a=this._avoidEdges,b=this.layer,e;b.getLayoutProperty("icon-image")&&(e=this._getTranslate(!0));var c;b.getLayoutProperty("text-field")&&(c=this._getTranslate(!1));for(var b=0,h=this._symbolInstances;b<h.length;b++)this._processFeature(h[b],
e,c,a);this._addPlacedGlyphs()};g.prototype._getTranslate=function(a){var b=this.layer.getPaintValue(a?"icon-translate":"text-translate",this.zoom);if(0!==b[0]||0!==b[1]){var e=this._placementEngine.mapAngle;return 0!==e&&0===this.layer.getPaintValue(a?"icon-translate-anchor":"text-translate-anchor",this.zoom)?(a=Math.sin(e),e=Math.cos(e),[8*(b[0]*e-b[1]*a),8*(b[0]*a+b[1]*e)]):[8*b[0],8*b[1]]}};g.prototype._replaceKeys=function(a,b){return a.replace(/{([^{}]+)}/g,function(a,c){return c in b?b[c]:
""})};g.prototype._processFeature=function(a,b,e,c){var h=a.line,d=a.iconMosaicItem,f=a.shaping,y=a.anchor,m=this._iconLayout,g=m&&!!d,q=!0,v=1;g&&(m.size=a.iconSize,m.rotate=a.iconRotate,v=8*m.size,q=m.optional||!d);var k=this._textLayout,u=k&&f&&0<f.length,l;l=1;var n=!0;u&&(k.size=a.textSize,k.rotate=a.textRotate,l=k.size/24,l*=8,n=k.optional||!f||0===f.length);var x=new A.Point(0,-17),p;if(g){p=this._placementEngine.getIconPlacement(y,b,d,v,h,m,c);if(p.footprint.minzoom===t.C_INFINITY&&!q)return;
y.minzoom>p.footprint.minzoom&&(p.footprint.minzoom=y.minzoom)}var r;if(u&&(r=this._placementEngine.getTextPlacement(y,e,x,f,l,h,k,c))){if(r.footprint.minzoom===t.C_INFINITY&&!n)return;y.minzoom>r.footprint.minzoom&&(r.footprint.minzoom=y.minzoom)}if(!n&&!q||!q&&r&&r.footprint.minzoom!==t.C_INFINITY||!n&&p&&p.footprint.minzoom!==t.C_INFINITY)b=Math.max(p.footprint.minzoom,r.footprint.minzoom),p.footprint.minzoom=b,r.footprint.minzoom=b;r&&r.footprint.minzoom!==t.C_INFINITY&&(k.ignorePlacement||this._placementEngine.add(r),
this._storePlacedGlyphs(r.shapes,r.footprint.minzoom,this.zoom,a.ddTextValues));p&&p.footprint.minzoom!==t.C_INFINITY&&(m.ignorePlacement||this._placementEngine.add(p),this._addPlacedIcons(p.shapes,p.footprint.minzoom,this.zoom,d.page,a.ddIconValues))};g.prototype._addPlacedIcons=function(a,b,e,c,h){b=Math.max(e+t.log2(b),0);for(var d=this._iconVertexBuffer,f=this._iconIndexBuffer,y=0;y<a.length;y++){var m=a[y],g=Math.max(e+t.log2(m.minzoom),b),q=Math.min(e+t.log2(m.maxzoom),25);if(!(q<=g)){var v=
m.tl,k=m.tr,u=m.bl,l=m.br,n=m.mosaicRect,x=m.labelAngle,m=m.anchor,p=d.index,r=n.x,w=n.y,z=r+n.width,n=w+n.height;d.add(m.x,m.y,v.x,v.y,r,w,x,g,q,b,h);d.add(m.x,m.y,k.x,k.y,z,w,x,g,q,b,h);d.add(m.x,m.y,u.x,u.y,r,n,x,g,q,b,h);d.add(m.x,m.y,l.x,l.y,z,n,x,g,q,b,h);f.add(p+0,p+1,p+2);f.add(p+1,p+2,p+3);this._markerMap.has(c)?this._markerMap.get(c)[1]+=6:this._markerMap.set(c,[this._iconIndexStart+this._iconIndexCount,6]);this._iconIndexCount+=2}}};g.prototype._addPlacedGlyphs=function(){var a=this,b=
this._textVertexBuffer,e=this._textIndexBuffer;this._glyphBufferDataStorage.forEach(function(c,h){for(var d=0;d<c.length;d++){var f=c[d],y=b.index;b.add(f.glyphAnchor[0],f.glyphAnchor[1],f.tl[0],f.tl[1],f.xmin,f.ymin,f.labelAngle,f.minLod,f.maxLod,f.placementLod,f.ddValues);b.add(f.glyphAnchor[0],f.glyphAnchor[1],f.tr[0],f.tr[1],f.xmax,f.ymin,f.labelAngle,f.minLod,f.maxLod,f.placementLod,f.ddValues);b.add(f.glyphAnchor[0],f.glyphAnchor[1],f.bl[0],f.bl[1],f.xmin,f.ymax,f.labelAngle,f.minLod,f.maxLod,
f.placementLod,f.ddValues);b.add(f.glyphAnchor[0],f.glyphAnchor[1],f.br[0],f.br[1],f.xmax,f.ymax,f.labelAngle,f.minLod,f.maxLod,f.placementLod,f.ddValues);e.add(y+0,y+1,y+2);e.add(y+1,y+2,y+3);a._glyphMap.has(h)?a._glyphMap.get(h)[1]+=6:a._glyphMap.set(h,[a._textIndexStart+a._textIndexCount,6]);a._textIndexCount+=2}});this._glyphBufferDataStorage.clear()};g.prototype._storePlacedGlyphs=function(a,b,e,c){b=Math.max(e+t.log2(b),0);for(var h=0;h<a.length;h++){var d=a[h],f=Math.max(e+t.log2(d.minzoom),
b),y=Math.min(e+t.log2(d.maxzoom),25);if(!(y<=f)){var m=d.tl,g=d.tr,q=d.bl,v=d.br,k=d.labelAngle,u=d.anchor,l=d.mosaicRect;this._glyphBufferDataStorage.has(d.page)||this._glyphBufferDataStorage.set(d.page,[]);this._glyphBufferDataStorage.get(d.page).push({glyphAnchor:[u.x,u.y],tl:[m.x,m.y],tr:[g.x,g.y],bl:[q.x,q.y],br:[v.x,v.y],xmin:l.x,ymin:l.y,xmax:l.x+l.width,ymax:l.y+l.height,labelAngle:k,minLod:f,maxLod:y,placementLod:b,ddValues:c})}}};g._findAnchors=function(a,b,e){b+=e;for(var c=0,h=a.length-
1,d=0;d<h;d++)c+=A.Point.distance(a[d],a[d+1]);d=.5*(e||b);if(c<=d)return[];e=d/c;b=c/Math.max(Math.round(c/b),1);for(var c=0,h=-b/2,f=[],g=a.length-1,d=0;d<g;d++){for(var m=a[d],D=a[d+1],q=D.x-m.x,v=D.y-m.y,k=Math.sqrt(q*q+v*v),u=void 0;h+b<c+k;){var h=h+b,l=(h-c)/k,n=t.interpolate(m.x,D.x,l),l=t.interpolate(m.y,D.y,l);void 0===u&&(u=Math.atan2(v,q));f.push(new F.Anchor(n,l,u,d,e))}c+=k}return f};g.deviation=function(a,b,e){return Math.atan2((b.x-a.x)*(e.y-b.y)-(b.y-a.y)*(e.x-b.x),(b.x-a.x)*(e.x-
b.x)+(b.y-a.y)*(e.y-b.y))};g._honorsTextMaxAngle=function(a,b,e,c,h){var d=0;e/=2;for(var f=new A.Point(b.x,b.y),g=b.segment+1;d>-e;){--g;if(0>g)return!1;d-=A.Point.distance(a[g],f);f=a[g]}d+=A.Point.distance(a[g],a[g+1]);b=[];for(var f=0,m=a.length;d<e;){var t=a[g],q=void 0;do{++g;if(g===m)return!1;q=a[g]}while(q.isEqual(t));var v=g,k=void 0;do{++v;if(v===m)return!1;k=a[v]}while(k.isEqual(q));t=this.deviation(t,q,k);b.push({deviation:t,distToAnchor:d});for(f+=t;d-b[0].distToAnchor>h;)f-=b.shift().deviation;
if(Math.abs(f)>c)return!1;d+=A.Point.distance(q,k)}return!0};g._smoothVertices=function(a,b){if(!(0>=b)){var e=a.length;if(!(3>e)){var c=[],h=0;c.push(0);for(var d=1;d<e;d++)h+=A.Point.distance(a[d],a[d-1]),c.push(h);b=Math.min(b,.2*h);h=[];h.push(a[0].x);h.push(a[0].y);var f=a[e-1].x,g=a[e-1].y,d=A.Point.sub(a[0],a[1]);d.normalize();a[0].x+=b*d.x;a[0].y+=b*d.y;d.assignSub(a[e-1],a[e-2]);d.normalize();a[e-1].x+=b*d.x;a[e-1].y+=b*d.y;for(d=1;d<e;d++)c[d]+=b;c[e-1]+=b;for(var m=.5*b,d=1;d<e-1;d++){for(var t=
0,q=0,v=0,k=d-1;0<=k&&!(c[k+1]<c[d]-m);k--){var u=m+c[k+1]-c[d],l=c[k+1]-c[k],n=c[d]-c[k]<m?1:u/l;if(1E-6>Math.abs(n))break;var x=n*n,p=n*u-.5*x*l,r=n*l/b,w=a[k+1],z=a[k].x-w.x,B=a[k].y-w.y,t=t+r/p*(w.x*n*u+.5*x*(u*z-l*w.x)-x*n*l*z/3),q=q+r/p*(w.y*n*u+.5*x*(u*B-l*w.y)-x*n*l*B/3),v=v+r}for(k=d+1;k<e&&!(c[k-1]>c[d]+m);k++){u=m-c[k-1]+c[d];l=c[k]-c[k-1];n=c[k]-c[d]<m?1:u/l;if(1E-6>Math.abs(n))break;x=n*n;p=n*u-.5*x*l;r=n*l/b;w=a[k-1];z=a[k].x-w.x;B=a[k].y-w.y;t+=r/p*(w.x*n*u+.5*x*(u*z-l*w.x)-x*n*l*z/
3);q+=r/p*(w.y*n*u+.5*x*(u*B-l*w.y)-x*n*l*B/3);v+=r}h.push(t/v);h.push(q/v)}h.push(f);h.push(g);for(k=d=0;d<e;d++)a[d].x=h[k++],a[d].y=h[k++]}}};g._bidiEngine=new J;return g}(L)});