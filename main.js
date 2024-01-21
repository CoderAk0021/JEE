let chapterContainer = document.querySelectorAll(".chapter-container")
let maths = document.querySelector(".maths")
let physics = document.querySelector(".physics")
let chemistry = document.querySelector(".chemistry")
let subjectHead = document.querySelector("#subject-head")
let modal = document.querySelector("#message")
let numberOfChapterCom = document.querySelector(".number")




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

function changeIndex(i){
  subIndex = i
  if(i == 0)
  {
    subjectHead.innerHTML="Maths"
    maths.style.display = "flex"
    physics.style.display = "none"
    chemistry.style.display = "none"
  }
  else if (i == 1)
  {
    subjectHead.innerHTML="Physics"
    maths.style.display = "none"
    physics.style.display = "flex"
    chemistry.style.display = "none"
  }
  else if (i == 2)
  {
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
    
    const link = videoLinkLine.match(/(https?:\/\/[^\s]+)/)
    links.push(link[0])
    lecName.push(topicName)
    
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
      <div class="list" onclick="copyToClipboard(${j}, '${links[j]}')">
          <span class="s-no">${k}</span>
          <span class="topic-name">${lecName[j]}</span>
         <img src="copy.png">

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
    const link= videoLinkLine.match(/(https?:\/\/[^\s]+)/)[0];
    phyLink.push(link)
    phylecName.push(topicName)
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
      <div class="list" onclick="copyToClipboard(${j}, '${phyLink[j]}')" >
          <span class="s-no">${k}</span>
          <span class="topic-name">${phylecName[j]}</span>
         <img src="copy.png">

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
      <div class="list" onclick="copyToClipboard(${j}, '${phyLink[j]}')" >
          <span class="s-no">${k}</span>
          <span class="topic-name">${chelecName[j]}</span>
         <img src="copy.png">

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