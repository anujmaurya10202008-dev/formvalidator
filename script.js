let addnote = document.querySelector("#add-note");
let formcontainer = document.querySelector(".form-container");
let closeform = document.querySelector(".closeform");
let form = document.querySelector("form");
let imageInput = document.querySelector(
  'input[placeholder="https://example.com/photo.jpg"]',
);
let nameInput = document.querySelector('input[placeholder="Enter full name"]');
let townInput = document.querySelector('input[placeholder="Enter home town"]');
let purposeInput = document.querySelector(
  'input[placeholder="e.g., Quick appointment note"]',
);
let radioInput = document.querySelectorAll('input[name="category"]');
let submitBtn = document.querySelector(".submit-btn");
let stack = document.querySelector(".stack");
let up = document.querySelector("#upBtn");
let down = document.querySelector("#downBtn");

// codestarts Here

addnote.addEventListener("click", function () {
  formcontainer.style.display = "initial";
});
closeform.addEventListener("click", () => {
  formcontainer.style.display = "none";
});

function saveLocalstorage(obj) {
  if (localStorage.getItem("tasks") === null) {
    let oldTasks = [];
    oldTasks.push(obj);
    localStorage.setItem("tasks", JSON.stringify(oldTasks));
  } else {
    let oldTasks = localStorage.getItem("tasks");
    oldTasks = JSON.parse(oldTasks);
    oldTasks.push(obj);
    localStorage.setItem("tasks", JSON.stringify(oldTasks));
  }
}

form.addEventListener("submit", function (evs) {
  evs.preventDefault();

  let image = imageInput.value.trim();
  let name = nameInput.value.trim();
  let home = townInput.value.trim();
  let purpose = purposeInput.value.trim();

  // check selected radio
  let selectedCategory = false;

  radioInput.forEach(function (evt) {
    if (evt.checked) {
      selectedCategory = evt.value;
    }
  });

  // validations
  if (image === "") {
    alert("Please fill the image url");
    return;
  }

  if (name === "") {
    alert("Please fill the full name");
    return;
  }

  if (home === "") {
    alert("Please fill the hometown");
    return;
  }

  if (purpose === "") {
    alert("Please fill the purpose");
    return;
  }

  if (!selectedCategory === "") {
    alert("Please select category");
    return;
  }

  saveLocalstorage({
    image,
    name,
    home,
    purpose,
    selectedCategory,
  });

  form.reset();
  formcontainer.style.display = "none";
  showCards();
});

function showCards() {
  stack.innerHTML = "";
  let allTasks = JSON.parse(localStorage.getItem("tasks"));

  allTasks.forEach(function (task) {
    const card = document.createElement("div");
    card.classList.add("card");

    // Avatar image
    const avatar = document.createElement("img");
    avatar.src = task.image;
    avatar.alt = "profile";
    avatar.classList.add("avatar");
    card.appendChild(avatar);

    // Name
    const name = document.createElement("h2");
    name.textContent = task.name;
    card.appendChild(name);

    // Info: Home town
    const hometownInfo = document.createElement("div");
    hometownInfo.classList.add("info");

    const hometownLabel = document.createElement("span");
    hometownLabel.textContent = "Home town";
    const hometownValue = document.createElement("span");
    hometownValue.textContent = task.home;

    hometownInfo.appendChild(hometownLabel);
    hometownInfo.appendChild(hometownValue);
    card.appendChild(hometownInfo);

    // Info: Bookings
    const bookingsInfo = document.createElement("div");
    bookingsInfo.classList.add("info");

    const bookingsLabel = document.createElement("span");
    bookingsLabel.textContent = "Purpose";
    const bookingsValue = document.createElement("span");
    bookingsValue.textContent = task.purpose;

    bookingsInfo.appendChild(bookingsLabel);
    bookingsInfo.appendChild(bookingsValue);
    card.appendChild(bookingsInfo);

    // Buttons container
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    // Call button
    const callBtn = document.createElement("button");
    callBtn.classList.add("call");
    callBtn.innerHTML = '<i class="ri-phone-line"></i> Call';

    // Message button
    const msgBtn = document.createElement("button");
    msgBtn.classList.add("msg");
    msgBtn.textContent = "Message";

    // Append buttons
    buttonsDiv.appendChild(callBtn);
    buttonsDiv.appendChild(msgBtn);

    // Append buttonsDiv to card
    card.appendChild(buttonsDiv);

    // Finally, add the card to the DOM (for example, inside a container)
    stack.appendChild(card); // or any container of your choice
  });
}

function updateCard() {
  for (let i = 0; i < 3; i++) {
    card.style.zIndex = 3 - i;
    card.style.transform = `translateY(${i * 10}px)  scale(${1 - i * 0.02})`;
    card.style.opacity = `${1 - i * 0.02}`;
  }
}

up.addEventListener("click", function () {
  let lastChild = stack.lastChild;
  if (lastChild) {
    stack.insertBefore(lastChild, stack.firstElementChild);
  }
  updateCard();
});

down.addEventListener("click", function () {
  let firstChild = stack.firstChild;
  if (firstChild) {
    stack.appendChild(firstChild);
  }
  updateCard();
});
