let chapterContainer = document.querySelectorAll(".chapter-container")
let maths = document.querySelector(".maths")
let physics = document.querySelector(".physics")
let chemistry = document.querySelector(".chemistry")
let subjectHead = document.querySelector("#subject-head")
let modal = document.querySelector("#message")
let goalTable = document.querySelector("table")
let date = document.querySelector(".date")
let progressBar = document.querySelector(".inside")
let progressPercentage = document.querySelector(".percentage")
let mathsBtn = document.querySelectorAll("#subjectProgress div")[1]
let phyBtn = document.querySelectorAll("#subjectProgress div")[0]
let cheBtn = document.querySelectorAll("#subjectProgress div")[2]




phyBtn.style.backgroundColor="#A247FF"
phyBtn.style.color="#fff"


let goals =["Revise Quadratic Equation","Solve DPP Quadratic Equation","Make Short notes of Vectors","Complete Redox Reaction","Learn and do 5 pyqs from each completed chapter"]

const physicsData = {
  total: 31,
  completed: 2,
};

const chemistryData = {
  total: 24,
  completed: 1,
};

const mathsData = {
  total: 25,
  completed: 2,
};



goals.forEach((goal,i) =>{
   let html = ` 
            <tr>
             <td>${i + 1}</td>
             <td>${goal}</td>
             <td><input id=${i} onchange="increaseProgress(this)"type="checkbox"></input>
            </tr>`
   goalTable.insertAdjacentHTML("beforeend",html)
})

let lecName = []
let links = []
let chaptersName = []
let html;
let phyLink = []
let phylecName = []
let phyChaptersName = []
let subIndex = 1
let cheLink = []
let chelecName = []
let cheChaptersName = []
let progressPer = 0
let percentage 
let checked = 0
let mathThumbnails = []
let phyThumbnails = []
let cheThumbnails = []


// Get today's date
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


function changeIndex(i){
  subIndex = i
  if(i == 0)
  {
    phyBtn.style.backgroundColor = "#505050"
    phyBtn.style.color = "#878788"
    cheBtn.style.backgroundColor = "#505050"
    cheBtn.style.color = "#878788"
    mathsBtn.style.backgroundColor = "#A247FF"
    mathsBtn.style.color = "#fff"
    subjectHead.innerHTML="Maths"
    maths.style.display = "flex"
    physics.style.display = "none"
    chemistry.style.display = "none"
    
  }
  else if (i == 1)
  {
    phyBtn.style.backgroundColor = "#A247FF"
    phyBtn.style.color = "#fff"
    cheBtn.style.backgroundColor = "#505050"
    cheBtn.style.color = "#878788"
    mathsBtn.style.backgroundColor = "#505050"
    mathsBtn.style.color = "#878788"
    subjectHead.innerHTML="Physics"
    maths.style.display = "none"
    physics.style.display = "flex"
    chemistry.style.display = "none"
    
  }
  else if (i == 2)
  {
    phyBtn.style.backgroundColor = "#505050"
    phyBtn.style.color = "#878788"
    cheBtn.style.backgroundColor = "#A247FF"
    cheBtn.style.color = "#fff"
    mathsBtn.style.backgroundColor = "#505050"
    mathsBtn.style.color = "#878788"
    subjectHead.innerHTML="Chemistry"
    maths.style.display = "none"
    physics.style.display = "none"
    chemistry.style.display = "flex"
    
  }
}
fetch("math_link.txt").then(response => response.text().then(data =>{
  const rawData = data.split("\n\n")
  for(let i = 0;i < rawData.length;i++)
  {
    const split = rawData[i].split('\n')
    const topic = split[0]
    const videoLinkLine = split[1]
    const topicName = topic.split(":")[1]
    const thumbnailLinkLine = split[2]
    const thumbnailLink = thumbnailLinkLine.match(/(https?:\/\/[^\s]+)/)[0]
    const link = videoLinkLine.match(/(https?:\/\/[^\s]+)/)
    links.push(link[0])
    lecName.push(topicName)
    mathThumbnails.push(thumbnailLink)
  }
  
  //chapterName
  const commonPartRegex = /^[^\d]+/;
  const processedStrings = new Set();
  
  for (const str of lecName) {
    const result = str.match(commonPartRegex);
    if (result) {
      const chapterName = result[0].trim();
      if (!processedStrings.has(chapterName)) {
        processedStrings.add(chapterName);
         chaptersName.push(chapterName)
      }
    } else {
      console.log('No match found.');
    }
  }
  let j = 0
  for (let i = 0; i < chaptersName.length; i++) {
    let k = 1
  let chapter = document.createElement('section');
  chapter.className = 'chapter';
  chapter.style.height = "33px"
  let lecList = document.createElement('div');
  lecList.className = 'lec-list';

  const front = `
    <div class="front" onclick="down(${i})">
        <section>
             <span class="s-no">${i + 1}</span>
              <span class="chapter-name">${chaptersName[i]}</span>
         </section>
         <section class="imgIcon">
           <img src="down.png">
        </section>
    </div>`;

  chapter.insertAdjacentHTML("beforeend", front);

  while(j < lecName.length) {
    if((lecName[j].includes(chaptersName[i])))
    {
    const html = `
      <div class="list">
        <div onclick="copyToClipboard(${j}, '${links[j]}')">
          <span class="s-no">${k}</span>
          <span class="topic-name">${lecName[j]}</span>
        </div>
          <a href="player.html?lecindex=${j}&subjIndex=${1}">Watch</a>

      </div>`;
    lecList.insertAdjacentHTML("beforeend", html);
    j++
    k++
    }
    else{
      break;
    }
  }

  chapter.appendChild(lecList);
  chapterContainer[0].appendChild(chapter);
}

  
}))

