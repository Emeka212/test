//====================================================
// 
//====================================================
let tagsJson = [];
let countriesAndStates;
const tagsCon = document.querySelector("#body .addGigs1 .tagsCon");
const tagInput = document.querySelector("#body .addGigs1 form input");
const stateDropDown = document.querySelector("#body .addGigs1 .state");
const contryDropDown = document.querySelector("#body .addGigs1 .country");
getContriesAndCities();
function cancle() {
  $("#body").load("pages/gigs.html");
}
function nextPage() {
  $("#body").load("pages/add_gigs2.html");
}


//====================================================
// 
//====================================================
function getContriesAndCities() {
  $.ajax({
    url: "https://countriesnow.space/api/v0.1/countries/states",
    type: "GET",
    success: (result) => [(countriesAndStates = result["data"]), getCountry()],
    error: (error) =>
      alert(
        `Unable to receive needed contries, this is the error msg: ${error}`
      ),
  });
}

//====================================================
// 
//====================================================
function getCountry() {
  for (let index = 0; index < countriesAndStates.length; index++) {
    const element = countriesAndStates[index]["name"];
    contryDropDown.innerHTML += `<option value='${index}' id='${element}'>${element}</option>`;
  }
}

//====================================================
// 
//====================================================
function getState() {
  stateDropDown.innerHTML =
    "<option selected disabled hidden>State/region</option>";
  const countryIndex = contryDropDown.value;
  const cities = countriesAndStates[countryIndex]["states"];
  for (let index = 0; index < cities.length; index++) {
    const element = cities[index]["name"];
    stateDropDown.innerHTML += `<option value='${element}'>${element}</option>`;
  }
}

//====================================================
//  ADD TAG FORM SUBMIT
//====================================================
function addTag(event) {
  event.preventDefault();
  tagsJson.push(tagInput.value);
  tagInput.value = '';
  showTags();
  removeTag();
}

//====================================================
//  REMOVE TAG BTN CLICKED
//====================================================
function removeTag() {
const alltags = document.querySelectorAll("#body .addGigs1 .tagsCon .tag");
  for (let index = 0; index < alltags.length; index++) {
    const element = alltags[index];
    element.addEventListener("click", function () {
      let elementIndex = element.getAttribute('index');
      tagsJson.splice(elementIndex,1);
      showTags();
      removeTag();
    });
  }
}


//====================================================
//  SHOW ALL INPUTED TAGS
//====================================================
function showTags() {
  tagsCon.innerHTML = '';
  for (let index = 0; index < tagsJson.length; index++) {
    const element = tagsJson[index];
    tagsCon.innerHTML += `<div class="tag" index='${index}'>${element} <b>X</b></div>`;
  }
}