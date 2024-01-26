let mathlinks = []
let mathThumbnails = []
let phylinks = []
let phyThumbnails = []
let chelinks = []
let cheThumbnails = []



function generateVideoURL(baseURL, quality) {
  // Assuming baseURL is in the format "https://example.com/hls/{quality}/main.m3u8"
  return baseURL.replace('240', quality);
}





const urlParams = new URLSearchParams(window.location.search);

// Get the value of the "file" parameter
const thumbnailIndex = urlParams.get('lecindex');
const subIndex = urlParams.get('subjIndex')


if(subIndex == 1)
{
fetch("math_link.txt").then(response => response.text().then(data =>{
   const rawData = data.split("\n\n")
   for (let i = 0; i < rawData.length; i++)
   {
     const split = rawData[i].split('\n')
     const topic = split[0]
     const videoLinkLine = split[1]
     
     const thumbnailLinkLine = split[2]
     const thumbnailLink = thumbnailLinkLine.match(/(https?:\/\/[^\s]+)/)[0]
     const link = videoLinkLine.match(/(https?:\/\/[^\s]+)/)
     mathlinks.push(link[0])
     
     mathThumbnails.push(thumbnailLink)
   }
   let baseURL = mathlinks[thumbnailIndex]
   const url240p = generateVideoURL(baseURL, '240');
   const url360p = generateVideoURL(baseURL, '360');
   const url480p = generateVideoURL(baseURL, '480');
   const url720p = generateVideoURL(baseURL, '720');
   let mainHtml = `<div class="video-container">
  <video
  id="my-video"
  class="video-js"
 
  controls
  preload="none"
  width="300"
  height="140"
  data-setup='{
  "poster":"${mathThumbnails[thumbnailIndex]}"}'
>
  <source src="${mathlinks[thumbnailIndex]}" type="application/x-mpegURL">
</video>

</div>

<div class="quality-container">
  <label for="qualitySelector">Select Quality:</label>
  <select id="qualitySelector">
    <option value="${url240p}">240p</option>
    <option value="${url360p}">360p</option>
    <option value="${url480p}">480p</option>
    <option value="${url720p}">720p</option>
  </select>
</div>`
   document.querySelector("body").innerHTML=mainHtml
     var player = videojs('my-video');
   
   
     // Quality selector dropdown
     var qualitySelector = document.getElementById('qualitySelector');
     qualitySelector.addEventListener('change', function() {
       // Change the video source based on selected quality
       player.src(qualitySelector.value);
       // Automatically play after changing quality (optional)
       player.play();
     });
   
}))
}



else if(subIndex == 0)
{
fetch("phy_link.txt").then(response => response.text().then(data =>{
   const rawData = data.split("\n\n")
   for (let i = 0; i < rawData.length; i++)
   {
     const split = rawData[i].split('\n')
     const topic = split[0]
     const videoLinkLine = split[1]
     
     const thumbnailLinkLine = split[2]
     const thumbnailLink = thumbnailLinkLine.match(/(https?:\/\/[^\s]+)/)[0]
     const link = videoLinkLine.match(/(https?:\/\/[^\s]+)/)
     phylinks.push(link[0])
     
     phyThumbnails.push(thumbnailLink)
   }
   let baseURL = phylinks[thumbnailIndex]
   const url240p = generateVideoURL(baseURL, '240');
   const url360p = generateVideoURL(baseURL, '360');
   const url480p = generateVideoURL(baseURL, '480');
   const url720p = generateVideoURL(baseURL, '720');
   
   let mainHtml = `<div class="video-container">
  <video
  id="my-video"
  class="video-js"
 
  controls
  preload="none"
  width="300"
  height="140"
  data-setup='{
  "poster":"${phyThumbnails[thumbnailIndex]}"}'
>
  <source src="${phylinks[thumbnailIndex]}" type="application/x-mpegURL">
</video>

</div>

<div class="quality-container">
  <label for="qualitySelector">Select Quality:</label>
  <select id="qualitySelector">
    <option value="${url240p}">240p</option>
    <option value="${url360p}">360p</option>
    <option value="${url480p}">480p</option>
    <option value="${url720p}">720p</option>
  </select>
</div>`
   document.querySelector("body").innerHTML=mainHtml
     var player = videojs('my-video');
   
   
     // Quality selector dropdown
     var qualitySelector = document.getElementById('qualitySelector');
     qualitySelector.addEventListener('change', function() {
       // Change the video source based on selected quality
       player.src(qualitySelector.value);
       // Automatically play after changing quality (optional)
       player.play();
     });
   
}))
}


else if(subIndex == 2)
{
fetch("chem_link.txt").then(response => response.text().then(data =>{
   const rawData = data.split("\n\n")
   for (let i = 0; i < rawData.length; i++)
   {
     const split = rawData[i].split('\n')
     const topic = split[0]
     const videoLinkLine = split[1]
     
     const thumbnailLinkLine = split[2]
     const thumbnailLink = thumbnailLinkLine.match(/(https?:\/\/[^\s]+)/)[0]
     const link = videoLinkLine.match(/(https?:\/\/[^\s]+)/)
     chelinks.push(link[0])
     
     cheThumbnails.push(thumbnailLink)
   }
   let baseURL = chelinks[thumbnailIndex]
   const url240p = generateVideoURL(baseURL, '240');
   const url360p = generateVideoURL(baseURL, '360');
   const url480p = generateVideoURL(baseURL, '480');
   const url720p = generateVideoURL(baseURL, '720');
   
   let mainHtml = `<div class="video-container">
  <video
  id="my-video"
  class="video-js"
 
  controls
  preload="none"
  width="300"
  height="140"
  data-setup='{
  "poster":"${cheThumbnails[thumbnailIndex]}"}'
>
  <source src="${chelinks[thumbnailIndex]}" type="application/x-mpegURL">
</video>

</div>

<div class="quality-container">
  <label for="qualitySelector">Select Quality:</label>
  <select id="qualitySelector">
    <option value="${url240p}">240p</option>
    <option value="${url360p}">360p</option>
    <option value="${url480p}">480p</option>
    <option value="${url720p}">720p</option>
  </select>
</div>`
   document.querySelector("body").innerHTML=mainHtml
     var player = videojs('my-video');
   
   
     // Quality selector dropdown
     var qualitySelector = document.getElementById('qualitySelector');
     qualitySelector.addEventListener('change', function() {
       // Change the video source based on selected quality
       player.src(qualitySelector.value);
       // Automatically play after changing quality (optional)
       player.play();
     });
   
}))
}
