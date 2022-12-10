import { menuArray } from "./data.js";

const orderPanel = document.getElementById("order-panel");
const completeOrderBtn = document.getElementById("complete-order");
const modal = document.querySelector(".modal-container");
const paybtn = document.querySelector(".pay");
const form = document.getElementById("payment-form");
const div = document.getElementById("completed");

form.addEventListener("submit", handlePaymetSubmit); //okay works now, problem was simple. you're a ninnywit. and you need to take a sec and think it out hun, not go in circles, think WHERE the action is firing from and what the aim is.

function handlePaymetSubmit(event) {
 event.preventDefault();
 modal.classList.toggle("hidden");

 let paymentForm = new FormData(form);
 let name = paymentForm.get("name");

 setTimeout(() => {
  orderPanel.innerHTML = "";
  div.innerHTML = `
     <section class="thankyou-order">
      <p class="text">Thanks, ${name}! Your order is on its way!</p>
    </section>
     `;
 }, 500);

 setTimeout(() => {});
}

//page addeventlistener
document.addEventListener("click", (e) => {
 //first menu-item
 if (e.target.dataset.add === "0") {
  let dataTypeNumber = Number(e.target.dataset.add);
  handleAddClick(e.target.dataset.add); // this gets the id number of the item clicked
  totalPrice.push(menuArray[0].price);
  handleDisplay();
  pizzaArr.push(menuArray[0]);
  totalPizzaPrice.push(menuArray[0].price); // just the pizza
  handleTotalPrice();
  filterDuplicates(); // test function
  pizzaPriceTally();
 }
 //second menu-item
 if (e.target.dataset.add === "1") {
  let dataTypeNumber = Number(e.target.dataset.add);
  handleAddClick(e.target.dataset.add); // this gets the id number of the item clicked
  totalPrice.push(menuArray[1].price);
  handleDisplay();
  hamburgerArr.push(menuArray[1]);
  totalHamburgerPrice.push(menuArray[1].price);
  console.log(totalHamburgerPrice);
  handleTotalPrice();
  filterDuplicates(); // test function
 }
 //third menu-item
 if (e.target.dataset.add === "2") {
  let dataTypeNumber = Number(e.target.dataset.add);
  handleAddClick(e.target.dataset.add); // this gets the id number of the item clicked
  totalPrice.push(menuArray[2].price);
  handleDisplay();
  beerArr.push(menuArray[2]);
  totalBeerPrice.push(menuArray[2].price);
  console.log(totalBeerPrice);
  handleTotalPrice();
  filterDuplicates(); // test function
 }

 if (e.target.dataset.remove === "0") {
  pizzaArr.pop();
  totalPizzaPrice.pop();
  pizzaArr.length - 1;
  pizzaPriceDecrement();
  pizzaPriceTally();
  filterDuplicates();

  if (pizzaArr.length === 0) {
   document.querySelector("[data-item='0']").classList.add("hidden");
  }
 }

 if (e.target.dataset.remove === "1") {
  hamburgerArr.pop();
  totalHamburgerPrice.pop();
  hamburgerArr.length - 1;
  hamburgerPriceDecrement();
  hamburgerPriceTally();
  filterDuplicates();
 }

 if (e.target.dataset.remove === "2") {
  beerArr.pop();
  totalBeerPrice.pop();
  beerArr.length - 1;
  beerPriceDecrement();
  // totalPrice.pop(); //omg when you pop this and it leaves you the wrong values, its because you are taking the last of the array and if that is 14$ because you added hamburger 12 first and then added pizza 14, but then went and popped through this function hamburger you would be left with 12 not 14 because this is the order of the arr = [12, 14] and so its not the burger price removed but the LAST pushed one to the totalPrice array -- you ninnywit.
  beerPriceTally();
  filterDuplicates();
 }

 // these work, they suck, but they work and when the pain decides to leave me i shall return to fix this hot mess, but i am happy it does what it should regardless of how ugly it is, dont be so harsh on yourself kay ???

 if (hamburgerArr.length === 0) {
  burgerRemove();
 }

 if (beerArr.length === 0) {
  beerRemove();
 }

 if (pizzaArr.length === 0) {
  pizzaRemove();
 }

 if (totalPrice.length > 0) {
  completeOrderBtn.addEventListener("click", completeOrderControl);
 }

 handleDisplay();
 handleTotalPrice();
 render();
});

let addToOrder = []; //array for order items
let totalPrice = []; // total price
let pizzaArr = [];
let hamburgerArr = [];
let beerArr = [];

let totalPizzaPrice = [];
let totalHamburgerPrice = [];
let totalBeerPrice = [];

//control the modal pop when u click complete order btn
function completeOrderControl() {
 modal.classList.remove("hidden");
 completeOrderBtn.addEventListener("click", completeOrderControl);
}

// series of fuctions handling price decreament so the order you click remove wont matter, each function finds the price (12, or 14) and on click at the top removes that price only if it exists regarless of where in the array it is.
function pizzaPriceDecrement() {
 const index = totalPrice.indexOf(14);
 if (index > -1) {
  totalPrice.splice(index, 1);
 }
}

