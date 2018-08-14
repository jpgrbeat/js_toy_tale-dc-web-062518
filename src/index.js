const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyCollectionDiv = document.querySelector('#toy-collection')

document.addEventListener('DOMContentLoaded', ()=>{

  const inputName = document.querySelector('#toy-name');
  const inputImg = document.querySelector('#toy-img');
  const btn = document.querySelector('#create-toy-btn');
  toys = toyFetch();

  btn.addEventListener('click',()=>{
    let name = inputName.value;
    let img = inputImg.value;

    addNewToy(name,img)
  })
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


function toyFetch() {

  return fetch('http://localhost:3000/toys')
  .then(res=> res.json())
  .then(json=>{
    for(let i = 0; i < json.length; i++){
      let toyObj = json[i]
      render(toyObj)
    }
  })

}

function render(toyObj) {
  let toyDiv = document.createElement('div')
  let h2 = document.createElement('h2')
  let img = document.createElement('img')
  let p = document.createElement('p')
  let button = document.createElement('button')

  h2.innerHTML = toyObj.name;
  img.src = toyObj.image;
  p.innerHTML = `${toyObj.likes} Likes`
  button.innerHTML = 'Like <3'
  button.class = 'like-btn';
  button.id = `like-button-${toyObj.id}`
  button.addEventListener('click', ()=>{likesHandler(event)})


  toyDiv.className = 'card';
  img.className = 'toy-avatar'
  toyDiv.id = toyObj.id;




  toyDiv.appendChild(h2)
  toyDiv.appendChild(img)
  toyDiv.appendChild(p)
  toyDiv.appendChild(button)

  toyCollectionDiv.appendChild(toyDiv)



}

function likesHandler(event) {
  let El = event.currentTarget.parentNode;
  let id = El.id
  // debugger;
  let name = El.querySelector('h2').innerText
  let img = El.querySelector('img').src
  let likes = parseInt(El.querySelector('p').innerText.split(' ')[0]) + 1;

  updateLikes(id,name,img,likes)

}


function addNewToy(name,imgUrl) {

  fetch('http://localhost:3000/toys/',{
    "method": "POST",
    headers: {
      "Content-Type": "application/json",
    },
    "body": JSON.stringify({
      "name": name,
      "image": imgUrl,
      "likes": 0
    })
  }).then(res=> res.json())
  .then(json=> render(json))

}

function updateLikes(id,name,image,likes) {
  fetch(`http://localhost:3000/toys/${id}`, {
    "method": "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    "body": JSON.stringify({
      "name": name,
      "image": image,
      "likes": likes
    })
  }).then(res=> res.json())
    .then(json=>{
      toyElement = document.getElementById(`${id}`);
      toyElement.querySelector('h2').innerText = json.name;
      toyElement.querySelector('img').src = json.image;
      toyElement.querySelector('p').innerText = `${json.likes} Likes`
    })
}



// OR HERE!
