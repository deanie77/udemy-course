$("h1").addClass("big-title margin-50");

$("button").click(function () {
    $("h1").css("color", "purple");
})

var word = "";

$("input").keydown(function(e) {
    word += e.key;
    $("h1").html(word);
})