let term = document.querySelector(".term");
let definition = document.querySelector('.definition');
let checkButton = document.querySelector('.check');
let nextButton = document.querySelector('.next');

let words = {
  socks: "chaussettes",
  shoes: "chaussures",
  shirt: "chemise",
  skirt: "jupe",
  trousers: "pantalon",
  sweater: "pull",
  dress: "robe",
  shorts: "short",
  "T-shirt": "tshirt",
 
}
 
data = Object.entries(words);
console.log(data);
console.log(getRandomTerm());


function getRandomTerm() {
  let topRandomTerm = data[Math.floor(Math.random() * data.length)]
  term.textContent = topRandomTerm[0];
  definition.textContent = topRandomTerm[1];
//   nextButton.addEventListener('click', function() {
//   console.log('You click the next button');
// })
}

checkButton.addEventListener('click', function() {
  definition.style.display = 'block';
  term.style.display = "none";
  // definition.style.zIndex = "+1";
});

nextButton.addEventListener('click', function() {
  getRandomTerm();
  definition.style.display = 'none';
  term.style.display = 'block';
});


