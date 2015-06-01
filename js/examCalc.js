$(document).ready(function(){
  var navbarStick = function(){
    if (window.innerHeight-$('#footer').height()-$('.navbar-fixed-top').height() > $('.container-fluid').height()) {
      $("#footer").addClass("navbar-fixed-bottom");
    } else {
      $("#footer").removeClass("navbar-fixed-bottom");
    }
  }
  navbarStick();
  $(window).resize(function(){
    navbarStick();
  });
  $("form").keyup(function(){
    var inputs = $("input");
    var numFill = 0;
    for (var i=0; i<inputs.length; i++) {
      if (inputs[i].value && inputs[i].disabled == false) {
        numFill += 1;
      }
      if (inputs[i].disabled) {
        inputs[i].value = "";
      }
    }
    if (numFill == 4) {
      for (var i=0; i<inputs.length; i++) {
        if (!inputs[i].value) {
          inputs[i].disabled = true;
          switch (i) {
            case 0:
              inputs[0].value = (inputs[3].value - (inputs[4].value * inputs[2].value / 100) - (((100 - inputs[2].value) / 2) * inputs[1].value / 100)) / ((100 - inputs[2].value) / 2) * 100;
              break;
            case 1:
              inputs[1].value = (inputs[3].value - (inputs[4].value * inputs[2].value / 100) - (((100 - inputs[2].value) / 2) * inputs[0].value / 100)) / ((100 - inputs[2].value) / 2) * 100;
              break;
            case 2:
              inputs[2].disabled = false;
              break;
            case 3:
              inputs[3].value = (((100 - inputs[2].value) / 2) * inputs[0].value / 100) + (((100 - inputs[2].value) / 2) * inputs[1].value / 100) + (inputs[4].value * inputs[2].value / 100);
              break;
            case 4:
              var tempvalue = ((inputs[3].value * 100) - (((100 - inputs[2].value) / 2) * inputs[0].value) - (((100 - inputs[2].value) / 2) * inputs[1].value)) / inputs[2].value;
              inputs[4].value = tempvalue > 0 ? tempvalue : 0
              break;
            default:
              break;
          }
          if (inputs[i].value > 100) {
            $(inputs[i]).parent().addClass("has-error");
            $(inputs[i]).next().addClass("glyphicon-remove");
            $(inputs[i]).parent().removeClass("has-warning");
            $(inputs[i]).next().removeClass("glyphicon-warning-sign");
          } else if (i == 4 && inputs[i].value > Math.max(inputs[0].value,inputs[1].value)) {
            $(inputs[i]).parent().addClass("has-warning");
            $(inputs[i]).next().addClass("glyphicon-warning-sign");
            $(inputs[i]).parent().removeClass("has-error");
            $(inputs[i]).next().removeClass("glyphicon-remove");
          } else {
            $(inputs[i]).parent().removeClass("has-error");
            $(inputs[i]).next().removeClass("glyphicon-remove");
            $(inputs[i]).parent().removeClass("has-warning");
            $(inputs[i]).next().removeClass("glyphicon-warning-sign");
          }
        }
      }
    } else {
      for (var i=0; i<inputs.length; i++) {
        if (inputs[i].disabled) {
          inputs[i].value = "";
          inputs[i].disabled = false;
          $(inputs[i]).parent().removeClass("has-error");
          $(inputs[i]).parent().removeClass("has-warning");
        }
      }
    }
  });
});
