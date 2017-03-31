(function(){
	"use strict"
	
	if(!window.gmod){
		console.error("NO GMOD OBJECT");
		return;
	}
	
	var tag = document.getElementById("gmodbuilder");
	var path = tag && (tag.getAttribute("data-path"));
	var contentTableId = tag && (tag.getAttribute("data-content-table-id"));	
	var contentId = tag && (tag.getAttribute("data-content-id"));
	
	function insertToDom(addons){
		for(var i=0; i<addons.length; i++){
			var item = addons[i];
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
			
			// Append to content
			document.getElementById(contentId).appendChild(dom);
			
			// Append to content table
			var dLink = document.createElement("a");
			dLink.href = "#"+addon.getWorkshopId();
			dLink.innerHTML = addon.getName();
			var dLi = document.createElement("li");
			dLi.appendChild(dLink);
			document.getElementById(contentTableId).appendChild(dLi);
		}
	}
	
	function build(xml){
		console.log(xml)
		var xmlDoc = xml.responseXML;
		
		var items = xmlDoc.getElementsByTagName("Item");
		var dTitle = document.createElement("li");
		var dText = document.createElement("h2");
		dText.innerHTML = "Items";
		dTitle.appendChild(dText);
		dTitle.className="side-title";
		document.getElementById(contentTableId).appendChild(dTitle);
		var dTitle = document.createElement("div");
		dTitle.innerHTML = "Items";
		dTitle.className="content-title";
		document.getElementById(contentId).appendChild(dTitle);
		insertToDom(items);
		
		var maps = xmlDoc.getElementsByTagName("Map");
		var dTitle = document.createElement("li");
		var dText = document.createElement("h2");
		dText.innerHTML = "Maps";
		dTitle.appendChild(dText);
		dTitle.className="side-title";
		document.getElementById(contentTableId).appendChild(dTitle);
		var dTitle = document.createElement("div");
		dTitle.innerHTML = "Maps";
		dTitle.className="content-title";
		document.getElementById(contentId).appendChild(dTitle);
		insertToDom(maps);
		
		var addons = xmlDoc.getElementsByTagName("Addon");
		var dTitle = document.createElement("li");
		var dText = document.createElement("h2");
		dText.innerHTML = "Addons";
		dTitle.appendChild(dText);
		dTitle.className="side-title";
		document.getElementById(contentTableId).appendChild(dTitle);
		var dTitle = document.createElement("div");
		dTitle.innerHTML = "Addons";
		dTitle.className="content-title";
		document.getElementById(contentId).appendChild(dTitle);
		insertToDom(addons);
		
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