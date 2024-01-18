var lastInputValue = "";
let timer;
var isInputFocused = false;
var baseUrl = "http://192.168.1.67:55555/"

function sendKeyPressData() {
  var inputElement = document.getElementById("input");
  var resultElement = document.getElementById("resultContainer");
  var inputValue = inputElement.value;

  if (inputValue.length > 1 && isInputFocused) {
    if (inputValue !== lastInputValue) {
      fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputValue }),
      })
        .then((response) => response.json())
        .then((data) => {
          var serverResponseList = data;
          if (resultElement) {
            resultElement.innerHTML = ""; // Önceki içeriği temizle
            for (var i = 0; i < serverResponseList.length; i++) {
              var liElement = document.createElement("li");
              liElement.classList.add("result-li");
              liElement.textContent = serverResponseList[i];   
              liElement.onclick = function() {
                // li elementinin içeriğini kullanarak belirli bir linke git
                var clickedWord = this.textContent;
                window.location.href = `${baseUrl}${clickedWord}`;
              };
              resultElement.appendChild(liElement);
            }
          }
          placeResult();
          lastInputValue = inputValue;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  } else {
    resultElement.innerHTML = "";
  }
}

function callFunc() {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    sendKeyPressData();
  }, 500);
}

function placeResult() {
  var inputElement = document.getElementById("input");
  var resultElement = document.getElementById("resultContainer");
  var searchButton = document.getElementById("btn");

  var inputPos = inputElement.getBoundingClientRect();
  var searchButtonPos = searchButton.getBoundingClientRect();

  var posx = inputPos["x"];
  var posy = inputPos["bottom"];
  var width = inputPos["width"];

  resultElement.style.top = posy + 1 + "px";
  resultElement.style.left = posx - 2 + "px";
  resultElement.style.width = width + searchButtonPos['width'] + "px";
}

window.addEventListener("resize", function () {
  placeResult();
});

document.addEventListener("click", function (event) {
  var inputElement = document.getElementById("input");
  var resultElement = document.getElementById("resultContainer");
  if (document.activeElement === inputElement) {
    isInputFocused = true;
  } else {
    resultElement.innerHTML = "";
  }
});
