//MooTools More, <http://mootools.net/more>. Copyright (c) 2006-2009 Aaron Newton <http://clientcide.com/>, Valerio Proietti <http://mad4milk.net> & the MooTools team <http://mootools.net/developers>, MIT Style License.

Keyboard.prototype.options.nonParsedEvents.combine(["rebound","onrebound"]);Keyboard.implement({addShortcut:function(b,a){this.shortcuts=this.shortcuts||[];this.shortcutIndex=this.shortcutIndex||{};a.getKeyboard=$lambda(this);a.name=b;this.shortcutIndex[b]=a;this.shortcuts.push(a);if(a.keys){this.addEvent(a.keys,a.handler)}return this},addShortcuts:function(b){for(var a in b){this.addShortcut(a,b[a])}return this},getShortcuts:function(){return this.shortcuts||[]},getShortcut:function(a){return(this.shortcutIndex||{})[a]}});Keyboard.rebind=function(b,a){$splat(a).each(function(c){c.getKeyboard().removeEvent(c.keys,c.handler);c.getKeyboard().addEvent(b,c.handler);c.keys=b;c.getKeyboard().fireEvent("rebound")})};Keyboard.getActiveShortcuts=function(b){var a=[],c=[];Keyboard.each(b,[].push.bind(a));a.each(function(d){c.extend(d.getShortcuts())});return c};Keyboard.getShortcut=function(c,b,d){d=d||{};var a=d.many?[]:null,e=d.many?function(g){var f=g.getShortcut(c);if(f){a.push(f)}}:function(f){if(!a){a=f.getShortcut(c)}};Keyboard.each(b,e);return a};Keyboard.getShortcuts=function(b,a){return Keyboard.getShortcut(b,a,{many:true})};