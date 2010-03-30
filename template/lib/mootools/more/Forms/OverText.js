//MooTools More, <http://mootools.net/more>. Copyright (c) 2006-2009 Aaron Newton <http://clientcide.com/>, Valerio Proietti <http://mad4milk.net> & the MooTools team <http://mootools.net/developers>, MIT Style License.

var OverText=new Class({Implements:[Options,Events,Class.Occlude],Binds:["reposition","assert","focus","hide"],options:{element:"label",positionOptions:{position:"upperLeft",edge:"upperLeft",offset:{x:4,y:2}},poll:false,pollInterval:250,wrap:false},property:"OverText",initialize:function(b,a){this.element=document.id(b);if(this.occlude()){return this.occluded}this.setOptions(a);this.attach(this.element);OverText.instances.push(this);if(this.options.poll){this.poll()}return this},toElement:function(){return this.element},attach:function(){var a=this.options.textOverride||this.element.get("alt")||this.element.get("title");if(!a){return}this.text=new Element(this.options.element,{"class":"overTxtLabel",styles:{lineHeight:"normal",position:"absolute",cursor:"text"},html:a,events:{click:this.hide.pass(this.options.element=="label",this)}}).inject(this.element,"after");if(this.options.element=="label"){if(!this.element.get("id")){this.element.set("id","input_"+new Date().getTime())}this.text.set("for",this.element.get("id"))}if(this.options.wrap){this.textHolder=new Element("div",{styles:{lineHeight:"normal",position:"relative"},"class":"overTxtWrapper"}).adopt(this.text).inject(this.element,"before")}this.element.addEvents({focus:this.focus,blur:this.assert,change:this.assert}).store("OverTextDiv",this.text);window.addEvent("resize",this.reposition.bind(this));this.assert(true);this.reposition()},wrap:function(){if(this.options.element=="label"){if(!this.element.get("id")){this.element.set("id","input_"+new Date().getTime())}this.text.set("for",this.element.get("id"))}},startPolling:function(){this.pollingPaused=false;return this.poll()},poll:function(a){if(this.poller&&!a){return this}var b=function(){if(!this.pollingPaused){this.assert(true)}}.bind(this);if(a){$clear(this.poller)}else{this.poller=b.periodical(this.options.pollInterval,this)}return this},stopPolling:function(){this.pollingPaused=true;return this.poll(true)},focus:function(){if(this.text&&(!this.text.isDisplayed()||this.element.get("disabled"))){return}this.hide()},hide:function(c,a){if(this.text&&(this.text.isDisplayed()&&(!this.element.get("disabled")||a))){this.text.hide();this.fireEvent("textHide",[this.text,this.element]);this.pollingPaused=true;if(!c){try{this.element.fireEvent("focus");this.element.focus()}catch(b){}}}return this},show:function(){if(this.text&&!this.text.isDisplayed()){this.text.show();this.reposition();this.fireEvent("textShow",[this.text,this.element]);this.pollingPaused=false}return this},assert:function(a){this[this.test()?"show":"hide"](a)},test:function(){var a=this.element.get("value");return !a},reposition:function(){this.assert(true);if(!this.element.isVisible()){return this.stopPolling().hide()}if(this.text&&this.test()){this.text.position($merge(this.options.positionOptions,{relativeTo:this.element}))}return this}});OverText.instances=[];$extend(OverText,{each:function(a){return OverText.instances.map(function(c,b){if(c.element&&c.text){return a.apply(OverText,[c,b])}return null})},update:function(){return OverText.each(function(a){return a.reposition()})},hideAll:function(){return OverText.each(function(a){return a.hide(true,true)})},showAll:function(){return OverText.each(function(a){return a.show()})}});if(window.Fx&&Fx.Reveal){Fx.Reveal.implement({hideInputs:Browser.Engine.trident?"select, input, textarea, object, embed, .overTxtLabel":false})};