function beerPriceDecrement() {
 const index = totalPrice.indexOf(12);
 if (index > -1) {
  totalPrice.splice(index, 1);
 }
 console.log(totalPrice);
}

function hamburgerPriceDecrement() {
 const index = totalPrice.indexOf(12);
 if (index > -1) {
  totalPrice.splice(index, 1);
 }
 console.log(totalPrice);
}

// a series of functions that return the individual menu items with the hidden class to remove them from the pane when there is no arrays

//to be honest below i am not sure if adding the querySelector is wise in the condition. i only did it because it makes sense, right? i need it to be TRUE on the page, that means what i think it means, right? //thinking-face.

function pizzaRemove() {
 if (pizzaArr.length === 0 && document.querySelector("[data-item='0']")) {
  document.querySelector("[data-item='0']").classList.add("hidden");
 }
}

function burgerRemove() {
 if (hamburgerArr.length === 0 && document.querySelector("[data-item='1']")) {
  document.querySelector("[data-item='1']").classList.add("hidden");
 }
}

function beerRemove() {
 if (beerArr.length === 0 && document.querySelector("[data-item='2']")) {
  document.querySelector("[data-item='2']").classList.add("hidden");
 }
}
// end of remove items when arr empty functions --- these are not working properly actually fix them. // these have been fixed and no longer sho the error on load.

//your order display based on if there is anything in the cart it works but it needs to be changed, its so much and i get the feeling its badly written :/ the ibuprofen and lack of water in the last few hours is making my already mushy thinking worse :/ will think more when pain subsides.
function handleDisplay() {
 if (totalPrice.length > 0) {
  document.querySelector(".complete-order-btn").classList.remove("hidden");
  document.querySelector(".order-title").classList.remove("hidden");
  document.querySelector(".finalPayMenuBox").classList.remove("hidden");
 } else if (totalPrice.length === 0) {
  document.querySelector(".complete-order-btn").classList.add("hidden");
  document.querySelector(".order-title").classList.add("hidden");
  document.querySelector(".finalPayMenuBox").classList.add("hidden");
 }
}

function pizzaPriceTally() {
 const pizzas = totalPizzaPrice.reduce((prev, current) => {
  return prev + current;
 }, 0);
 return `$` + pizzas;
}

function hamburgerPriceTally() {
 const hamburgers = totalHamburgerPrice.reduce((prev, current) => {
  return prev + current;
 }, 0);

 return `$` + hamburgers;
}

function beerPriceTally() {
 const beers = totalBeerPrice.reduce((prev, current) => {
  return prev + current;
 }, 0);

 return `$` + beers;
}

// }

// adds items to the above array from the clicks we do with the add to cart btn
function handleAddClick(listing) {
 listing = Number(listing);
 addToOrder.push(menuArray[listing]);
}

// handles calculations for the total price at the bottom
function handleTotalPrice() {
 const total = totalPrice.reduce((accumulator, value) => {
  return accumulator + value;
 }, 0);

 return `$ ${total}`;
}

// this is a test function please mark all cases you add it to -- now this is the function to handle the DISPLAY at the bottom, so it only displays ONE instance of the menu item in the cart and not a continous addition to them. the incremeant is handled elsewhere. <3 this is nice, i like this one, needs to be cleaned up, but its nice. x
function filterDuplicates() {
 let uniqueArr = [];
 let singleItemHtml = "";
 addToOrder.forEach((cartItem) => {
  if (!uniqueArr.includes(cartItem)) {
   uniqueArr.push(cartItem);
  }
 });
 // okay this works, now only one shows and not multiple of the same thing.
 for (let single of uniqueArr) {
  singleItemHtml += `<div class="order-box" id="order-box" data-item="${
   single.id
  }" >
  <p class="payMenuName">${single.name}</p>
   <span class="remove-btn" id='remove-btn' data-remove="${
    single.id
   }" >remove</span>
   <span class="quantity">${
    single.id === 0
     ? pizzaArr.length
     : single.id === 1
     ? hamburgerArr.length
     : single.id === 2
     ? beerArr.length
     : ""
   }</span>
   <p class="payMenuPrice">${
    single.id === 0
     ? pizzaPriceTally()
     : single.id === 1
     ? hamburgerPriceTally()
     : single.id === 2
     ? beerPriceTally()
     : ""
   }</p>
   </div>`;
 }

 document.getElementById("orders").innerHTML = singleItemHtml;
 document.getElementById("total-order-price").innerHTML = handleTotalPrice();
}

//html on the page
function getHtml() {
 let menuHtml = "";
 menuArray.forEach((items) => {
  menuHtml += `
  <section class="menu-items">
   <img src="${items.emoji}">
   <div class="menu-list-container">
    <p class="menu-name">${items.name}</p>
    <span class="menu-ingredient">${items.ingredients}</span>
    <p class="menu-price">${items.price}</p>
   </div>
   <img class="add-btn" data-add="${items.id}" src="/add-btn.png">
  </section>`;
 });

 return menuHtml;
}

function render() {
 document.getElementById("menu-container").innerHTML = getHtml();
}
render();
handleDisplay();
