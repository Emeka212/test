//====================================================
// 
//====================================================
let tagsJson = [];
let countriesAndStates;
let contryDropDown = document.querySelector("#body .addGigs1 .country");
let stateDropDown = document.querySelector("#body .addGigs1 .state");
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
