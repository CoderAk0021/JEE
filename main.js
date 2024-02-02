let progressPer = 0
let percentage;
let checked = 0;

function resourceFetch(subjectCode) {
  if (subjectCode == 1) {
    window.location.href="chapter.html?Resources=1"
  }
  if (subjectCode == 2) {
    window.location.href = "chapter.html?Resources=2"
  }
  if (subjectCode == 3) {
    window.location.href = "chapter.html?Resources=3"
  }
}

const physicsData = {
  total: 31,
  completed: 2,
};

const chemistryData = {
  total: 24,
  completed: 2,
};

const mathsData = {
  total: 25,
  completed: 2,
};


document.getElementById('physicsCompleted').innerText = physicsData.completed;
document.getElementById('physicsTotal').innerText = physicsData.total;
document.getElementById('mathsCompleted').innerText = mathsData.completed;
document.getElementById('mathsTotal').innerText = mathsData.total;
document.getElementById('chemistryCompleted').innerText = chemistryData.completed;
document.getElementById('chemistryTotal').innerText = chemistryData.total;




const ctx = document.getElementById('subjectChart').getContext('2d');
let goalTable = document.querySelector("table")
const subjectChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Phy', 'Che', 'Math'],
    datasets: [{
      label: 'Completed',
      data: [physicsData.completed, chemistryData.completed, mathsData.completed],
      backgroundColor: ['#A247FF', '#A247FF', '#A247FF'], // Green color for completed chapters
        }, {
      label: 'Remaining',
      data: [
                physicsData.total - physicsData.completed,
                chemistryData.total - chemistryData.completed,
                mathsData.total - mathsData.completed,
            ],
      backgroundColor: ['#fff', '#fff', '#fff'], // Yellow color for remaining chapters
        }],
  },
  options: {
    responsive: false,
    maintainAspectRatio: false,
    legend: {
      display: false,
      position: 'bottom',
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  },
});



let goals =["Revise Redox Reaction","Solve DPP Redox Reaction","Make Short notes of Mole Concept","Complete Motion in a plane","Learn and do 3 pyqs from each completed chapter"]


goals.forEach((goal, i) => {
  let html = ` 
            <tr>
             <td>${i + 1}</td>
             <td>${goal}</td>
             <td><input id=${i} onchange="increaseProgress(this)"type="checkbox"></input>
            </tr>`
  goalTable.insertAdjacentHTML("beforeend", html)
})



let date = document.querySelector(".date")
let progressBar = document.querySelector(".inside")
let progressPercentage = document.querySelector(".percentage")

const today = new Date();
const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const formattedDate = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

// Display the formatted date
date.innerHTML=formattedDate
let index = 0 // 0 -M , 1 - P, 2 - C



function increaseProgress(button)
{
   const totalGoals = goals.length
   const unitPer = 100 / totalGoals
  
   saveCheckboxStates(button)
  
  if(button.checked)
  {
    percentage += unitPer
    progressBar.style.width = percentage + "%";
    percentNumber = Math.round(percentage)
    progressPercentage.innerHTML = (percentNumber > 9) ? percentNumber + "%": "0" + percentNumber+ "%"
  }
  else{
    percentage -= unitPer
    percentNumber = Math.round(percentage)
    progressPercentage.innerHTML = (percentNumber > 9) ? percentNumber + "%": "0" + percentNumber+ "%"
    progressBar.style.width = percentage + "%";
  }
  
}

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');




function saveCheckboxStates() {
    const checkboxStates = [];

    checkboxes.forEach((checkbox) => {
        checkboxStates.push({ id: checkbox.id, checked: checkbox.checked });
    });

    localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));
    localStorage.setItem('lastModifiedDate',new Date().toDateString());
}

function retrieveCheckboxStates() {
    const storedCheckboxStates = JSON.parse(localStorage.getItem('checkboxStates'));
    const lastModifiedDate = localStorage.getItem('lastModifiedDate');


    if (lastModifiedDate !== new Date().toDateString()) {
        localStorage.clear();
        }
    else if (storedCheckboxStates) {
        checkboxes.forEach((checkbox) => {
            const storedCheckbox = storedCheckboxStates.find((item) => item.id === checkbox.id);
            
            if (storedCheckbox.checked) {
                checkbox.checked = storedCheckbox.checked;
                checked++;
            }
        });
        percentage = (checked/goals.length)* 100
        
        progressBar.style.width = percentage + "%"
        percentNumber = Math.round(percentage)
        progressPercentage.innerHTML = (percentNumber > 9) ? percentNumber + "%": "0" + percentNumber+ "%"
    }
}

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        saveCheckboxStates();
    });
});

retrieveCheckboxStates();

