function initialize() {
  const submitButton = document.getElementById("submitBtn");
  const body = document.getElementById("body");
  submitButton.onclick = submitButtonHandler;
  body.onkeydown = handleEnterKeyPress;
}

function submitButtonHandler() {
  const searchTerm = document.getElementById("searchTerm");

    if (!searchTerm.value) {
      console.log("User didn't type in a search term.");
      alert("If you'd like to enter a world of pure imagination, please type in a search query.");
    } else {
      console.log("clicked");
      const url = "https://en.wikipedia.org/w/api.php?callback=displaySearchResults&action=query&format=json&uselang=user&prop=info%7Cextracts&meta=&generator=search&inprop=url&exsentences=1&exlimit=max&exintro=1&explaintext=1&excontinue=&gsrinfo=&gsrprop=snippet&gsrsearch=" + searchTerm.value;

      const body = document.getElementById("body");
      const jsonp = document.getElementById("jsonp");

      if (body.contains(jsonp)) {
        console.log("remove previous script tag")
        const newScript = document.createElement("script");
        body.replaceChild(newScript, jsonp);
        newScript.setAttribute("src", url);
        newScript.id = "jsonp";
      } else {
        console.log("first inquiry");
        const jsonPScript = document.createElement("script");
        jsonPScript.id = "jsonp";
        body.appendChild(jsonPScript);
        jsonPScript.setAttribute("src", url);
      }
    }
  }

  function displaySearchResults(data) {
    console.log(data);
    var objOfEntries = data.query.pages;

    //safari polyfill for Object.entries
    const reduce = Function.bind.call(Function.call, Array.prototype.reduce);
    const isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable);
    const concat = Function.bind.call(Function.call, Array.prototype.concat);
    const keys = Reflect.ownKeys;

    if (!Object.entries) {
	     Object.entries = function entries(O) {
		       return reduce(keys(O), (e, k) => concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[k, O[k]]] : []), []);
	       };
        }

    var arrOfEntries = Object.entries(objOfEntries);

    console.log(arrOfEntries);

    var entriesContainer = document.getElementById("entriesContainer");

    if (entriesContainer.firstChild.id === "nosearchyet") {
      var entries = entriesContainer.firstChild;
      entries.id = "entries";

      //generates first wikipedia search result list
      for (let i = 0; i < arrOfEntries.length; i++) {
        let div = document.createElement("div");
        entries.appendChild(div);
        div.setAttribute("class", "entryDiv");
        let spanTitle = document.createElement("span");
        div.appendChild(spanTitle);
        spanTitle.setAttribute("class", "entryTitle");
        spanTitle.innerHTML = arrOfEntries[i][1].title + "<br>";
        let wikilink = document.createElement("a");
        div.appendChild(wikilink);
        wikilink.setAttribute("href", arrOfEntries[i][1].canonicalurl);
        wikilink.setAttribute("target", "_blank");
        wikilink.innerHTML = arrOfEntries[i][1].canonicalurl;
        let spanExtract = document.createElement("span");
        div.appendChild(spanExtract);
        spanExtract.innerHTML = "<br>" + arrOfEntries[i][1].extract;
      }
    } else {
      var newEntries = document.createElement("div");
      newEntries.id = "newEntries";
      entriesContainer.replaceChild(newEntries, entriesContainer.firstChild);

      //generates new wikipedia search result list
      for (let i = 0; i < arrOfEntries.length; i++) {
        let div = document.createElement("div");
        newEntries.appendChild(div);
        div.setAttribute("class", "entryDiv");
        let spanTitle = document.createElement("span");
        div.appendChild(spanTitle);
        spanTitle.setAttribute("class", "entryTitle");
        spanTitle.innerHTML = arrOfEntries[i][1].title + "<br>";
        let wikilink = document.createElement("a");
        div.appendChild(wikilink);
        wikilink.setAttribute("href", arrOfEntries[i][1].canonicalurl);
        wikilink.setAttribute("target", "_blank");
        wikilink.innerHTML = arrOfEntries[i][1].canonicalurl;
        let spanExtract = document.createElement("span");
        div.appendChild(spanExtract);
        spanExtract.innerHTML = "<br>" + arrOfEntries[i][1].extract;
      }
    }
  }

  function handleEnterKeyPress(e) {
   const key = e.keyCode;
    if (key === 13) {
       console.log(key);
       submitButtonHandler();
    }
  }

window.onload = initialize;

/*function ajaxRequest(resource) {
  console.log("called");
  const xhr = new XMLHttpRequest();

  //defines handler to handle ajax response
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          displaySearchResults(xhr.responseText);
        } else {
          console.log(resource);
          console.log(xhr.statusText);
          console.log("There was a problem with the request.");
        }
      }
    };

  xhr.onerror = function() {
    console.log('There was an error!');
  };

  xhr.open("GET", resource);
  xhr.setRequestHeader("Api-User-Agent", "Free Code Camp Wikipedia Viewer Project");
  xhr.send();

  function displaySearchResults(data) {
    console.log(data);
    const links = JSON.parse(data);
    console.log(links);
 }
}
*/
