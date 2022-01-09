const api_url = `https://api.npoint.io/51ed846bdd74ff693d7e`;


async function GetContent(url) {
    const response = await fetch(url);
    var data = await response.json();
    if (response) {
        var tempData = {
            categories : data.categories,
            meals : data.meals,
            regions : data.regions
        }
        generateMeals(tempData);
        return tempData;
    }
}

var APIContent = GetContent(api_url).then(result => APIContent = result);


function generateMeals(data){
    var htmlText = "";
    var length = data.meals.length;
    for(var i = 0; i < length; i++){     
        const id = data.meals[i].id;  
        const name = data.meals[i].name;
        const image = data.meals[i].image;
        const region = data.meals[i].region;
        const category = data.meals[i].category;
        if(i % 2 == 0){
            const content = `<div class="mealsOdd">\n <img class="recipePic" src="`+image +
                `">\n <p class="mealName">`+name+
                    `</p>\n <div class="regionAndCategory">\n <p class="mealRegionCategory"> <span id="category">`+category+
                        `</span>, <span id="region">`+region+`</span></p>\n</div>\n<button class="seeRecipe" onclick="showRecipe(this)" id="`+id+`">See Recipe</button>\n</div>`;
            htmlText += content;
            
        }
        else{
            const content = `<div class="mealsEven">\n <img class="recipePic" src="`+image +
                `">\n <p class="mealName">`+name+
                    `</p>\n <div class="regionAndCategory">\n <p class="mealRegionCategory"> <span id="category">`+category+
                    `</span>, <span id="region">`+region+`</span></p>\n</div>\n<button class="seeRecipe" onclick="showRecipe(this)" id="`+id+`">See Recipe</button>\n</div>`;
            htmlText += content;
            
        }
    }
    var el = document.getElementById("meals");
    el.innerHTML = htmlText;
    
}


function FilterName() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('filterName');
    filter = input.value.toUpperCase();
    ul = document.getElementById("meals");
    li = ul.getElementsByTagName('div');
    for (i = 0; i < li.length; i+=2) {
        a = li[i].getElementsByTagName(`p`)[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function FilterRegion() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('filterRegion');
    filter = input.value.toUpperCase();
    ul = document.getElementById("meals");
    li = ul.getElementsByTagName('div');

    for (i = 0; i < li.length; i ++) {
        a = li[i].getElementsByTagName(`span`).namedItem("region");
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function FilterCategory() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('filterCategory');
    filter = input.value.toUpperCase();
    ul = document.getElementById("meals");
    li = ul.getElementsByTagName('div');

    for (i = 0; i < li.length; i ++) {
        a = li[i].getElementsByTagName(`span`).namedItem("category");
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function showRecipe(elem){
    var recipe = APIContent.meals.find(data => (data.id == elem.id));
    var htmlText = "";
    var tableText = "";
    var x = document.createElement("table");
    var header = x.createTHead();
    var row = header.insertRow();
    var cell = row.insertCell(0);
    cell.innerHTML = `Ingredients`;
    var cell2 = row.insertCell(1);
    cell2.innerHTML = `Measure`;
    var length = recipe.ingredients.length;
    for(var i = 0; i < length; i++){
        var ingredients = x.insertRow();
        var cell3 = ingredients.insertCell(0);
        cell3.innerHTML = recipe.ingredients[i].name;
        var cell4 = ingredients.insertCell(1);
        cell4.innerHTML = recipe.ingredients[i].measure;
    }
    tableText = `<table id="table_id">` + x.innerHTML + `</table>`;
    const content = `\n<div class="modal" id="modal">\n<div class="modalHeader">\n<p class="modalTitle">`+recipe.name+`</p>\n</div>\n<div class="modalBody">\n<img class="modalPic" src="`
    +recipe.image+`">\n<p class="modalInstructions">`+recipe.instruction+
    `</p>\n`+tableText+`\n</div>\n<div class="modalBottom">\n<button  class="closeButton" onClick=Remove()>Close</button>\n</div>\n</div>\n<div class="overlay"></div>\n`;
    htmlText = content;
    var newEl = document.createElement("div");
    var textNode = document.createElement("div");
    textNode.innerHTML = htmlText;
    newEl.appendChild(textNode);

    var list = document.getElementsByTagName('body')[0];
    list.insertBefore(newEl, list.childNodes[0]);
}

function Remove(){
    var elem = document.getElementsByTagName("div")[0];
    elem.remove();
}
    
