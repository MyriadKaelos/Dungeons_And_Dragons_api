var collection = [];
var ready = false;
var attrRefine = "";
$("document").ready(function() {
    getAjaxNow();
    $("#clicker").click(function() {
        loader();
    });
    $("#search").click(function() {

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
function loader() {
    if(collection.length >= 325) {
        console.log(collection);
        ready = true;
        $("#clicker").parent().append("<th><button id='search' onclick='searchFunction()'>Search</button><button id='refine' onclick='refineFunction()'>Refine by attribute</button><button onclick='resetRefine()'>reset</button></th>");
        $("#clicker").remove();//makes sure the load button is gone and is replaced with the search Icon
        collection.sort(compare);
        for(var o in collection) {
            $("#editableTable").append("<tr><td>" + collection[o].name + "<button id='" + o + "'>More</button></td></tr>");//makes the table of monsters and the more info buttons.
            $("#" + o).click(function() {
                var g = this.id;//makes a variable that doesn't change with the list
                $("#info").css("display","block");
                $("#info").html("");//reset the infoBox
                for(var c in collection[g]) {
                    var f = makeTheF(g,c);
                    $("#info").append("<tr><td>" + c + ": " + f + "</td></tr>");//makes a place for each attribute
                }
            });
        }
    } else {
        console.log(collection.length + " out of 325 loaded");
    }
}//loads the info box
function searchFunction() {
    var criteria = prompt("search for a keyword in a monster's database.\nAnything will do, type, size, name, even languages!");
    if(criteria === "" || criteria === null) {//checks if the user input anything.
        return true;
    }
    criteria = criteria.toLowerCase();//the user's search criteria
    console.log(criteria);
    console.log(attrRefine);
    $("#editableTable tbody tr").css("display","none");//all options unavailable
    for(var u in collection) {
        for(var y in collection[u]) {
            if(collection[u][y].toString().toLowerCase().indexOf(criteria) !== -1) {
                if(attrRefine === ""){
                    $("tr:nth-child(" + (collection[u].index + 1) + ")").css("display","table-row");//makes the options that apply the search criteria appear.
                    console.log(collection[u].name + " of index " + collection[u].index + " : " + y + " = " + collection[u][y] + ".");//console.logs the reason any object is appearing.
                } else if(y === attrRefine) {
                    $("tr:nth-child(" + (collection[u].index + 1) + ")").css("display","table-row");//makes the options that apply the search criteria and the refinery appear.
                    console.log(collection[u].name + " of index " + collection[u].index + " : " + y + " = " + collection[u][y] + ".");//console.logs the reason any object is appearing.
                } else if($("tr:nth-child(" + (collection[u].index + 1) + ")").css("display") !== "none") {
                } else {
                    $("tr:nth-child(" + (collection[u].index + 1) + ")").css("display","none");//makes the non-applicable due to refining invisible.
                }
            }
        }
    }

    $("tr:nth-child(1)").css("display","table-row");//makes the search appear.
    console.log(criteria);
}//allows the user to refine their search for a keyword within any monster's data
function refineFunction() {
    attrRefine = prompt("if you would like to refine your keyword search by an attribute,\n type the attribute here.\n\n" +
        "Note: make sure you type in the attribute's name exactly,\n" +
        "you can check the attribute list by looking at any info boxes of any monster","damage_immunities");
    console.log(attrRefine);
}
function resetRefine() {
    $("#editableTable tbody tr").css("display","table-row");//all options unavailable
}
function makeTheF(g,c) {
    if(collection[g][c] === "") {
        return "none";
    } else if(typeof(collection[g][c]) === "object") {
        var alerter = "";//begining of the string, what it is
        for(var y in collection[g][c]) {
            alerter += "<br>";
                alerter += "<br>" + collection[g][c][y].name + ": <br>" + collection[g][c][y].desc;
        }
        console.log(alerter);
        return "<div>" + alerter + "</div>";//make it so a button alerts the info.
    } else {
        return collection[g][c];
    }
}//makes the answer to each attribute inside the info box
function compare(a,b) {
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
}//sorts the collection