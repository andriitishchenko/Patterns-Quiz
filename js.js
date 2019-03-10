class Question {
    constructor(label, description) {
        this.label = label;
        this.description = description;
        this.data = '_' + Math.random().toString(36).substr(2, 9);
    }

    getBox() {
        if (!this._box) {
            let text = document.createTextNode(this.description);
            this._box = document.createElement("div");
            this._box.className = "box";
            this._box.appendChild(text);
            this._box.setAttribute('data', this.data);
        }
        return this._box;
    }

    getDragable() {
        if (!this._d_box) {
            let text = document.createTextNode(this.label);
            this._d_box = document.createElement("div");
            this._d_box.className = "draggable";
            this._d_box.appendChild(text);
            this._d_box.setAttribute('draggable', true);
            this._d_box.setAttribute('ondragstart', "event.dataTransfer.setData('text/plain',null)");
            this._d_box.setAttribute('data', this.data);

        }
        return this._d_box;
    }
}

let ls = [];
document.addEventListener('DOMContentLoaded', function() {

    let variants = document.getElementById('variants');

    let quiz = document.getElementById('holder');

    for (var i = 0; i < db.length; i++) {
        var obj = db[i];
        var item = new Question(obj.name, obj.description);
        ls.push(item);

        variants.appendChild(item.getBox());
        quiz.appendChild(item.getDragable());
    }

    var list = document.querySelectorAll(".box");
    for (var i = 0; i < list.length; ++i) {
        var box = list[i];
    }

    let test = document.getElementById('test');
    test.addEventListener("click", e => {
        // var out=[];
        var list = document.querySelectorAll(".box:not([id^='holder'])");
        var stat = 0;
        for (var i = 0; i < list.length; ++i) {
            var el = list[i];
            let data = el.getAttribute("data");
            if ((el.childNodes[0].nodeType == 1) && (data == el.childNodes[0].getAttribute("data"))) {
                el.style.background = "green";
                stat++;
            } else {
                el.style.background = "red";
            }
        }
        let statstring = document.getElementById('stat');
        statstring.innerHTML = "" + String(Math.floor(stat / list.length * 100)) + "%";
    });

});

var dragged;

/* events fired on the draggable target */
document.addEventListener("drag", function(event) {

}, false);

document.addEventListener("dragstart", function(event) {
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    event.target.style.opacity = .5;
}, false);

document.addEventListener("dragend", function(event) {
    event.target.style.opacity = "";
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function(event) {
    event.preventDefault();
}, false);

document.addEventListener("dragenter", function(event) {
    if (event.target.className == "box") {
        event.target.style.background = "LightSkyBlue";
    }

}, false);

document.addEventListener("dragleave", function(event) {
    if (event.target.className == "box") {
        event.target.style.background = "";
    }

}, false);

document.addEventListener("drop", function(event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    if (event.target.className == "box") {
        var el = event.target;
        el.style.background = "";
        dragged.parentNode.removeChild(dragged);
        el.insertBefore(dragged, el.childNodes[0]);
    }
}, false);