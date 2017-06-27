//Toggle the history to show or not show on button click
$(document).ready(function(){
    $("#toggle").click(function(){
        $(".history").fadeToggle();
        $(".activeSometimes").toggleClass("active");
        $(".activeSometimes").toggleClass("btn-info");
    });
});

//Toggle the disabled attribute of the select input of each row of the table
$(document).ready(function(){
    $(".edit").click(function(){
      console.log($(".editable").attr("disabled"));
      if ($(".editable").attr("disabled")) {
        $(".editable").removeAttr("disabled");
        $(".save").fadeToggle();
    } else {
      console.log("got here");
        $(".editable").attr("disabled", "disabled");
        $(".save").fadeToggle();
    }
    });
});

//Toggle the save button when clicked
$(document).ready(function(){
    $(".save").click(function(){
        $(".save").fadeToggle();
        $(".editable").attr("disabled", "disabled");
    });
});
