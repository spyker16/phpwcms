//MooTools More, <http://mootools.net/more>. Copyright (c) 2006-2009 Aaron Newton <http://clientcide.com/>, Valerio Proietti <http://mad4milk.net> & the MooTools team <http://mootools.net/developers>, MIT Style License.

(function(){var a=this.Keyboard=new Class({Extends:Events,Implements:[Options,Log],options:{defaultEventType:"keydown",active:false,events:{},nonParsedEvents:["activate","deactivate","onactivate","ondeactivate","changed","onchanged"]},initialize:function(f){this.setOptions(f);this.setup()},setup:function(){this.addEvents(this.options.events);if(a.manager&&!this.manager){a.manager.manage(this)}if(this.options.active){this.activate()}},handle:function(h,g){if(h.preventKeyboardPropagation){return}var f=!!this.manager;if(f&&this.activeKB){this.activeKB.handle(h,g);if(h.preventKeyboardPropagation){return}}this.fireEvent(g,h);if(!f&&this.activeKB){this.activeKB.handle(h,g)}},addEvent:function(h,g,f){return this.parent(a.parse(h,this.options.defaultEventType,this.options.nonParsedEvents),g,f)},removeEvent:function(g,f){return this.parent(a.parse(g,this.options.defaultEventType,this.options.nonParsedEvents),f)},toggleActive:function(){return this[this.active?"deactivate":"activate"]()},activate:function(f){if(f){if(f!=this.activeKB){this.previous=this.activeKB}this.activeKB=f.fireEvent("activate");a.manager.fireEvent("changed")}else{if(this.manager){this.manager.activate(this)}}return this},deactivate:function(f){if(f){if(f===this.activeKB){this.activeKB=null;f.fireEvent("deactivate");a.manager.fireEvent("changed")}}else{if(this.manager){this.manager.deactivate(this)}}return this},relenquish:function(){if(this.previous){this.activate(this.previous)}},manage:function(f){if(f.manager){f.manager.drop(f)}this.instances.push(f);f.manager=this;if(!this.activeKB){this.activate(f)}else{this._disable(f)}},_disable:function(f){if(this.activeKB==f){this.activeKB=null}},drop:function(f){this._disable(f);this.instances.erase(f)},instances:[],trace:function(){a.trace(this)},each:function(f){a.each(this,f)}});var b={};var c=["shift","control","alt","meta"];var e=/^(?:shift|control|ctrl|alt|meta)$/;a.parse=function(h,g,k){if(k&&k.contains(h.toLowerCase())){return h}h=h.toLowerCase().replace(/^(keyup|keydown):/,function(m,l){g=l;return""});if(!b[h]){var f,j={};h.split("+").each(function(l){if(e.test(l)){j[l]=true}else{f=l}});j.control=j.control||j.ctrl;var i=[];c.each(function(l){if(j[l]){i.push(l)}});if(f){i.push(f)}b[h]=i.join("+")}return g+":"+b[h]};a.each=function(f,g){var h=f||a.manager;while(h){g.run(h);h=h.activeKB}};a.stop=function(f){f.preventKeyboardPropagation=true};a.manager=new a({active:true});a.trace=function(f){f=f||a.manager;f.enableLog();f.log("the following items have focus: ");a.each(f,function(g){f.log(document.id(g.widget)||g.wiget||g)})};var d=function(g){var f=[];c.each(function(h){if(g[h]){f.push(h)}});if(!e.test(g.key)){f.push(g.key)}a.manager.handle(g,g.type+":"+f.join("+"))};document.addEvents({keyup:d,keydown:d});Event.Keys.extend({shift:16,control:17,alt:18,capslock:20,pageup:33,pagedown:34,end:35,home:36,numlock:144,scrolllock:145,";":186,"=":187,",":188,"-":Browser.Engine.Gecko?109:189,".":190,"/":191,"`":192,"[":219,"\\":220,"]":221,"'":222})})();