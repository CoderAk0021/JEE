const urlParams = new URLSearchParams(window.location.search);
let subName = document.querySelector(".subName")
let links = [];
let lecNames = [];
let thumbnails = [];
let chaptersName = [];
let subjectToFetch;
let dppToFetch;
const subId = urlParams.get('subId');
const chapterName = urlParams.get('index');
let chapterContent;
let modal = document.querySelector("#message")

if (subId == 1) {
  subjectToFetch = 'phy_link.txt';
  subName.innerHTML="Physics"
   dppToFetch = "phy_DPP.txt"
} else if (subId == 2) {
  subjectToFetch = 'chem_link.txt';
  subName.innerHTML="Chemistry"
  dppToFetch = "chem_DPP.txt"
} else if (subId == 3) {
  subjectToFetch = 'math_link.txt';
  subName.innerHTML="Maths"
  dppToFetch = "math_DPP.txt"
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
  
  lecNames.forEach((name,index) =>{
    if(name.includes(chapterName))
    {
      let html = `<div onclick="copyToClipboard('${links[index]}')" class="lecture">
      
      <img src="${thumbnails[index]}">
      <p>${name}</p>
      </div>`
      document.querySelector(".lecture-box ").insertAdjacentHTML("beforeend",html)
      
    }
  })
}));

function fetchDpp() {
  fetch(dppToFetch).then(response => response.text().then(data => {
    let rawdata = data.split("\n\n")
    rawdata.forEach(dpp =>{
     
      let dppName = dpp.split("\n")[0]
      let dppLink = dpp.split("\n")[1]
      if(dppName.includes(chapterName))
      {
        let html = `<div class="dpp">
        <img src="icons/file.png">
        <p onclick="viewPdf('${dppLink}')">${dppName}</p>
        <a href="${dppLink}">
          <img src="icons/download.png"></a>
        </div>`
        document.querySelector(".dpp-box").insertAdjacentHTML("beforeend",html)
     
      }
    })
  }))
}
fetchDpp()
function viewPdf(url){
  window.location.href=`pdf.html?url=${url}`
}


function copyToClipboard( link) {
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
