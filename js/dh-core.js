(function(){
	window.dh = {}; dh.core = {};
	
	!function (a) {
		"use strict";
		function b(a) {
			a.parent instanceof Function && (b.apply(this, [a.parent]), this.super = c(this, d(this, this.constructor))),
			a.apply(this, arguments)
		}
		function c(a, b) {
			for (var c in a)
				"super" !== c && a[c]instanceof Function && !(a[c].prototype instanceof Class) && (b[c] = a[c].super || d(a, a[c]));
			return b
		}
		function d(a, b) {
			var c = a.super;
			return b.super = function () {
				return a.super = c,
				b.apply(a, arguments)
			}
		}
		a.Class = function () {},
		a.Class.extend = function e(a) {
			function d() {
				b !== arguments[0] && (b.apply(this, [a]), c(this, this), this.initializer instanceof Function && this.initializer.apply(this), this.constructor.apply(this, arguments))
			}
			return d.prototype = new this(b),
			d.prototype.constructor = d,
			d.toString = function () {
				return a.toString()
			},
			d.extend = function (b) {
				return b.parent = a,
				e.apply(d, arguments)
			},
			d
		},
		a.Class = a.Class.extend(function () {
				this.constructor = function () {}
		})
	}(window);
	/**
		Function
		Used for extending a class
		@param name - the full qualified name
		@param def  - function for generating the object
	*/
	function extend(name, def) {
		"use strict";
		
		// Register with namespace
		
		// Set constructor function of child class to parent constructor + child constructor
		function newConstructor(){
			
		}
		
		return d.prototype = new this(b);
	}
	
	
	console.log(dh);
	
})();