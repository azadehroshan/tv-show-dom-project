//You can edit ALL of the code here

  let selectItems= document.getElementById("selectEpisode");
  let span= document.getElementById("search-result"); //span for dispaly
  
  
// step one
function setup() {
  const allEpisodes = getAllEpisodes();
  makeSelectBoxForEpisode( allEpisodes );
  makePageForEpisodes(allEpisodes); 
}


//step two: make HTML Elements in JS
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  let underorderedListEl = document.createElement("ul");
      episodeList.forEach(episode => {    
      let listItemEl = document.createElement("li");
      let headerDiv  = document.createElement("div");
      let spanTitle= document.createElement("span");
      spanTitle.innerText= episode.name;
      headerDiv.classList.add('top');
      headerDiv.appendChild(spanTitle);
      headerDiv.append("-")
      let spanSeries= document.createElement("span");
      spanSeries.innerText = `S0${episode.season}E${episode.number > 9 ? episode.number:"0"+ episode.number}`;
      headerDiv.appendChild(spanSeries);
      listItemEl.appendChild(headerDiv);

      let bodyDiv = document.createElement("div");
      let pic = document.createElement("img");
      pic.setAttribute("src", episode.image.medium);
      bodyDiv.appendChild(pic);
      bodyDiv.classList.add('bottom');
      let para = document.createElement("p");
      para.innerHTML=episode.summary;
      bodyDiv.append(para);
      listItemEl.appendChild(bodyDiv);
      underorderedListEl.appendChild(listItemEl);  
});
rootElem.innerHTML = '';
rootElem.appendChild(underorderedListEl);
}
//step three- give search feature
let input = document.getElementById("search");
input.addEventListener("keyup",(event)=>{
  const allEpisodes = getAllEpisodes(); // data comes form it 
  
  let keyword = event.target.value.toLowerCase(); // User type in input 
  let result = [];
  allEpisodes.forEach( x =>{ 
    let summary = x.summary.toLowerCase();
    let name    = x.name.toLowerCase(); //winter is coming 
      if( summary.indexOf( keyword ) > -1 || name.indexOf(keyword) > -1 ){
         result.push( x );
      } 
 
  })   
  span.innerText= `Displaying ${result.length}/${allEpisodes.length} Episodes`;
  
  makePageForEpisodes( result );
})
// step four- episode list in select element
function makeSelectBoxForEpisode( episodeList ){
  episodeList.forEach(list=>{
    let inputlist= document.createElement("option");
    inputlist.setAttribute("value", list.id);
    inputlist.innerText = `S0${list.season}E${list.number > 9 ? list.number:"0"+ list.number} - ${list.name}`
    selectItems.append(inputlist);
  })
}
// step five- set roll up and down list of episodes  
selectItems.addEventListener("change",()=>{

  const allEpisodes = getAllEpisodes(); 
  allEpisodes.forEach( nameList =>{
    if( nameList.id == event.target.value ){
      makePageForEpisodes( [nameList] );

    }
  })
})


window.onload = setup;

 
