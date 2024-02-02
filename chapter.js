const urlParams = new URLSearchParams(window.location.search);
let subName = document.querySelector(".subName")
let links = [];
let lecNames = [];
let thumbnails = [];
let chaptersName = [];
let subjectToFetch;
const resource = urlParams.get('Resources');
let chapterContent;

if (resource == 1) {
  subjectToFetch = 'phy_link.txt';
 
  subName.innerHTML="Physics"
} else if (resource == 2) {
  subjectToFetch = 'chem_link.txt';
  
  subName.innerHTML="Chemistry"
} else if (resource == 3) {
  subjectToFetch = 'math_link.txt';
  subName.innerHTML="Maths"
  
}

fetch(subjectToFetch).then(response => response.text().then(data => {
  const rawData = data.split("\n\n");
  for (let i = 0; i < rawData.length; i++) {
    const split = rawData[i].split('\n');

    const topic = split[0];
    const videoLinkLine = split[1].trim();
    const topicName = topic.split(":")[1];
    const thumbnailLinkLine = split[2];
    const thumbnailLink = thumbnailLinkLine.match(/(https?:\/\/[^\s]+)/)[0];
    const link = videoLinkLine.match(/(https?:\/\/[^\s]+)/)[0];
    links.push(link);
    lecNames.push(topicName);
    thumbnails.push(thumbnailLink);
  }

  const commonPartRegex = /^[^\d]+/;
  const processedStrings = new Set();

  for (const str of lecNames) {
    const result = str.match(commonPartRegex);
    if (result) {
      const chapterName = result[0].trim();
      if (!processedStrings.has(chapterName)) {
        processedStrings.add(chapterName);
        chaptersName.push(chapterName);
      }
    } else {
      console.log('No match found.');
    }
  }

  chaptersName.forEach((chapterName, index) => {
    let html = `
    <div onclick="chapterContent('${chapterName}',${resource})" class="chapters">
    <p class="chapName">${chapterName}</p>
    <span class="icon"><img src="/icons/right-arrow.png" width="20px"></span>
    </div>`;
    document.querySelector(".container").insertAdjacentHTML("beforeend", html);
  });

  chapterContent = function (index, subId) {
     window.location.href=`/chapterContent.html?index=${index}&subId=${subId}`
  };

}));

