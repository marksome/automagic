function automagic() {
  getFavoritter();
}

function appendButton() {
  var button = document.createElement("button");
  button.className = "btn btn-blue rounded";
  button.innerText = "AutoMagic";
  button.addEventListener("click", automagic, false);
  button.id = "automagic";
  var span = document.createElement("span");
  span.className = "mr-2";
  var i = document.createElement("i");
  i.className = "fa-solid fa-wand-magic-sparkles";
  button.appendChild(span);
  button.appendChild(i);
  const flex = document.getElementsByClassName("flex gap-2")[0];
  flex.appendChild(button);
}

function getFavoritter() {
  var favoritter_tab = document.getElementsByClassName("fad fa-star");
  if (favoritter_tab[0]) {
    favoritter_tab[0].parentNode.dispatchEvent(new Event("click", { bubbles: true }));
    var favoritter = document.querySelectorAll('[id^="timesheet-code-button-header"]')[0];
    if (favoritter) {
      favoritter.dispatchEvent(new Event("click", { bubbles: true }));
      var dialog = document.querySelectorAll('[id^="dialog-id"]')[1];
      var i = dialog.getElementsByClassName("fas fa-times fa-lg")[0];
      i.dispatchEvent(new Event("click", { bubbles: true }));
      applyHours();
    } else {
      var favoritter_button = app.querySelector('[aria-label="Favoritter"]');
      favoritter_button.dispatchEvent(new Event("click", { bubbles: true }));
      setTimeout(() => {
        getFavoritter();
      }, 500);
      return;
    }
    return;
  } else {
    var favoritter_button = app.querySelector('[aria-label="Favoritter"]');
    favoritter_button.dispatchEvent(new Event("click", { bubbles: true }));
    setTimeout(() => {
      getFavoritter();
    }, 500);
    return;
  }
}

function applyHours() {
  var table = document.querySelectorAll('[id^="f_working_hours"]');
  var headers = document.querySelectorAll('[id^="header-20"]');
  document.querySelectorAll('[id^="header-20"]')[0].textContent;
  var regExp = /\(([^)]+)\)/;
  if (table.length) {
    for (var i = 0; i < table.length; i++) {
      let cell = table[i];
      if (cell) {
        var day_and_hours = headers[i].textContent;
        var hours = regExp.exec(day_and_hours);
        if (hours) {
          cell.defaultValue = hours[1];
          cell.value = hours[1];
          cell.dispatchEvent(new Event("click", { bubbles: true }));
        } else {
          cell.defaultValue = "0";
          cell.value = "0";
          cell.dispatchEvent(new Event("click", { bubbles: true }));
        }
      } else {
        console.log("Need open row values, create a new row");
        break;
      }
    }
    table[0].dispatchEvent(new Event("click", { bubbles: true }));
    const flex = app.getElementsByClassName("flex gap-2")[0];
    var i = flex.getElementsByClassName("fas fa-save")[0];
    // Store changes
    i.dispatchEvent(new Event("click", { bubbles: true }));
  } else {
    getTable();
  } 
}

function getTable() {
  var table = document.querySelectorAll('[id^="f_working_hours"]')[0];
  if (table) {
    applyHours();
  } else {
    setTimeout(() => {
      getTable();
    }, 500);
    return;
  }
  return;
}

var i = 0;
const observer = new MutationObserver((mutations) => {
  i++;
  if (i > 1) {
    if (document.getElementById("automagic")) {
      // If button is present, do nothing
    } else {
      appendButton();
      observer.disconnect();
      i = 0;
      observer.observe(app, {childList: true, subtree: true});
    }
  }
});
var app = document.getElementById("app");
observer.observe(app, {childList: true, subtree: true});