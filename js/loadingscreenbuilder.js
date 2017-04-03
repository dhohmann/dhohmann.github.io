(function(){
	"use strict"
	
	if(!window.gmod){
		console.error("NO GMOD OBJECT");
		return;
	}
	
	var tag = document.getElementById("loadingscreenbuilder");
	var path = tag && (tag.getAttribute("data-path"));
	var addons = [];
	
	function prepareForDomInsert(list){
		for(var i=0; i<list.length; i++){
			var item = list[i];
			var obj = {};
			obj.name = item.getAttribute("name");
			obj.workshopId = item.getAttribute("workshopId");
			obj.img = path + (item.getAttribute("img") || "missing.png");
			obj.type = item.getAttribute("type") || "addon";
			obj.description = item.getElementsByTagName("description")[0].textContent;
			obj.features = [];
			var features = item.getElementsByTagName("feature");
			for(var j=0; j<features.length; j++){
				obj.features.push(features[j].textContent);
			}
			obj.hints = [];
			var hints = item.getElementsByTagName("hint");
			for(var j=0; j<hints.length; j++){
				obj.hints.push(hints[j].textContent);
			}
			obj.pros = [];
			var pros = item.getElementsByTagName("pro");
			for(var j=0; j<pros.length; j++){
				obj.pros.push(pros[j].textContent);
			}
			obj.cons = [];
			var cons = item.getElementsByTagName("con");
			for(var j=0; j<cons.length; j++){
				obj.cons.push(cons[j].textContent);
			}
			
			var dom = document.createElement("div");
			var addon;
			switch(obj.type){
				case "item":
					addon = new gmod.Item(obj);
					dom.className = "gmod-item gmod-addon";
					break;
				case "map":
					addon = new gmod.Map(obj);
					dom.className = "gmod-map gmod-addon";
					break;
				default: 
					addon = new gmod.Addon(obj);
					dom.className = "gmod-addon";
					break;
			}
			// Render Addon Div
			addon.render(dom);
			addons.push(dom);
		}
	}
	
	function build(xml){
		var xmlDoc = xml.responseXML;
		
		var items = xmlDoc.getElementsByTagName("Item");
		prepareForDomInsert(items);
		
		var maps = xmlDoc.getElementsByTagName("Map");
		prepareForDomInsert(maps);
		
		var remaining = xmlDoc.getElementsByTagName("Addon");
		prepareForDomInsert(remaining);
		
		var seconds = 10;
		
		function display(){
			// Display a random item description
			function getRandomInt(min, max) {
				min = Math.ceil(min);
				max = Math.floor(max);
				return Math.floor(Math.random() * (max - min)) + min;
			}
			var destination = document.getElementById("content");
			if(destination){
				while (destination.hasChildNodes()) {
					destination.removeChild(destination.lastChild);
				}
				var rand = getRandomInt(0, addons.length);
				destination.appendChild(addons[rand]);
			}
			setTimeout(display, seconds * 1000);
		}
		display();
		
	}
	
	var relativePathToData = tag && (tag.getAttribute("data-relative-path-data"));
	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			build(this);
		}
	};
	xhttp.open("GET", path + relativePathToData, true);
	xhttp.send();
})();