//nameChecking and Take action by Notifying him
function namePart() {
    //input
    let inputLetter = document.getElementById('inputLetter').value;
    //if length 1 , we search it by first letter or we search it by name of food.
    let link = 'https://www.themealdb.com/api/json/v1/1/search.php?';
    document.getElementById('ingredients').innerHTML=``;
   
    if (inputLetter.length === 1) {
        link += 'f=';
        link += inputLetter;
    }
    else {
        link += 's=';
        link += inputLetter;
    }

    ///alert(link);
    fetch(link)
        .then(response => response.json())
        .then(data => process(data))
        .catch(err => console.log(err))

    function process(data) {
        //console.log(data);
        if (data.meals === null || data.meals === undefined) {
            alert('Wrong Input. Please try again');
        }

        else {
            //console.log(data.meals[0]);
            //console.log(data.meals);
            //meals provides data meal
            const meals = data.meals;
            const foodDiv = document.getElementById('foodName');

            meals.forEach(meals => {
                const foodNameDiv = document.createElement('div');
                foodNameDiv.className = 'foodClass';
                foodNameDiv.className = 'col ';
                foodNameDiv.className = 'foodClass';
                const foodInfo = `
                    <img style="width:100%;border-radius:10px 10px 0px 0px;" src=${meals.strMealThumb}>
                    <h4>${meals.strMeal}</h4>
                `;
                foodNameDiv.innerHTML = foodInfo;
                foodDiv.appendChild(foodNameDiv);
                //click and show ingredients
                foodNameDiv.addEventListener('click', () => {
                    //previous card discard;
                    document.getElementById('ingredients').innerHTML = ``;
                    const ingredients = document.getElementById('ingredients');
                    const ingDiv = document.createElement('div');
                    //ingDiv.className = 'ingClass';
                    ingDiv.className = 'col ';
                    ingDiv.innerHTML = `
                    <div class="showImg">
                    <img id="showImage" style="width:100%;border-radius:10px 10px 0px 0px;" src=${meals.strMealThumb}>
                    </div>
                    <div class="ShowName">
                    <h3>${meals.strMeal}</h3>
                     </div>
                    <h4>Ingredients</h4>
            <ol id="foodShowList">
            </ol>
            `;
                    
                    ingredients.appendChild(ingDiv);


                    const foodList = document.getElementById('foodShowList');

                    foodList.innerHTML = '';
                    for (let i = 1; ; i++) {
                        //make string name
                        let string = String('strIngredient' + String(i));
                        let stringMeasure = String('strMeasure' + String(i));


                        const ingListItem = meals[string];
                        //console.log(meals[string]);

                        if (ingListItem.length != "" && ingListItem != 'null') {

                            foodList.innerHTML = foodList.innerHTML + `<li>${meals[string]} ${meals[stringMeasure]} </li>`;
                            ingredients.appendChild(foodList);

                        }
                        else {
                            foodList.innerHTML = foodList.innerHTML + `<input style="background-color: green; margin:5px;" type="button" value="Reload Page" onClick="window.location.reload(true)">`;
                            // reload option for make user's see more reliable.
                            break;
                        }

                    }
                });
            }
            )
        }
    }
}





