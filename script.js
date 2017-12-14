var collection = [];
var refined = [];
var type = [];
var alignment = [];
var size = [];
var ready = false;
$("document").ready(function() {
    getAjaxNow();
    $("#clicker").click(function() {
        if(collection.length === 325) {
            getAttributes();
            ready = true;
            $(this).remove();
        } else {
            console.log("Not Ready");
            console.log(collection.length + " out of 325 loaded");
        }
    });
    $("#search").click(function() {
        console.log("refine");
    });
});
function getAjaxNow() {
    $.ajax({
        url: "http://www.dnd5eapi.co/api/monsters/",
        type: 'GET',
        success: function (result) {
            for(var i = 0; i < result.results.length; i ++) {
                getAjaxParticular(result.results[i].url);
            }
        },
        error: function () {
            console.log("failed");
        }
    });
}//gets the original 325 index object with names and URLs and passes to getAjaxParticular through myFunction.
function getAjaxParticular(myURL) {
    $.ajax({
        url: myURL,
        type: 'GET',
        success: function (result) {
            collection.push(result);
        },
        error: function () {
            console.log("failed");
        }
    });
}//gets the giant object for each of the 325 monsters
function getAttributes() {
    getSize();
    getType();
    getAlignment();
    buildSelects();
    function getSize() {
        for(var c in collection) {
            if(size.indexOf(collection[c].size) === -1) {
                size.push(collection[c].size);
            }
        }
    }
    function getAlignment() {
        for(var c in collection) {
            if(alignment.indexOf(collection[c].alignment) === -1) {
                alignment.push(collection[c].alignment);
            }
        }
    }
    function getType() {
        for(var c in collection) {
            if(type.indexOf(collection[c].type) === -1) {
                type.push(collection[c].type);
            }
        }
    }
    function buildSelects() {
        $("[title~=type]").html("<option value=''>Refine for type</option>");
        $("[title~=alignment]").html("<option value=''>Refine for alignment</option>");
        $("[title~=size]").html("<option value=''>Refine for size</option>");
        for(var d in size) {
            $("[title=size]").append("<option value='" + size[d] + "'>" + size[d] + "</option>");
        }
        for(var e in alignment) {
            $("[title=alignment]").append("<option value='" + alignment[e] + "'>" + alignment[e] + "</option>");
        }
        for(var f in type) {
            $("[title=type]").append("<option value='" + type[f] + "'>" + type[f] + "</option>");
        }
    }
}