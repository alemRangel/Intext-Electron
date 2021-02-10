let createButton = document.querySelector('#create')
createButton.addEventListener('click', event => create(event))

const createPost = (title, text) => {
    const main = document.querySelector('#main')
    const container = document.querySelector('#createCont')
    const titleElement = document.querySelector('#title')
    const textElement = document.querySelector('#text')
    if(titleElement && textElement) {
        titleElement.remove()
        textElement.remove()
    }
    if(container.childElementCount ==! 0){
        createButton = document.createElement('button')
        createButton.id = 'create'
        createButton.innerText = 'Create post'
        createButton.addEventListener('click', event => create(event))
        container.appendChild(createButton)
    }
    fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        title: title,
        body: text,
        id: main.childElementCount + 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    })
  .then((r) => r.json())
  .then((resp) => {
    const deleteButton = document.createElement('button')
    deleteButton.addEventListener('click', event => remove(resp.id, event))
    deleteButton.innerText = 'delete'
    const updateButton = document.createElement('button')
    updateButton.addEventListener('click', event => update(resp.id, event))
    updateButton.innerText = 'update'

    const title = document.createElement('h2')
    title.innerText = resp.title
    const text = document.createElement('p')
    text.innerText = resp.body
    const div = document.createElement('div')
    div.id = resp.id
    div.appendChild(title)
    div.appendChild(text)
    div.appendChild(deleteButton)
    div.appendChild(updateButton)
    main.prepend(div)
  })
}

const create = () => {
    const input = document.querySelector('#input')
    const inputTitle = document.createElement('input')
    inputTitle.id = 'title'
    const inputText = document.createElement('input')
    inputText.id = 'text'
    if (createButton) {
        createButton.remove()
    }
    createButton = document.createElement('button')
    createButton.innerText = 'Create post'
    createButton.id = 'create'
    createButton.addEventListener('click', event => createPost(inputTitle.value, inputText.value))
    input.appendChild(inputTitle)
    input.appendChild(inputText)
    input.appendChild(createButton)
}

const remove = (id, event) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'DELETE',
    })
    event.target.parentElement.remove()
}

const update = (id, event) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
        title: 'edited title',
        body: 'edited body',
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
  .then((r) => r.json())
  .then((resp) => {
    const post = event.target.parentElement
    const titleElement = post.getElementsByTagName('h2')[0]
    const textElement = post.getElementsByTagName('p')[0]
    titleElement.innerText = resp.title
    textElement.innerText = resp.body
  })
}


const getPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(r => r.json())
    .then(posts => {
        renderPosts(posts)
    })
}

const renderPosts = (posts) => {
    const main = document.querySelector('#main')
    posts.forEach(post => {
        const deleteButton = document.createElement('button')
        deleteButton.addEventListener('click', event => remove(post.id, event))
        deleteButton.innerText = 'delete'
        const updateButton = document.createElement('button')
        updateButton.addEventListener('click', event => update(post.id, event))
        updateButton.innerText = 'update'

        const title = document.createElement('h2')
        title.innerText = post.title
        const text = document.createElement('p')
        text.innerText = post.body
        const div = document.createElement('div')
        div.id = post.id
        div.appendChild(title)
        div.appendChild(text)
        div.appendChild(deleteButton)
        div.appendChild(updateButton)
        main.appendChild(div)
    })
}

document.addEventListener('DOMContentLoaded', function() {
    getPosts()
  })
