//MooTools More, <http://mootools.net/more>. Copyright (c) 2006-2009 Aaron Newton <http://clientcide.com/>, Valerio Proietti <http://mad4milk.net> & the MooTools team <http://mootools.net/developers>, MIT Style License.

Array.implement({min:function(){return Math.min.apply(null,this)},max:function(){return Math.max.apply(null,this)},average:function(){return this.length?this.sum()/this.length:0},sum:function(){var a=0,b=this.length;if(b){do{a+=this[--b]}while(b)}return a},unique:function(){return[].combine(this)},shuffle:function(){for(var b=this.length;b&&--b;){var a=this[b],c=Math.floor(Math.random()*(b+1));this[b]=this[c];this[c]=a}return this}});