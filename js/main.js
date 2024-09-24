var input = document.getElementById('getTask');
var listOfTasks = document.getElementById('listOfTasks');
var allBtn = document.querySelector(".links button:nth-child(1)");
var activeBtn = document.querySelector(".links button:nth-child(2)");
var completedBtn = document.querySelector(".links button:nth-child(3)");
var itemLen = document.querySelector(".details span");
var clrComp = document.querySelector(".details .clr");



if (localStorage.getItem("tasks")!=null) {
    allTasks = JSON.parse(localStorage.getItem("tasks"));
    displayAllTasks();
} else {
    allTasks = [];
}

function addTask() {
    taskName = input.value;
    if (taskName == ""){
        return;
    }
    task = {
        name:taskName,
        status: "active",
    };

    allTasks.push(task);
    console.log(allTasks);
    localStorage.setItem("tasks",JSON.stringify(allTasks));
    displayAllTasks();
    showItemSize()
    input.value = ""
}

function deleteTask(index) {
    allTasks.splice(index,1);
    displayAllTasks();
    localStorage.setItem("tasks",JSON.stringify(allTasks));
    showItemSize();
}

function displayAllTasks() {
    
    boxOfTasks = "";

    for (var i = 0 ; i < allTasks.length ; i++) {
        allBtn.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
        activeBtn.style.backgroundColor = "transparent";
        completedBtn.style.backgroundColor = "transparent";
        if (allTasks[i].status == "completed") {
            boxOfTasks += `
                <div class="col-lg-12">
                    <li>
                        <div class="side d-flex align-items-center">
                            <span onClick ="updateStatus(${i})" class="circle checked">
                                <img class="show" src="./images/icon-check.svg" alt="check icon" />
                            </span>
                            <div style="text-decoration: line-through" class="ms-3" id="taskName">${allTasks[i].name}</div>
                        </div>
                        <span onClick="deleteTask(${i})">
                            <img src="./images/icon-cross.svg" alt="cross icon" />
                        </span>
                    </li>
                </div>
            `;
        } else {
            boxOfTasks += `
            <div class="col-lg-12">
                <li>
                    <div class="side d-flex align-items-center">
                        <span onClick ="updateStatus(${i})" class="circle">
                            <img src="./images/icon-check.svg" alt="check icon" />
                        </span>
                        <div  class="ms-3" id="taskName">${allTasks[i].name}</div>
                    </div>
                    <span onClick="deleteTask(${i})">
                        <img src="./images/icon-cross.svg" alt="cross icon" />
                    </span>
                </li>
            </div>
        `;
        }
        showItemSize();
    }

    listOfTasks.innerHTML = boxOfTasks;
}

function updateStatus(index) {
    var checkInp = document.getElementsByClassName("circle")[index];
    var checkImg = document.querySelectorAll(".circle img")[index];
    checkInp.classList.toggle("checked");
    checkImg.style.display = "block"
    allTasks[index].status = "completed";
    var text = document.getElementsByClassName("taskName")[index];
    console.log(text);
    localStorage.setItem("tasks",JSON.stringify(allTasks));
    displayAllTasks();
}

function displayWithStatus(stat) {
    boxOfStatTasks = "";
    for (var i = 0 ; i < allTasks.length ; i++ ) {
        if (allTasks[i].status == stat && stat == "completed" ) {
            
            completedBtn.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            allBtn.style.backgroundColor = "transparent";
            activeBtn.style.backgroundColor = "transparent";
            boxOfStatTasks += `
            <div class="col-lg-12">
                <li>
                    <div class="side d-flex align-items-center">
                        <span onClick ="updateStatus(${i})" class="circle">
                            <img  src="./images/icon-check.svg" alt="check icon" />
                        </span>
                        <div style="text-decoration: line-through" class="ms-3 taskName">${allTasks[i].name}</div>
                    </div>
                    <span onClick="deleteTask(${i})">
                        <img src="./images/icon-cross.svg" alt="cross icon" />
                    </span>
                </li>
            </div>
        `;
        } else if (allTasks[i].status == stat && stat == "active" ) {
            activeBtn.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            allBtn.style.backgroundColor = "transparent";
            completedBtn.style.backgroundColor = "transparent";
            boxOfStatTasks += `
            <div class="col-lg-12">
                <li>
                    <div class="side d-flex align-items-center">
                        <span onClick ="updateStatus(${i})" class="circle">
                            <img src="./images/icon-check.svg" alt="check icon" />
                        </span>
                        <div class="ms-3 taskName">${allTasks[i].name}</div>
                    </div>
                    <span onClick="deleteTask(${i})">
                        <img src="./images/icon-cross.svg" alt="cross icon" />
                    </span>
                </li>
            </div>
        `;
        }
    }
    listOfTasks.innerHTML = boxOfStatTasks;
}

function clearCompleted() {
    for( var i = 0 ; i < allTasks.length ; i++) {
        if (allTasks[i].status == "completed") {
            allTasks.splice(i,1);
            console.log('clear');
            i--;
        }
        
    }
    localStorage.setItem("tasks",JSON.stringify(allTasks));
    displayAllTasks();
}

function showItemSize() {
    var len = allTasks.length;
    itemLen.innerHTML = `${len} items left`
}


