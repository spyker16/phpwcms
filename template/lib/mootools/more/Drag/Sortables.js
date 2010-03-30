//MooTools More, <http://mootools.net/more>. Copyright (c) 2006-2009 Aaron Newton <http://clientcide.com/>, Valerio Proietti <http://mad4milk.net> & the MooTools team <http://mootools.net/developers>, MIT Style License.

var Sortables=new Class({Implements:[Events,Options],options:{snap:4,opacity:1,clone:false,revert:false,handle:false,constrain:false},initialize:function(a,b){this.setOptions(b);this.elements=[];this.lists=[];this.idle=true;this.addLists($$(document.id(a)||a));if(!this.options.clone){this.options.revert=false}if(this.options.revert){this.effect=new Fx.Morph(null,$merge({duration:250,link:"cancel"},this.options.revert))}},attach:function(){this.addLists(this.lists);return this},detach:function(){this.lists=this.removeLists(this.lists);return this},addItems:function(){Array.flatten(arguments).each(function(a){this.elements.push(a);var b=a.retrieve("sortables:start",this.start.bindWithEvent(this,a));(this.options.handle?a.getElement(this.options.handle)||a:a).addEvent("mousedown",b)},this);return this},addLists:function(){Array.flatten(arguments).each(function(a){this.lists.push(a);this.addItems(a.getChildren())},this);return this},removeItems:function(){return $$(Array.flatten(arguments).map(function(a){this.elements.erase(a);var b=a.retrieve("sortables:start");(this.options.handle?a.getElement(this.options.handle)||a:a).removeEvent("mousedown",b);return a},this))},removeLists:function(){return $$(Array.flatten(arguments).map(function(a){this.lists.erase(a);this.removeItems(a.getChildren());return a},this))},getClone:function(b,a){if(!this.options.clone){return new Element("div").inject(document.body)}if($type(this.options.clone)=="function"){return this.options.clone.call(this,b,a,this.list)}var c=a.clone(true).setStyles({margin:"0px",position:"absolute",visibility:"hidden",width:a.getStyle("width")});if(c.get("html").test("radio")){c.getElements("input[type=radio]").each(function(d,e){d.set("name","clone_"+e)})}return c.inject(this.list).setPosition(a.getPosition(a.getOffsetParent()))},getDroppables:function(){var a=this.list.getChildren();if(!this.options.constrain){a=this.lists.concat(a).erase(this.list)}return a.erase(this.clone).erase(this.element)},insert:function(c,b){var a="inside";if(this.lists.contains(b)){this.list=b;this.drag.droppables=this.getDroppables()}else{a=this.element.getAllPrevious().contains(b)?"before":"after"}this.element.inject(b,a);this.fireEvent("sort",[this.element,this.clone])},start:function(b,a){if(!this.idle){return}this.idle=false;this.element=a;this.opacity=a.get("opacity");this.list=a.getParent();this.clone=this.getClone(b,a);this.drag=new Drag.Move(this.clone,{snap:this.options.snap,container:this.options.constrain&&this.element.getParent(),droppables:this.getDroppables(),onSnap:function(){b.stop();this.clone.setStyle("visibility","visible");this.element.set("opacity",this.options.opacity||0);this.fireEvent("start",[this.element,this.clone])}.bind(this),onEnter:this.insert.bind(this),onCancel:this.reset.bind(this),onComplete:this.end.bind(this)});this.clone.inject(this.element,"before");this.drag.start(b)},end:function(){this.drag.detach();this.element.set("opacity",this.opacity);if(this.effect){var a=this.element.getStyles("width","height");var b=this.clone.computePosition(this.element.getPosition(this.clone.offsetParent));this.effect.element=this.clone;this.effect.start({top:b.top,left:b.left,width:a.width,height:a.height,opacity:0.25}).chain(this.reset.bind(this))}else{this.reset()}},reset:function(){this.idle=true;this.clone.destroy();this.fireEvent("complete",this.element)},serialize:function(){var c=Array.link(arguments,{modifier:Function.type,index:$defined});var b=this.lists.map(function(d){return d.getChildren().map(c.modifier||function(e){return e.get("id")},this)},this);var a=c.index;if(this.lists.length==1){a=0}return $chk(a)&&a>=0&&a<this.lists.length?b[a]:b}});