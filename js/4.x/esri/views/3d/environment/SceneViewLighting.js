// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../core/Evented ../../../core/accessorSupport/decorators ../../../webscene/Lighting".split(" "),function(d,g,m,f,n,e,p){Object.defineProperty(g,"__esModule",{value:!0});d=function(d){function b(a){a=d.call(this)||this;a.positionTimezoneInfo={hours:0,minutes:0,seconds:0,autoUpdated:!0};a.cameraTrackingEnabled=!0;a.ambientOcclusionEnabled=!1;var c=(new Date).getFullYear(),c=new Date("March 15, "+
c+" 12:00:00 UTC");a._set("defaultDate",c);a._set("date",c);return a}m(b,d);Object.defineProperty(b.prototype,"defaultDate",{get:function(){return new Date(this._get("defaultDate").getTime())},set:function(a){var c=this._get("date")===this._get("defaultDate");a=new Date(a.getTime());this._set("defaultDate",a);c&&this._set("date",a)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"date",{set:function(a){null!=a&&(this._set("date",new Date(a.getTime())),this.positionTimezoneInfo.autoUpdated=
!1,this._emitDateWillChange())},enumerable:!0,configurable:!0});b.prototype.autoUpdate=function(a,c){var b=this._calculateTimezoneOffset(this.positionTimezoneInfo);this.positionTimezoneInfo.hours=c.hours;this.positionTimezoneInfo.minutes=c.minutes;this.positionTimezoneInfo.seconds=c.seconds;c=null;null!=a&&(this.positionTimezoneInfo.autoUpdated=!0,c=this.date&&this.date.getTime(),this._set("date",new Date(a.getTime())),this._emitDateWillChange());var d=this._calculateTimezoneOffset(this.positionTimezoneInfo);
b!==d&&(h.target=this,h.timezoneOffset=d,this.emit("timezone-will-change",h));if(null!=a)return c!==a.getTime()};b.prototype._calculateTimezoneOffset=function(a){return Math.round(a.hours+a.minutes/60+a.seconds/3600)};b.prototype._emitDateWillChange=function(){k.target=this;l.setTime(this._get("date").getTime());k.date=l;this.emit("date-will-change",k)};f([e.property({type:Boolean})],b.prototype,"cameraTrackingEnabled",void 0);f([e.property({type:Boolean})],b.prototype,"ambientOcclusionEnabled",void 0);
f([e.property({type:Date})],b.prototype,"defaultDate",null);f([e.property({type:Date})],b.prototype,"date",null);return b=f([e.subclass("esri.views.3d.environment.SceneViewLighting")],b)}(e.declared(p,n));g.SceneViewLighting=d;var l=new Date,k={target:null,date:null},h={target:null,timezoneOffset:0};g.default=d});