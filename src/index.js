let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function createCard(toy){
    const collection = document.getElementById('toy-collection');

    card = document.createElement('div');
    card.className = 'card';

    toyName = document.createElement('h2');
    toyName.textContent = toy.name;

    toyImage = document.createElement('img');
    toyImage.src = toy.image;
    toyImage.className = 'toy-avatar'

    let likesNum = toy.likes
    likes = document.createElement('p');
    likes.textContent = `${likesNum} likes`

    btn = document.createElement('button');
    btn.className = 'like-btn';
    btn.id = toy.id;
    btn.textContent = 'Like';

    btn.addEventListener('click', () => {
      likesNum = likesNum + 1;
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": likesNum,
        })
      })
      .then(res => res.json())
      .then(data => {
        const p = document.getElementById(`${data.id}`).parentNode.children[2]
        p.textContent = `${data.likes} likes`
      })
    })

    card.appendChild(toyName);
    card.appendChild(toyImage);
    card.appendChild(likes)
    card.appendChild(btn)

    collection.appendChild(card);
  };

  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(data => {
    data.forEach(toy =>{
      createCard(toy);
    })
  })

  const form = document.querySelector('form')

  form.addEventListener('submit', (e)=>{
    e.preventDefault()
    let name = document.getElementById('name').value;
    let image = document.getElementById('image').value;
    const configurationObject ={
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "image": image,
        "likes": 0
      })
    }

    fetch('http://localhost:3000/toys', configurationObject)
    .then(res => res.json())
    .then(data => {
      createCard(data)
    })
  
    form.reset()
  })
});
