var upButtonClickTimer = null;
function upButtonClick() {
  var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
  if (top > 0) {
    window.scrollBy(0, -100);
    upButtonClickTimer = setTimeout(upButtonClick, 20);
  } else {
    if (upButtonClickTimer) {
      clearTimeout(upButtonClickTimer);
      upButtonClickTimer = null;
    }
  }
  return false;
}

function upButtonWindowOnscroll() {
  var updownElem = document.getElementById('up_button');
  if (updownElem) {
    var pageY = window.pageYOffset || document.documentElement.scrollTop;
    var innerHeight = 200;
    if (pageY > innerHeight) {
      updownElem.setAttribute("style", "display:block;");
      return;
    }
    if (pageY < innerHeight) {
      updownElem.setAttribute("style", "display:none;");
      return;
    }
  }
}
