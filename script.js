//You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes); 
}
 

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  let underorderedListEl = document.createElement("ul");
      episodeList.forEach(episode => {    
      let listItemEl = document.createElement("li");
      let headerDiv  = document.createElement("div");
      let spanTitle= document.createElement("span");
      spanTitle.innerText= episode.name;
      headerDiv.appendChild(spanTitle);
      headerDiv.append("-")
      let spanSeries= document.createElement("span");
      spanSeries.innerText = `S0${episode.season}E0${episode.number}`;
      headerDiv.appendChild(spanSeries);
      listItemEl.appendChild(headerDiv);

      let bodyDiv = document.createElement("div");
      let pic = document.createElement("img");
      pic.setAttribute("src", episode.image.medium);
      bodyDiv.appendChild(pic);
      let para = document.createElement("p");
      para.innerHTML=episode.summary;
      bodyDiv.append(para);
      listItemEl.appendChild(bodyDiv);
      underorderedListEl.appendChild(listItemEl);  
});
rootElem.innerHTML = '';
rootElem.appendChild(underorderedListEl);
}

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
  let resultCount    = result.length;
  let episodestCount = allEpisodes.length;
  let p= document.getElementById("display-me").style.display = "none";

  
  makePageForEpisodes( result );
})

window.onload = setup;

 
