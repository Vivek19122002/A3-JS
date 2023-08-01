// Get references to HTML elements
const input = document.getElementById('input');
const addButton = document.getElementById('addButton');
const clearbutton = document.getElementById('clearbutton');
const count = document.getElementById('count');
const todoList = document.getElementById('todoList');


// Add event listener for button (add)
addButton.addEventListener('click', addTodo);

// Function to add a new to do item
function addTodo() 
{
    const todoText = input.value.trim();
    if (todoText !== '') 
	{
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox">
            <span>${todoText}</span>
            <button class="deleteButton">Delete</button>
        `;
        todoList.appendChild(li);
        input.value = '';
        updateRemainingCount();
    }
}

// Code to update the remaining list of activities
function updateRemainingCount() {
    const items = todoList.querySelectorAll('li:not(.checked)');
    count.textContent = items.length + ' remaining to complete ';
}

// code to add event listener to the whole todo list (event delegation)
todoList.addEventListener('click', function (event) 
{
    const target = event.target;
    if (target.tagName === 'INPUT' && target.type === 'checkbox') 
	{
        const listItem = target.parentNode;
        listItem.classList.toggle('checked');
        if (target.checked) 
		{
            todoList.appendChild(listItem);
            playDingSound();
            
        } 
		else 
		{
            todoList.insertBefore(listItem, todoList.firstChild);
            listItem.style.backgroundColor = '';
        }
        updateRemainingCount();
    } 
	else if (target.classList.contains('deleteButton')) 
	{
        const listItem = target.parentNode;
        listItem.classList.add('deleted');
        setTimeout(() => {
            listItem.remove();
            updateRemainingCount();
        }, 400);
    }
});

// Function to play the 'ding' sound
function playDingSound() 
{
    const audio = new Audio("bell.mp3"); // when chcek box is clicked bell will ring
    audio.play();
}

// event listener to clear all button
clearbutton.addEventListener('click', clearAll);

// this code will clear all the to do list given bellow 
function clearAll()
{
    todoList.innerHTML = '';
    updateRemainingCount();
}