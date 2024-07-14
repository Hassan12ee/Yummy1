let data = [];
// -----------------------------------------api room-------------------------------
async function mainEntrey() {
  let mydata = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  let response = await mydata.json();
  data = response.meals;
  datadisplay(data);
}
async function getMealDetails(idMeal) {
  let mydata = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  );
  let response = await mydata.json();
  data = response.meals;
  Detailsdisplay(data[0]);
}
async function mealsCategories() {
  let mydata = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let response = await mydata.json();
  data = response.categories;
  Categorydisplay(data);
}
async function mealsArea() {
  let mydata = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let response = await mydata.json();
  data = response.meals;
  Areadisplay(data);
}
async function mealsIngredients() {
  let mydata = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  let response = await mydata.json();
  data = response.meals;
  Ingredientdisplay(data);
}
async function getCategoryMeals(i) {
  let mydata = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${i}`
  );
  let response = await mydata.json();
  data = response.meals;
  datadisplay(data);
}
async function getAreaMeals(i) {
  let mydata = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${i}`
  );
  let response = await mydata.json();
  data = response.meals;
  datadisplay(data);
}
async function getIngredientsMeals(strIngredient) {
  let mydata = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngredient}`
  );
  let response = await mydata.json();
  data = response.meals;
  datadisplay(data);
}
async function searchByName(search) {
  let mydata = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
  );
  let response = await mydata.json();
  data = response.meals;
  datadisplay(data);
}
async function searchByFLetter(search) {
  let mydata = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`
  );
  let response = await mydata.json();
  data = response.meals;
  datadisplay(data);
}
// --------------------------------end api rooms-------------------------------------------------
// -----------------------------------event rooms------------------------------------------------
mainEntrey();
let isOpen = false;
let Search = document.getElementById("Search");
let Categories = document.getElementById("Categories");
let Area = document.getElementById("Area");
let Ingredients = document.getElementById("Ingredients");
let Contact = document.getElementById("Contact");
let tab = document.getElementById("tab");
let slidenavbar = document.getElementById("open");
let searchc=document.getElementById("searchContainer");
let rowData=document.getElementById("rowData");
let submitBtn=document.getElementById("submitBtn");
let dataclear="";
$(function () {
  $(".loader").fadeOut(3000, function () {
    $(".loaded").slideUp(10, function () {
      $("body").css({ overflow: "auto" });
      $(".loader").css({ display:"none"});
    });
  });
});
function loader() {
  searchc.innerHTML=dataclear;
  rowData.innerHTML=dataclear;
  $(".loaded").slideDown(1);
  $(".loader").css({ display:"Block"},
   
    $(".loader").fadeOut(3000, function () {
    $(".loaded").slideUp(10, function () {
      $("body").css({ overflow: "auto" });
      $(".loader").css({ display:"none"});
    });}));
   
}
function done(){alert("done")}
Contact.addEventListener("click", function () {
  contactdisplay()
  openNav();
  loader();
})
function openNav() {
  if (isOpen == false) {
    tab.classList.replace("fa-align-justify", "fa-x");
    
    $('.slidenavbar').animate({width:'320px'},300);
    $('#Search').animate({top:"0"},100,function(){
      $('#Categories').animate({top:"0"},100,function(){
        $('#Area').animate({top:"0"},100,function(){
          $('#Ingredients').animate({top:"0"},100,function(){
            $('#Contact').animate({top:"0"},100);
          });
        });
        
      });
    
    });
  
   
    isOpen = true;
  } else {
    isOpen = false;
    tab.classList.replace("fa-x", "fa-align-justify");
    $('.slidenavbar').animate({width:'65px'},300);
    $('.slidenavbar ul li').animate({top:"100%"},300)

  }
  
    
}
submitBtn.addEventListener("click", function () {
  var regex={  
nameInput:  /^[a-zA-Z]+/g,
emailInput:/^[a-zA-z]+@[a-zA-z]+\.com$/,
phoneInput:/^[002|+2]01(1|2|0|5)[0-9]{8}$/,
ageInput:/[1-9][0-9]/,
passwordInput:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
};
let nameInput=document.getElementById("nameInput");
let emailInput=document.getElementById("emailInput");
let phoneInput=document.getElementById("phoneInput");
let ageInput=document.getElementById("ageInput");
let passwordInput=document.getElementById("passwordInput");
let repasswordInput=document.getElementById("repasswordInput");
let element=[nameInput,emailInput,phoneInput,ageInput,passwordInput];
console.log(element.id);
let forend=[];
element.forEach(function (element) {
var cond =regex[element.id].test(element.value);
if(cond==true)
  {
      element.classList.add("is-valid");
      element.classList.remove("is-invalid"); 
      element.nextElementSibling.classList.replace('d-block','d-none');
      forend.push(element);
      
  }
  else{ 
      element.classList.add("is-invalid"); 
      element.classList.remove("is-valid");
      element.nextElementSibling.classList.replace('d-none','d-block');
      }
  

})
if(forend.length==5&&passwordInput==repasswordInput){
done()
}

})
tab.addEventListener("click", function () {
  openNav();
});
Categories.addEventListener("click", function () {
  mealsCategories();
  openNav();
  loader();

});
Ingredients.addEventListener("click", function () {
  mealsIngredients();
  openNav();
  loader();
});
Area.addEventListener("click", function () {
  mealsArea();

  openNav();
  loader()
});
Search.addEventListener("click", function () {
  loader()
  searchdisplay();
  openNav();
});
// ---------------------------------- end event rooms--------------------------------------------
// -----------------------------------display rooms----------------------------------------------
function datadisplay(publicview) {
  let datacollector = "";
  let n;
  if (publicview == null) {
    datacollector = "<p class='text-center'>Not found</p>";
  } else if (publicview.length > 20) {
    n = 20;
  } else {
    n = publicview.length;
  }
  for (let i = 0; i < n; i++) {
    datacollector += `
                    <div class="col-md-3">
            <div onclick="getMealDetails('${publicview[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${publicview[i].strMealThumb}" alt="" srcset="">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${publicview[i].strMeal}</h3>
                </div>
            </div>
    </div>
`;
  }
  document.getElementById("rowData").innerHTML = datacollector;
}
function contactdisplay() {
  let datacollector2 = "";
  let datacollector = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput"  type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput"  type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput"  type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput"  type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input id="passwordInput" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input id="repasswordInput"  type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div>`;
  document.getElementById("searchContainer").innerHTML = datacollector;
  document.getElementById("rowData").innerHTML = datacollector2;
}

function truncateText(selector, maxLength) {
  let truncated = selector;
  if (truncated.length > maxLength) {
    truncated = truncated.substr(0, maxLength) + "...";
  }
  return truncated;
}
function Ingredientdisplay(publicview) {
  let datacollector = "";

  for (let i = 0; i < 20; i++) {
    datacollector += `
            <div class="col-md-3">
                <div onclick="getIngredientsMeals('${
                  publicview[i].strIngredient
                }')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${publicview[i].strIngredient}</h3>
                        <p>${truncateText(
                          publicview[i].strDescription,
                          100
                        )}</p>
                </div>
        </div>
