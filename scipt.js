const items = [
    { name: "Water", category: "need" },
    { name: "Video Game", category: "want" },
    { name: "Fruits & Vegetables", category: "need" },
    { name: "Designer Shoes", category: "want" },
    { name: "Electricity", category: "need" },
    { name: "Candy", category: "want" },
    { name: "Medicine", category: "need" },
    { name: "Movie Tickets", category: "want" }
];

const itemsContainer = document.getElementById("items-container");
const needZone = document.getElementById("need");
const wantZone = document.getElementById("want");

function createDraggableItems() {
    itemsContainer.innerHTML = "";
    items.forEach(item => {
        const div = document.createElement("div");
        div.textContent = item.name;
        div.classList.add("draggable-item");
        div.draggable = true;
        div.dataset.category = item.category;
        div.addEventListener("dragstart", dragStart);
        itemsContainer.appendChild(div);
    });
}

function dragStart(event) {
    event.dataTransfer.setData("text", event.target.dataset.category);
    event.dataTransfer.setData("name", event.target.textContent);
    event.target.classList.add("dragging");
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event, category) {
    event.preventDefault();
    const draggedCategory = event.dataTransfer.getData("text");
    const itemName = event.dataTransfer.getData("name");
    
    if (draggedCategory === category) {
        alert(`Correct! ${itemName} is a ${category}.`);
    } else {
        alert(`Oops! ${itemName} does not belong in ${category}. Try again.`);
    }
    createDraggableItems();
}

needZone.addEventListener("dragover", allowDrop);
wantZone.addEventListener("dragover", allowDrop);
needZone.addEventListener("drop", event => drop(event, "need"));
wantZone.addEventListener("drop", event => drop(event, "want"));

function restartGame() {
    createDraggableItems();
}

createDraggableItems();
