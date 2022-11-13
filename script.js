//You can edit ALL of the code here

let selectItems= document.getElementById("selectEpisode");
let span = document.getElementById("search-result"); //span for dispaly
let root = document.getElementById("root");
  
// step one
async function setup(){
  // let specificShow = root.getAttribute('showid');
  // const allEpisodes = await getAllEpisodes( specificShow );
  const allShow = getAllShows();
  makeSelectShowList( allShow );
  // makeSelectBoxForEpisode( allEpisodes );
  // makePageForEpisodes( allEpisodes); 
  makePageForShow( allShow );
  setEvent();
}

//step two: make HTML Elements in JS
function makePageForEpisodes(episodeList ) { 
  let underorderedListEl = document.createElement("ul");
  underorderedListEl.classList.add('episods-list')
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
root.innerHTML = '';
root.appendChild(underorderedListEl);
}

//step three- give search feature
let input = document.getElementById("search");
input.addEventListener("keyup",async (event) => {
  let specificShow = root.getAttribute('showid')
  const allEpisodes = await getAllEpisodes( specificShow ); // data comes form it 
  
  let keyword = event.target.value.toLowerCase(); // User type in input 
  let result = [];
  allEpisodes.forEach( x =>{ 
    let summary = x.summary.toLowerCase();
    let name    = x.name.toLowerCase(); //winter is coming 
      if( summary.indexOf( keyword ) > -1 || name.indexOf(keyword) > -1 ){
         result.push( x );
      }  
  })   
  updateEpisdesDetails(result.length ,allEpisodes.length); 
  makePageForEpisodes( result );
})

function updateEpisdesDetails( show ,total ){
  span.innerText= `Displaying ${show}/${total} Episodes`;
}

// step seven-level 400
let showSelect = document.querySelector("#showSelect");
function makeSelectShowList(showList){ 
  showList.forEach( list =>{
    let inputlist= document.createElement("option");
    inputlist.setAttribute("value" ,list.id );
    inputlist.innerText = list.name;
    showSelect.append(inputlist)
  })
}

showSelect.addEventListener("change",async event =>{
  let showList = await getShow(event.target.value);
  root.setAttribute('showid' ,event.target.value); 
  makePageForEpisodes( showList ); 
  makeSelectBoxForEpisode(showList);
})

async function getShow(show_id){
  let allEpisodes = await fetch(`https://api.tvmaze.com/shows/${show_id}/episodes`);
  return await allEpisodes.json(); 
}

// step four- episode list in select element
function makeSelectBoxForEpisode( episodeList  ){ 
  selectItems.innerHTML = '';
  episodeList.forEach(list => {
    let inputlist= document.createElement("option");  
    inputlist.setAttribute("value" ,list.id );
    inputlist.innerText = `S0${list.season}E${list.number > 9 ? list.number:"0"+ list.number} - ${list.name}`
    selectItems.append(inputlist);
  })
}

 
// step five- set roll up and down list of episodes  
selectItems.addEventListener("change",async (event) =>{  
  const allEpisodes = await getAllEpisodes( root.getAttribute('showid') );  
  console.log(event.target.value) 
  allEpisodes.forEach( nameList =>{
    if( nameList.id == event.target.value ){
      makePageForEpisodes( [nameList] ); 
    }
  })
}) 

 
//level350 /add async and wait line 8,9// update in level 500
async function getAllEpisodes(id) {  
  let allEpisodes = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
  return await allEpisodes.json(); 
} 
 
window.onload = setup;


//  level 500
 function makePageForShow( allShow ){ 
  
  let div = document.createElement("div")
  div.classList.add("show-list-con")
  let ul= document.createElement("ul")
  div.appendChild(ul);

  allShow.forEach( show => {  
    let li = document.createElement("li"); 
    let divTop= document.createElement("div")
    divTop.classList.add("top")
    li.appendChild(divTop)
    let h5= document.createElement("h5")
    h5.setAttribute('id' ,show.id)
    h5.innerText= show.name;
    divTop.appendChild(h5)
    let divBottom= document.createElement("div")
    divBottom.classList.add("bottom")
    li.appendChild(divBottom);
    let bottomleft=document.createElement("div")
    bottomleft.classList.add("left")
    divBottom.appendChild(bottomleft)
    let img = document.createElement("img")
    if( show.image ){
      img.setAttribute("src" ,show.image.medium)
    }
    img.setAttribute("alt" , show.name);
    bottomleft.appendChild(img);
    let p = document.createElement('p');
    p.innerHTML = show.summary;
    bottomleft.appendChild(p);

    let bottomRight=document.createElement("div");
    bottomRight.classList.add('right');
    divBottom.appendChild(bottomRight);
    bottomRight.appendChild( makeShowDetails('Rated:' ,show.rating.average) )
    bottomRight.appendChild( makeShowDetails('Genres:' ,show.genres.join(' | ')) )
    bottomRight.appendChild( makeShowDetails('Status:' ,show.status) )
    bottomRight.appendChild( makeShowDetails('Runtime:' ,show.runtime) )


    ul.appendChild( li );
  })  
  root.innerHTML = '';
  root.appendChild( div );
  
}


function makeShowDetails( key , value ){
  let p = document.createElement('p'); 
  let b = document.createElement('b');
  b.innerText = key ;
  p.appendChild(b);
  let span = document.createElement('span');
  span.innerText = value;
  p.appendChild(span);
  return p;
}


function setEvent(){
  let list = document.querySelectorAll('.show-list-con li h5');
  list.forEach( item => { 
    item.addEventListener('click' ,async (event)=>{ 
      let allEpisode = await getAllEpisodes(event.target.id);
      makePageForEpisodes(allEpisode); 
      handleShowSelect(false); 
      handleEpisodeSelect(true);
      handleBackButton(true);
      updateEpisdesDetails(allEpisode.length ,allEpisode.length)
      makeSelectBoxForEpisode( allEpisode );
      handleEpisodesDetails(true);
    });
  })
}

function handleShowSelect( status ){  //true //false
  document.querySelector("#showSelect").style.display = status ? "block" : "none";
  
}
function handleEpisodeSelect(status){
  document.querySelector("#selectEpisode").style.display = status ? "block" :"none";
}

function handleBackButton(status){
  document.querySelector("#back").style.display= status ? "block" :"none" ; 
}

function handleEpisodesDetails(status){
    span.style.display= status ? "block" :"none" ; 
}

document.querySelector("#back").addEventListener("click", ()=>{
  const allShow = getAllShows();
  makePageForShow( allShow );
  setEvent();
  handleShowSelect(true);
  handleEpisodeSelect(false);
  handleBackButton(false);
  handleEpisodesDetails(false);
})