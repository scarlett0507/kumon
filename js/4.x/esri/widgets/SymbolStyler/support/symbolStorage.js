// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define(["require","exports","dojo/_base/kernel","../../../kernel"],function(k,a,g,h){function e(){a.storage.session.removeItem(b(c.recent))}function b(a){return"symbol-storage/symbol/"+a}Object.defineProperty(a,"__esModule",{value:!0});var c={default:"default",recent:"recent",custom:"custom",types:"types",version:"version"};a.storage={session:sessionStorage,local:localStorage};a.loadRecentSymbolItem=function(){var d=a.storage.session.getItem(b(c.recent));return d&&JSON.parse(d)};a.loadCustomItems=
function(){return JSON.parse(a.storage.local.getItem(b(c.custom)))};a.saveRecentItem=function(d){a.storage.session.setItem(b(c.recent),JSON.stringify(d))};a.init=function(){var d=a.storage.local.getItem(b(c.version)),f=h.version+"|"+g.locale;d!==f&&(a.storage.local.setItem(b(c.version),f),e())};a.empty=e;a.keyify=b});