function down(i) {
  const chapterElement = chapterContainer[subIndex].querySelectorAll(".chapter")[i];
  const frontImg = chapterElement.querySelectorAll(".front img")[0];
  if (chapterElement.style.height === '33px') {
    // If the height is currently '33px', change it to 'auto'
    chapterElement.style.height = "auto";
    // Rotate the image by 180 degrees
    frontImg.style.transform = 'rotate(180deg)';
  } else {
    // If the height is not '33px', change it to '33px'
    chapterElement.style.height = "33px";
    // Rotate the image back to its original state (0 degrees)
    frontImg.style.transform = 'rotate(0deg)';
  }
}

function copyToClipboard(index, link) {
  // Create a temporary textarea element
  const textarea = document.createElement('textarea');

  // Set the value of the textarea to the link
  textarea.value = link;

  // Append the textarea to the document
  document.body.appendChild(textarea);

  // Select the text in the textarea
  textarea.select();

  // Copy the selected text to the clipboard
  document.execCommand('copy');

  // Remove the temporary textarea
  document.body.removeChild(textarea);

  // Optionally, you can provide feedback to the user (e.g., display a tooltip)
  modal.classList.add('show');
  modal.innerHTML = "COPIED :)"
  // Set a timer to close the modal after 2 seconds
  setTimeout(function() {
    modal.classList.remove('show');
  }, 2000);
  
}