`;
  }
  document.getElementById("rowData").innerHTML = datacollector;
}
function Areadisplay(publicview) {
  let datacollector = "";

  for (let i = 0; i < publicview.length; i++) {
    datacollector += `
          <div class="col-md-3">
                <div onclick="getAreaMeals('${publicview[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${publicview[i].strArea}</h3>
                </div>
        </div>
`;
  }
  document.getElementById("rowData").innerHTML = datacollector;
}
function Categorydisplay(publicview) {
  let datacollector = "";

  for (let i = 0; i < publicview.length; i++) {
    datacollector += `
          <div class="col-md-3">
                <div onclick="getCategoryMeals('${publicview[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${publicview[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${publicview[i].strCategory}</h3>
                        <p>${publicview[i].strCategoryDescription}</p>
                                            </div>
                </div>
        </div>
`;
  }
  document.getElementById("rowData").innerHTML = datacollector;
}
function searchdisplay() {
  let datacollector2 = "";
  let datacollector = `<div class="col-md-6 ">
<input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
</div>
<div class="col-md-6">
<input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
</div>`;
  document.getElementById("searchContainer").innerHTML = datacollector;
  document.getElementById("rowData").innerHTML = datacollector2;
}

function Detailsdisplay(publicview) {
  let datacollector = "";
  let datacollector2 = "";

  for (var i = 1; i < 20; i++) {
    if (publicview["strIngredient" + i] != "") {
      datacollector += `<li class="alert alert-info m-2 p-1">
         ${publicview["strMeasure" + i]}${
        publicview["strIngredient" + i]
      } </li>`;
    } else {
    }
  }

  datacollector2 = `
                 <div class="col-md-4">
          <img
            class="w-100 rounded-3"
            src="${publicview.strMealThumb}"
            alt=""
          />
          <h2>${publicview.strMeal}</h2>
        </div>
        <div class="col-md-8">
          <h2>Instructions</h2>
          <p>${publicview.strInstructions}
          </p>
          <h3><span class="fw-bolder">Area : </span>${publicview.strArea}</h3>
          <h3><span class="fw-bolder">Category : </span>${publicview.strCategory}</h3>
          <h3>Recipes :</h3>
          <ul class="list-unstyled d-flex g-3 flex-wrap">
                   ${datacollector}     
         </ul>

          <h3>Tags :</h3>
          <ul class="list-unstyled d-flex g-3 flex-wrap">
            <li class="alert alert-danger m-2 p-1">${publicview.strTags}</li>
          </ul>

          <a
            target="_blank"
            href="${publicview.strSource}"
            class="btn btn-success"
            >Source</a
          >
          <a
            target="_blank"
            href="${publicview.strYoutube}"
            class="btn btn-danger"
            >Youtube</a
          >
        </div>
`;

  document.getElementById("rowData").innerHTML = datacollector2;
}
