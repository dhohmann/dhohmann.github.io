function Link(sName, sUrl) {
	this.name = sName;
	this.url = sUrl;
	return this;
}

function Popup(sTitle) {
	var nameinput,
	namelabel,
	linkinput,
	linklabel,
	closebtn,
	div,
	form,
	submitinput;

	var div = document.createElement("div");
	div.className = "ux-ui-Popup";
	div.style.display = "none";

	var topDiv = document.createElement("div");
	topDiv.className = "top";
	
	var title = document.createElement("div");
	title.className = "title";
	title.innerHTML = sTitle || "Popup";
	topDiv.appendChild(title);
	
	var that = this;
	console.log("creating close btn");
	var closebtn = document.createElement("button");
	closebtn.className = "close";
	closebtn.innerHTML = "&#10006";
	closebtn.onclick = function () {
		that.hide();
	};
	topDiv.appendChild(closebtn);

	var content = document.createElement("div");
	content.className = "content";
	content.appendChild(topDiv);

	form = document.createElement("form");
	form.className = "form";

	namelabel = document.createElement("label");
	namelabel.innerHTML = "Name"
	namelabel.for  = "name";
	nameinput = document.createElement("input");
	nameinput.id = "name";
	nameinput.type = "text";

	linklabel = document.createElement("label");
	linklabel.innerHTML = "URL"
	linklabel.for  = "url";
	linkinput = document.createElement("input");
	linkinput.id = "url";
	linkinput.type = "url";

	submitinput = document.createElement("button");
	submitinput.type = "submit";
	submitinput.className = "buttom";
	submitinput.innerHTML = "Accept";
	submitinput.onclick = this.hide;

	form.appendChild(namelabel);
	form.appendChild(nameinput);
	form.appendChild(linklabel);
	form.appendChild(linkinput);

	content.appendChild(form);
	content.appendChild(submitinput);
	div.appendChild(content);

	document.getElementsByTagName("body")[0].appendChild(div);

	this.show = function () {
		console.log("showing popup...", div)
		div.style.display = "block";
	};
	this.getName = function () {
		return nameinput.value || "";
	};
	this.setTitle = function (sTitle) {
		if (sTitle){
			title.innerHTML = sTitle;
		}
	};
	this.setSubmit = function (callback) {
		if (callback && typeof callback === "function"){
			submitinput.onclick = callback;
		}
	};
	this.getUrl = function () {
		return linkinput.value || "";
	};
	this.hide = function () {
		div.style.display = "none";
		// clear input
		linkinput.value = "";
		nameinput.value = "";
	};
	return this;
}

console.log("starting loading script...");

var overlayInformation,
links = [],
popup;

function defaultLinks(array) {
	if(!array) array = [];
	array.push(new Link("Google", "https://www.google.de"))
	array.push(new Link("Youtube", "https://www.youtube.com"))
	array.push(new Link("Facebook", "https://www.facebook.com"))
	array.push(new Link("Steam Community", "https://www.steamcommunity.com"))
	array.push(new Link("9GAG", "https://9gag.com"))
	return array;
}

function onAdd() {
	function submitFunction() {
		var name = popup.getName();
		var url = popup.getUrl();

		if (url != "") {
			if (name == "") {
				name = url;
			}
			var l = new Link(name, url);
			console.log("new link", l)
			links.push(l);
			setLinks(links);
		}
		popup.hide();
	}
	if (!popup) {
		popup = new Popup();
	}
	popup.setTitle("Add a link");
	popup.setSubmit(submitFunction);
	popup.show();
}

function onRemove() {
	function submitFunction(){
		var name = popup.getName();
		var url = popup.getUrl();
		
		if(name === ""){
			name = undefined;
		}
		if(url === ""){
			url = undefined;
		}
		var l = new Link(name, url);
		for(var i = 0; i<links.length; i++){
			if(name && !url && links[i].name === name){
				console.log("removing link", l)
				links.splice(i, 1);
				i--;
			}
			if(url && !name && links[i].url === url){
				console.log("removing link", l)
				links.splice(i, 1);
				i--;
			}
			if(url && name && links[i].url === url && links[i].name === name){
				console.log("removing link", l)
				links.splice(i, 1);
				i--;
			}
		}
		setLinks(links);
		popup.hide();
	}
	if (!popup) {
		popup = new Popup();
	}
	popup.setTitle("Remove a link by name AND/OR url");
	popup.setSubmit(submitFunction);
	popup.show();
}

function onReset(){
	setLinks(defaultLinks());
}

function setLinks(array) {
	if (array && array instanceof Array) {
		links = array;
		console.log("changing links")
		// redraw
		var linkelements = document.getElementById("linkcontainer").firstElementChild;
		while (linkelements.firstElementChild) {
			linkelements.removeChild(linkelements.firstElementChild);
		}
		console.log(links);
		for (var i in links) {
			var div = document.createElement("div");
			div.className= "ux-ui-Tile";
			var a = document.createElement("a");
			a.href = links[i].url;
			a.innerHTML = links[i].name;
			div.appendChild(a);
			linkelements.appendChild(div);
		}
		overlayInformation.links = links;
		localStorage["overlayInformation"] = JSON.stringify(overlayInformation);
	}
}

function init() {
	if (localStorage) {
		if(localStorage["overlayInformation"]){
			overlayInformation = JSON.parse(localStorage["overlayInformation"]);
		} else {
			overlayInformation = {};
		}
	}

	if (overlayInformation.links) {
		setLinks(overlayInformation.links)
	} else {
		setLinks(defaultLinks(links));
	}
}

window.onload = init;
