var self = require("sdk/self");
var { ActionButton }  = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");


// BOTÓN                   //
//var button = ActionButton({
//  id: "mozilla-link",
//  label: "Visit Mozilla",
//  icon: {
//    "16": "./icons/icon16.png",
//    "32": "./icons/icon32.png",
//    "64": "./icons/icon64.png"
//  },
//  onClick: handleClick
//});

//function handleClick(state) {
//  tabs.open("http://maps.google.com/maps?q=");
//}



// MENÚ CONTEXTUAL        //
var contextMenu = require("sdk/context-menu");
var menuItem = contextMenu.Item({
  label: "Search in Google Maps",
  image: self.data.url("icons/icon16.png"),
  context: contextMenu.SelectionContext(),
  contentScript: 'self.on("context", function () {' +
                 '  var text = window.getSelection().toString();' +
                 '  if (text.length > 20)' +
                 '    text = text.substr(0, 20) + "...";' +
                 '  return "Search \'" + text + "\' in Google Maps";' +
                 '});' +
                 'self.on("click", function(node, data){'+
                 '   self.postMessage(window.getSelection().toString());'+
                 '});',
    onMessage: function(selectionText){
        var url = "http://maps.google.com/maps?q="+selectionText;
        url = url.replace(" ", "+");
        tabs.open(url);
    }
});
