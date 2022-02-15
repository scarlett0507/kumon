// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/extendsHelper ../core/tsSupport/decorateHelper ../core/Logger ../core/promiseUtils ../core/urlUtils ../core/accessorSupport/decorators ../portal/Portal ./Symbol ./support/Thumbnail".split(" "),function(h,t,k,c,l,m,e,b,n,p,q){var r=l.getLogger("esri.symbols.WebStyleSymbol");return function(g){function a(a){a=g.call(this,a)||this;a.styleName=null;a.portal=null;a.styleUrl=null;a.thumbnail=null;a.name=null;a.type="web-style";return a}k(a,g);f=a;a.prototype._readStyleUrl=
function(a,d,b){return e.read(a,b)};a.prototype._writeStyleUrl=function(a,d,b,c){d.styleUrl=e.write(a,c);e.isAbsolute(d.styleUrl)&&(d.styleUrl=e.normalize(d.styleUrl))};a.prototype._writeType=function(a,d,b,c){d.type="styleSymbolReference"};a.prototype.read=function(a,d){this.portal=d?d.portal:void 0;this.inherited(arguments,[a,d]);return this};a.prototype.clone=function(){return new f({name:this.name,styleUrl:this.styleUrl,styleName:this.styleName,portal:this.portal})};a.prototype.fetchSymbol=function(){var a=
this;return m.create(function(a){return h(["./support/styleUtils"],a)}).then(function(b){b=b.resolveWebStyleSymbol(a,{portal:a.portal});b.catch(function(a){r.error("#fetchSymbol()","Failed to create symbol from style",a)});return b})};c([b.property({json:{write:!1}})],a.prototype,"color",void 0);c([b.property({type:String,json:{write:!0}})],a.prototype,"styleName",void 0);c([b.property({type:n,json:{write:!1}})],a.prototype,"portal",void 0);c([b.property({type:String,json:{write:!0}})],a.prototype,
"styleUrl",void 0);c([b.reader("styleUrl")],a.prototype,"_readStyleUrl",null);c([b.writer("styleUrl")],a.prototype,"_writeStyleUrl",null);c([b.property({type:q.default,json:{read:!1}})],a.prototype,"thumbnail",void 0);c([b.property({type:String,json:{write:!0}})],a.prototype,"name",void 0);c([b.property({type:String,readOnly:!0,json:{read:!1}})],a.prototype,"type",void 0);c([b.writer("type")],a.prototype,"_writeType",null);return a=f=c([b.subclass("esri.symbols.WebStyleSymbol")],a);var f}(b.declared(p))});