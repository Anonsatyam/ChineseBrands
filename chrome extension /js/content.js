var css =
    '.popup .overlay { position: fixed; top: 0px; left: 0px; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.7); z-index: 1; display: none; } .popup .content { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0); width: 300px; height: 250px; background: #f7f8ff; box-shadow: 0px 5px 50px rgba(0, 0, 0, 0.1); border-radius: 10px; z-index: 2; text-align: center; padding: 20px; box-sizing: border-box; font-family: "Open Sans", sans-serif; } .popup .close-btn { cursor: pointer; position: absolute; right: 20px; top: 20px; width: 30px; height: 30px; background: #222; color: #fff; font-size: 25px; font-weight: 600; line-height: 30px; text-align: center; border-radius: 50%; } .popup.active .overlay { display: block; } .popup.active .content { transition: all 300ms ease-in-out; transform: translate(-50%, -50%) scale(1); } img#warning { position: absolute; left: 39.32%; right: 39.32%; top: 12.83%; bottom: 61.92%; } p#popup-title { position: absolute; width: 231px; height: 23px; left: 32px; top: 105px; font-family: Roboto; font-style: normal; font-weight: 500; font-size: 23px; line-height: 23px; letter-spacing: 0.05em; color: #000000; } p#popup-text { position: absolute; width: 150px; height: 18px; left: 72px; top: 165px; font-family: Roboto; font-style: normal; font-weight: normal; font-size: 12px; line-height: 18px; letter-spacing: 0.05em; color: #000000; } div#popup-yes { flex-direction: row; padding: 3px 16px; position: absolute; height: 24px; left: 45px; top: 200px; background: #ffdada; border-radius: 5px; } div#popup-yes:hover { background: #f57676; } div#popup-no { flex-direction: row; padding: 3px 16px; position: absolute; height: 24px; right: 45px; top: 200px; background: #cefdd7; border-radius: 5px; } div#popup-no:hover { background: #79f791; } p#popup-button { position: static; width: 47px; height: 18px; left: 16px; top: 3px; font-family: Poppins; font-style: normal; font-weight: bold; font-size: 8px; letter-spacing: 0.05em; }',
  head = document.head || document.getElementsByTagName("head")[0],
  style = document.createElement("style");

head.appendChild(style);

style.type = "text/css";
if (style.styleSheet) {
  // This is required for IE8 and below.
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

var elemDiv = document.createElement("div");
elemDiv.innerHTML =
  '<div class="popup" id="popup-1"><div class="overlay"></div><div class="content"><img src="https://raw.githubusercontent.com/chokshiroshan/ChineseBrands/master/warning.svg" id="warning" /><p id="popup-title">This is a chinese product.</p><p id="popup-text">Are you sure to proceed?</p><div id="popup-yes" onclick="togglePopup()"><p id="popup-button" style="color: #ff5555;">Yes i know</p></div><div id="popup-no" onclick="redirect()"><p id="popup-button" style="color: #25b93e;">No i am not</p></div></div></div>';
document.body.appendChild(elemDiv);

var script = document.createElement("script");
script.text =
  'function togglePopup() { document.getElementById("popup-1").classList.toggle("active");}function redirect() {window.location.href = "//" + window.location.href.split("/")[2];}';
document.body.appendChild(script);

function togglePopup() {
  document.getElementById("popup-1").classList.toggle("active");
}
function redirect() {
  window.location.href = "//" + window.location.href.split("/")[2];
}

try {
  var productBrand = document.getElementById("bylineInfo").text;
} catch (err) {
  var productBrand = "";
}

console.log(productBrand);

var message = "NAN";
var request = new XMLHttpRequest();

request.open(
  "GET",
  "https://raw.githubusercontent.com/chokshiroshan/ChineseBrands/master/data.json",
  true
);
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
    console.log(data.brands);
    // brands = data.brands;
    for (i = 0; i < data.brands.length; i++) {
      if (productBrand == "") {
        break;
      } else if (productBrand.toLowerCase() == data.brands[i]) {
        message = "Chinese";
        togglePopup();
        break;
      } else {
        message = "NotChinese";
      }
    }
  } else {
    console.log("error");
  }

  chrome.runtime.sendMessage(
    { status: message, product: productBrand.toLowerCase() },
    function (response) {
      // console.log(response.farewell);
    }
  );
};

request.send();
