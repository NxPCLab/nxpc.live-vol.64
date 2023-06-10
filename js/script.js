function getQueryParameter() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  return id;
}

function embeddingOptionalNeort(id) {
  const path = "https://neort.io/embed/" + id + "?autoStart=true&quality=1&info=true";
  const iframe = document.querySelector("iframe");
  if (iframe) {
    iframe.src = path;
  }
  console.log(path);
}

function getRandomID(min, max) {
  min = min;
  max = max;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function embeddingNeort(data) {
  let min = 0;
  let max = data.length - 1;
  let randID = getRandomID(min, max);
  const artID = data[randID].id;
  const path = "https://neort.io/embed/" + artID + "?autoStart=true&quality=1&info=true";
  const iframe = document.querySelector("iframe");
  if (iframe) {
    iframe.src = path;
  }
  console.log(path);
}

document.addEventListener('DOMContentLoaded', function () {
  const idValue = getQueryParameter();
  if (idValue) {
    embeddingOptionalNeort(idValue);
  } else {
    const request = new XMLHttpRequest();
    //https://neort.io/tag/bmjb2ss3p9f7m1g01690
    request.open("GET", "https://api-neort.com/v1/tag/bmjb2ss3p9f7m1g01690/arts?limit=20&offset=0");
    request.send();
    request.addEventListener("load", function () {
      data = JSON.parse(this.responseText);
      embeddingNeort(data);
    });
  }
});