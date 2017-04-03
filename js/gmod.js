(function () {
	"use strict"
	/*
	ExtendJS 0.2.3
	More info at http://extendjs.org

	Copyright (c) 2013+ ChrisBenjaminsen.com

	Distributed under the terms of the MIT license.
	http://extendjs.org/licence.txt

	This notice shall be included in all copies or substantial portions of the Software.
	 */
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
	}
	(window);
	// TODO nachvollziehen bis ins kleinste Detail

	var Addon = Class.extend(function () {
			var name;
			var description;
			var id;
			var img;

			this.constructor = function (obj) {
				if (obj) {
					name = (obj["name"]);
					description = (obj["description"]);
					id = (obj["workshopId"]);
					img = (obj["img"]);
				}
			};
			this.getName = function () {
				return name;
			};
			this.setName = function (sName) {
				if (sName)
					name = sName;
			};
			this.getWorkshopId = function () {
				return id;
			};
			this.setWorkshopId = function (sId) {
				if (sId && sId >= 0) {
					id = sId;
				}
			};
			this.getWorkshopLink = function () {
				return "http://steamcommunity.com/sharedfiles/filedetails/?id=" + id;
			};
			this.getDescription = function () {
				return description;
			};
			this.setDescription = function (sDescr) {
				if (sDescr) {
					description = sDescr;
				}
			};
			this.getImage = function () {
				return img;
			};
			this.setImage = function (sImg) {
				if (sImg) {
					img = sImg;
				}
			};
			this.render = function (div) {
				/* Render bookmark */
				var bm = document.createElement("a");
				bm.id = this.getWorkshopId();
				div.appendChild(bm);

				/* Render img */
				var dImg = document.createElement("img");
				dImg.className = "image";
				dImg.src = this.getImage();
				div.appendChild(dImg);

				/* Render name div */
				var dName = document.createElement("div");
				dName.className = "name";
				dName.innerHTML = this.getName();
				div.appendChild(dName);

				/* Render workshop link */
				var dId = document.createElement("a");
				dId.className = "workshop";
				dId.innerHTML = "Workshop";
				dId.href = this.getWorkshopLink();
				div.appendChild(dId);

				/* Render description */
				var dDescr = document.createElement("div");
				dDescr.className = "description";
				dDescr.innerHTML = this.getDescription();
				div.appendChild(dDescr);
			}
		})

		var Item = Addon.extend(function () {
			var hints;
			var pros;
			var cons;

			this.constructor = function (obj) {
				this.super(obj);
				hints = obj["hints"];
				pros = obj["pros"];
				cons = obj["cons"];
			};
			this.getHints = function () {
				return hints;
			};
			this.getPros = function () {
				return pros;
			};
			this.getCons = function () {
				return cons;
			};
			this.render = function (div) {
				this.super.render(div);

				var dRow = document.createElement("div");
				dRow.className = "compare";

				/* Render pros */
				if (this.getPros().length > 0) {
					var dPros = document.createElement("div");
					dPros.className = "pros";
					var dText = document.createElement("h2");
					dText.innerHTML = "Pros";
					dPros.appendChild(dText);
					var dProsList = document.createElement("ul");
					dPros.appendChild(dProsList);
					for (var i = 0; i < this.getPros().length; i++) {
						var li = document.createElement("li");
						li.innerHTML = this.getPros()[i];
						dProsList.appendChild(li);
					}
					dPros.appendChild(dProsList);
					dRow.appendChild(dPros);
				}

				/* Render cons */
				if (this.getCons().length > 0) {
					var dCons = document.createElement("div");
					dCons.className = "cons";
					var dText = document.createElement("h2");
					dText.innerHTML = "Cons";
					dCons.appendChild(dText);
					var dConsList = document.createElement("ul");
					dCons.appendChild(dConsList);
					for (var i = 0; i < this.getCons().length; i++) {
						var li = document.createElement("li");
						li.innerHTML = this.getCons()[i];
						dConsList.appendChild(li);
					}
					dCons.appendChild(dConsList);
					dRow.appendChild(dCons);
					div.appendChild(dRow);
				}

				/* Render hints */
				if (this.getHints().length > 0) {
					var dHints = document.createElement("div");
					dHints.className = "hints";
					var dText = document.createElement("h2");
					dText.innerHTML = "Hints";
					dHints.appendChild(dText);
					var dHintsList = document.createElement("ul");
					dHints.appendChild(dHintsList);
					for (var i = 0; i < this.getHints().length; i++) {
						var li = document.createElement("li");
						li.innerHTML = this.getHints()[i];
						dHintsList.appendChild(li);
					}
					dHints.appendChild(dHintsList);
					div.appendChild(dHints);
				}
			}
		});

	var Map = Addon.extend(function (obj) {
			var features;
			this.constructor = function (obj) {
				this.super(obj);
				features = obj["features"];
			};
			this.getFeatures = function () {
				return features;
			};
			this.render = function (div) {
				this.super.render(div);
				/* Render hints */
				if (this.getFeatures().length > 0) {
					var dFeatures = document.createElement("div");
					dFeatures.className = "features";
					var dText = document.createElement("h2");
					dText.innerHTML = "Features";
					dFeatures.appendChild(dText);
					var dFeaturesList = document.createElement("ul");
					dFeatures.appendChild(dFeaturesList);
					for (var i = 0; i < this.getFeatures().length; i++) {
						var li = document.createElement("li");
						li.innerHTML = this.getFeatures()[i];
						dFeaturesList.appendChild(li);
					}
					dFeatures.appendChild(dFeaturesList);
					div.appendChild(dFeatures);
				}
			};
		});
	window.gmod = {};
	window.gmod.Addon = Addon;
	window.gmod.Item = Item;
	window.gmod.Map = Map;
})();
