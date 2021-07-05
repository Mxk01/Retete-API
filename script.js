const texts = document.querySelector(".texts");
const API_ID = 'dbb0dbd7';
const APP_KEY = '9cb979253a427e87662aae47c2e07ae3';
const section = document.querySelector('section');

//  window.addEventListener('DOMContentLoaded',()=>{
//      utterSomething();
//  })

// function utterSomething () 
// {
// let msg = new SpeechSynthesisUtterance("Welcome to foodie! We hope you enjoy this app");
// var voices = speechSynthesis.getVoices();
// msg.voice = voices[3];
// msg.volume = 1; // 0 to 1
// msg.rate = 2; // 0.1 to 10
// msg.pitch = 1; //0 to 2
// msg.voiceURI = 'native';
// msg.lang = 'en-En';
// speechSynthesis.speak(msg);
// }

function showRecipe(data){
console.log(data);
let hits = data.hits;
let recipe = hits.map(meal=>{


// ${meal.recipe.ingredients.length}
//     ${meal.recipe.ingredients[1].text}
//   ${meal.recipe.ingredients[2].text}
 //  ${meal.recipe.ingredients[3].text}
  // ${meal.recipe.ingredients[4].text}

console.log(meal);

let ingredients = meal.recipe.ingredients.map(ingredient => ingredient.text ); 
let fat = meal.recipe.totalNutrients.FAT;
let carbs = meal.recipe.totalNutrients.CHOCDF
let div = document.createElement('div');
div.id="mealContainer";
div.innerHTML =  `  

<img class="meal-image" src="${meal.recipe.image}"></img> 

<br>
<p class="meal-text">${meal.recipe.label}
  <br>

  <br>
  <i class="fas fa-cloud-meatball"></i>  Calories : ${Math.round(meal.recipe.calories)} kcal 
  Ingredients: 
   ${ingredients},
   <br>
   <br>
   Type:
     <p>${fat.label} ${Math.round(fat.quantity)} ${fat.unit}</p>
     <p>${carbs.label} ${Math.round(carbs.quantity)} ${carbs.unit}</p>
     <a href="${meal.recipe.url}">See recipe</a>
   </p>
`;
if(texts.children.length==0)
{
texts.appendChild(div);
}
else 
{
   texts.innerHTML ='';
   texts.appendChild(div);
}
})

} 




const fetchMeals = async(meal) => {
let BASE_URL = `https://api.edamam.com/search?q=${meal}&app_id=${API_ID}&app_key=${APP_KEY}`;
const response =  await fetch(BASE_URL)
const data = await response.json();
showRecipe(data); 
}


window.SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement("p");
p.innerText = '';
recognition.addEventListener("result", (e) => {
texts.appendChild(p);
// Make an array out of results
const text = Array.from(e.results)
// Get first result 
.map((result) => result[0])
// Get the transcript for first result
.map((result) => result.transcript)
.join("");

p.innerText = text;
// If user finished typing (so text is final one )
if (e.results[0].isFinal) {

fetchMeals(e.results[0][0].transcript);

}
});

recognition.addEventListener("end", () => {
recognition.start();
});







recognition.start();
