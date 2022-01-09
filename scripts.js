const api_url = `https://api.npoint.io/51ed846bdd74ff693d7e`;
async function MakeTable(url) {
    const response = await fetch(url);
    var data = await response.json();
    if (response) {

        const dataLength = data.meals.length;
        var htmlText = ``;
        for(var i = 0; i < dataLength; i++){                        
            const name = data.meals[i].name;
            const image = data.meals[i].image;
            const region = data.meals[i].region;
            const category = data.meals[i].category;
            const ingredients = data.meals[i].ingredients;
            const instruction = data.meals[i].instruction;
            if(i % 2 == 0){
                const content = `<div class="mealsOdd">\n <img class="recipePic" src="`+image +
                    `">\n <p class="mealName">`+name+
                        `</p>\n <div class="regionAndCategory">\n <p class="mealRegionCategory"> <span id="category">`+category+
                            `</span>, <span id="region">`+region+`</span></p>\n</div>\n<button class="seeRecipe">See Recipe</button>\n</div>`
                htmlText += content;
                
            }
            else{
                const content = `<div class="mealsEven">\n <img class="recipePic" src="`+image +
                    `">\n <p class="mealName">`+name+
                        `</p>\n <div class="regionAndCategory">\n <p class="mealRegionCategory"> <span id="category">`+category+
                            `</span>, <span id="region">`+region+`</span></p>\n</div>\n<button class="seeRecipe">See Recipe</button>\n</div>`
                htmlText += content;
                
            }
        }
        var el = document.getElementById("meals");
        el.innerHTML = htmlText;
        var tempData = {
            categories : data.categories,
            meals : data.meals,
            regions : data.regions
        }
        return tempData;
    }
}

var APIContent = MakeTable(api_url).then(result => APIContent = result);

function FilterName() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('filterName');
    filter = input.value.toUpperCase();
    ul = document.getElementById("meals");
    li = ul.getElementsByTagName('div');
    for (i = 0; i < li.length; i ++) {
        a = li[i].getElementsByTagName(`p`).namedItem("mealName");
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
    