document.addEventListener("DOMContentLoaded", () => {
    const addTaskButton = document.getElementById("addTaskButton");
    const taskNameInput = document.getElementById("taskName");
    const taskList = document.getElementById("taskList");
    const pointsCounter = document.getElementById("points");
    const clearButton = document.querySelector(".clearTask");
  
    const box = document.querySelector('.box');
    const customize = document.querySelector('.customize');
    const closeButton = document.querySelector('.closeButton');
    const randomButton = document.querySelector('.randomColor'); 
    let points = 0;
  
    addTaskButton.addEventListener("click", () => {
        const taskName = taskNameInput.value.trim();
        if (taskName !== "") {
            addTask(taskName);
            taskNameInput.value = "";
        }
    });
  
    document.addEventListener('keydown', function(event) {
      if(event.key === 'Enter') {
        addTaskButton.click();
      }
    });

    clearButton.addEventListener("click", () => {
        taskList.innerHTML = "";
    });
  
    customize.onclick = function(){
      box.classList.add('box_active');
    }
  
    closeButton.onclick = function(){
      box.classList.remove('box_active');
    }
  
    randomButton.onclick = function() {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      
      document.body.style.backgroundColor = randomColor;
    }
  
    const addTask = (taskName) => {
        const listItem = document.createElement("li");
  
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `task-${taskList.children.length}`;
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            rewardPoints(5, listItem);
          }
        });
  
        const label = document.createElement("label");
        label.htmlFor = checkbox.id;
        label.textContent = taskName;
  
        listItem.appendChild(checkbox);
        listItem.appendChild(label);
  
        taskList.appendChild(listItem);
    };
  
    const rewardPoints = (pointsToAdd, listItem) => {
      points += pointsToAdd;
      pointsCounter.textContent = points;
  
      const pointsAnimation = document.createElement("span");
      pointsAnimation.className = "points-animation";
      pointsAnimation.textContent = `+${pointsToAdd}`;
      listItem.appendChild(pointsAnimation);
  
      setTimeout(() => {
          listItem.removeChild(pointsAnimation);
      }, 1000);
    };
  
    let isDragging = false;
    let offsetX, offsetY;
  
    box.addEventListener('mousedown', function(e) {
        isDragging = true;
        offsetX = e.clientX - box.offsetLeft;
        offsetY = e.clientY - box.offsetTop;
        box.style.transition = 'none';
    });
  
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            box.style.left = `${e.clientX - offsetX}px`;
            box.style.top = `${e.clientY - offsetY}px`;
        }
    });
  
    document.addEventListener('mouseup', function() {
        isDragging = false;
        box.style.transition = 'transform 0.2s ease';
    });
  });
  