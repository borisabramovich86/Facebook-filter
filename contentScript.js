

var status = "active";

var removeLikes = function(){
    console.log("removal function called!");
    var nodes = document.evaluate(".//*[contains(@class,'fcg') and (contains(., 'liked this') or contains(., 'commented on this'))]", document, null, XPathResult.ANY_TYPE, null);
    while(nodes){
        var node = nodes.iterateNext();
        var parentNode = document.evaluate("./ancestor::div[contains(concat(' ', @class, ' '), ' _5jmm ')]", node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        parentNode.style.display = "none";
    }
};

var changeIcon = function(){

    var image;
    if(status === "active"){
        image = "funnel-grey.png"
    }
    else {
        image = "funnel.png"
    }
    chrome.runtime.sendMessage({ "newIconPath" : image });
}

$( document ).ready(function() {
    console.log( "ready!" );

    var timedFunction = setInterval(removeLikes, 1000);
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if( request.message === "clicked_browser_action" ) {

                console.log("got message from extension!");
                console.log("before status: " + status);
                if(status !== "active"){
                    timedFunction = setInterval(removeLikes, 1000);
                    changeIcon();
                    status = "active";

                }
                else{
                    clearInterval(timedFunction);
                    changeIcon();
                    status = "deactivated";
                    console.log("stopped extension!");

                }

                console.log("after status: " + status);
            }
        }
    );
});

