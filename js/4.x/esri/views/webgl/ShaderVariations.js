// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.7/esri/copyright.txt for details.
//>>built
define(["require","exports","./Program","./ShaderSourceVariator","./Util"],function(p,q,l,n,h){function m(c){return c.reduce(function(a,b,e){b&&(a|=1<<e);return a},0)}return function(){function c(a,b,e,k,c,d){"string"===typeof a?this._initParams(a,b,e,k,c,d):this._initObject({programNamePrefix:a.programNamePrefix,shaderSnippetPrefixes:a.shaderSnippetPrefixes,baseDefines:a.baseDefines,snippets:a.snippets,rctx:a.rctx,vertexAttribLocs:a.vertexAttribLocs})}c.prototype._initObject=function(a){this._initParams(a.programNamePrefix,
a.shaderSnippetPrefixes,a.baseDefines,a.snippets,a.rctx,a.vertexAttribLocs)};c.prototype._initParams=function(a,b,e,c,f,d){this._defaultSnippets=c;this._defaultRctx=f;this._defaultVertexAttribLocs=d;this._programCache=new Map;this._variationInfo=new Map;this._shaderSourceVariator=new n(a,b,e)};c.prototype.addDefine=function(a,b,e,c){this._shaderSourceVariator.addDefine(a,b,e,c)};c.prototype.addBinaryShaderSnippetSuffix=function(a,b,e){this._shaderSourceVariator.addBinaryShaderSnippetSuffix(a,b,e)};
c.prototype.addNaryShaderSnippetSuffix=function(a,b){this._shaderSourceVariator.addNaryShaderSnippetSuffix(a,b)};c.prototype.getProgram=function(a,b,e,c){b=b||this._defaultSnippets;e=e||this._defaultRctx;c=c||this._defaultVertexAttribLocs;if(!b)throw Error("No ShaderSnippets provided to getProgram nor to ShaderVariations constructor.");if(!e)throw Error("No RenderingContext provided to getProgram nor to ShaderVariations constructor.");if(!c)throw Error("No VertexAttributeLocations provided to getProgram nor to ShaderVariations constructor.");
var f=m(a);if(this._programCache[f])return this._programCache[f];a=this._shaderSourceVariator.getShaderVariation(a);var d,g;d=a.shaderSnippetNames[0];g=b[d];h.assert(null!=g,"shader snippet '"+d+"' does not exist");d=a.shaderSnippetNames[1];b=b[d];h.assert(null!=b,"shader snippet '"+d+"' does not exist");e=new l(e,g,b,c,a.defines);return this._programCache[f]=e};c.prototype.getProgramByKey=function(a){if(this._programCache[a])return this._programCache[a];if(!this._variationInfo[a])return null;var b=
this._variationInfo[a],c=this._defaultSnippets,k=this._defaultRctx,f=this._defaultVertexAttribLocs,d,g;d=b.shaderSnippetNames[0];g=c[d];h.assert(null!=g,"shader snippet '"+d+"' does not exist");d=b.shaderSnippetNames[1];c=c[d];h.assert(null!=c,"shader snippet '"+d+"' does not exist");b=new l(k,g,c,f,b.defines);return this._programCache[a]=b};c.prototype.getProgramInfo=function(a){var b=this._shaderSourceVariator.getShaderVariation(a);a=m(a);this._variationInfo[a]||(this._variationInfo[a]=b);return{name:b.programName,
key:a}};return c}()});