fetch("phy_link.txt").then(response => response.text().then(data => {
  const rawData = data.split("\n\n")
  for (let i = 0; i < rawData.length; i++)
  {
    const split = rawData[i].split('\n')
    
    const topic = split[0]
    const videoLinkLine = split[1].trim()
    const topicName = topic.split(":")[1]
    const thumbnailLinkLine = split[2]
    const thumbnailLink = thumbnailLinkLine.match(/(https?:\/\/[^\s]+)/)[0];
    const link= videoLinkLine.match(/(https?:\/\/[^\s]+)/)[0];
    phyLink.push(link)
    phylecName.push(topicName)
    phyThumbnails.push(thumbnailLink)
  }
    const commonPartRegex = /^[^\d]+/;
    const processedStrings = new Set();
  
  for (const str of phylecName) {
    const result = str.match(commonPartRegex);
    if (result) {
      const chapterName = result[0].trim();
      if (!processedStrings.has(chapterName)) {
        processedStrings.add(chapterName);
        
         phyChaptersName.push(chapterName)
      }
    } else {
      console.log('No match found.');
    }
  }
  
  // insertion
  let j = 0
  for (let i = 0; i < phyChaptersName.length; i++) {
    let k = 1
  let chapter = document.createElement('section');
  chapter.className = 'chapter';
  chapter.style.height = "33px"
  let lecList = document.createElement('div');
  lecList.className = 'lec-list';

  const front = `
    <div class="front" onclick="down(${i})">
        <section>
             <span class="s-no">${i + 1}</span>
              <span class="chapter-name">${phyChaptersName[i]}</span>
         </section>
         <section class="imgIcon">
           <img src="down.png">
        </section>
    </div>`;

  chapter.insertAdjacentHTML("beforeend", front);

  while(j < phylecName.length) {
    if((phylecName[j].includes(phyChaptersName[i])))
    {
    const html = `
      <div class="list" >
        <div onclick="copyToClipboard(${j}, '${phyLink[j]}')" >
          <span class="s-no">${k}</span>
          <span class="topic-name">${phylecName[j]}</span>
        </div>
          <a href="player.html?lecindex=${j}&subjIndex=${0}">Watch</a>

      </div>`;
    lecList.insertAdjacentHTML("beforeend", html);
    j++
    k++
    }
    else{
      break;
    }
  }

  chapter.appendChild(lecList);
  chapterContainer[1].appendChild(chapter);
}

  
}))



fetch("chem_link.txt").then(response => response.text().then(data =>{
  const rawData = data.split("\n\n")
  
  for (let i = 0; i < rawData.length; i++)
  {
    const split = rawData[i].split('\n')
    
    const topic = split[0]
    const videoLinkLine = split[1].trim()
    const thumbnailLine = split[2]
    const imgLink = thumbnailLine.match(/(https?:\/\/[^\s]+)/)[0]
    cheThumbnails.push(imgLink)
   
    const topicName = topic.split(":")[1]
    const link= videoLinkLine.match(/(https?:\/\/[^\s]+)/)[0];
    cheLink.push(link)
    chelecName.push(topicName)
  }
    const commonPartRegex = /^[^\d]+/;
    const processedStrings = new Set();
  
  for (const str of chelecName) {
    const result = str.match(commonPartRegex);
    if (result) {
      const chapterName = result[0].trim();
      if (!processedStrings.has(chapterName)) {
        processedStrings.add(chapterName);
        
         cheChaptersName.push(chapterName)
      }
    } else {
      console.log('No match found.');
    }
  }
  
  // insertion
  let j = 0
  for (let i = 0; i < cheChaptersName.length; i++) {
    let k = 1
  let chapter = document.createElement('section');
  chapter.className = 'chapter';
  chapter.style.height = "33px"
  let lecList = document.createElement('div');
  lecList.className = 'lec-list';

  const front = `
    <div class="front" onclick="down(${i})">
        <section>
             <span class="s-no">${i + 1}</span>
              <span class="chapter-name">${cheChaptersName[i]}</span>
         </section>
         <section class="imgIcon">
           <img src="down.png">
        </section>
    </div>`;

  chapter.insertAdjacentHTML("beforeend", front);

  while(j < chelecName.length) {
    if((chelecName[j].includes(cheChaptersName[i])))
    {
    const html = `
      <div class="list">
        <div onclick="copyToClipboard(${j}, '${cheLink[j]}')">
          <span class="s-no">${k}</span>
          <span class="topic-name">${chelecName[j]}</span>
        </div>
           <a href="player.html?lecindex=${j}&subjIndex=${2}">Watch</a>
      </div>`;
    lecList.insertAdjacentHTML("beforeend", html);
    j++
    k++
    }
    else{
      break;
    }
  }

  chapter.appendChild(lecList);
  chapterContainer[2].appendChild(chapter);
   
  
}
}))



// Update progress numbers
document.getElementById('physicsCompleted').innerText = physicsData.completed;
document.getElementById('physicsTotal').innerText = physicsData.total;
document.getElementById('mathsCompleted').innerText = mathsData.completed;
document.getElementById('mathsTotal').innerText = mathsData.total;
document.getElementById('chemistryCompleted').innerText = chemistryData.completed;
document.getElementById('chemistryTotal').innerText = chemistryData.total;




const ctx = document.getElementById('subjectChart').getContext('2d');

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


