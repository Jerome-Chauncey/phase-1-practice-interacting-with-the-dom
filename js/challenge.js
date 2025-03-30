//get the elements

const commentForm = document.getElementById("comment-form");
const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const heart = document.getElementById("heart");
const pause = document.getElementById("pause");
const counter = document.getElementById("counter");
const submitBtn = document.getElementById("submit")

commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const commentInput = document.getElementById("comment-input").value;

  displayComments(commentInput);
  commentForm.reset();
});

function displayComments(commentInput) {
  const commentlist = document.getElementById("list");
  let li = document.createElement("li");
  li.innerHTML = `<strong>${commentInput}</strong>`;
  commentlist.appendChild(li);
}

//counter state
let counterCount = 0;
let timer;
let likes = {};
let isPaused = false;

function initializeApp() {
  startTimer();
  minusPlusLikePauseEventListeners();
}

function startTimer() {
  timer = setInterval(() => {
    if (!isPaused) {
      counterCount++;
      counter.textContent = counterCount;
    }
  }, 1000);
}

function minusPlusLikePauseEventListeners() {
  minus.addEventListener("click", decrementCounter);
  plus.addEventListener("click", incrementCounter);
  heart.addEventListener("click", addLike);
  pause.addEventListener("click", pauseCounter);
}

//increment & decrement counter manually
function incrementCounter() {
  counterCount++;
  counter.textContent = counterCount;
}
function decrementCounter() {
  counterCount--;
  counter.textContent = counterCount;
}

//add a like for current counter value

function addLike() {
  if (likes[counterCount]) {
    likes[counterCount]++;
  } else {
    likes[counterCount] = 1;
  }
  updateLikesDisplay();
}

//update the likes display

function updateLikesDisplay() {
  const likesList = document.getElementsByClassName("likes")[0];
  likesList.innerHTML = "";

    for(const number in likes){
        const likeItem = document.createElement("div");
        likeItem.textContent = `${number} has been liked ${likes[number]} time`;
        likesList.appendChild(likeItem);
    }
}

//toggle pause state

function pauseCounter(){
    isPaused = !isPaused;
    pause.textContent =  isPaused ? "Resume" : "Pause";
    //disable all buttons when paused
    plus.disabled = isPaused;
    minus.disabled = isPaused;
    heart.disabled = isPaused;
    submitBtn.disabled = isPaused
}



initializeApp();
