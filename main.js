var inputElement = document.querySelector('#app input')
var buttonElement = document.querySelector('#app button')
var listElement = document.querySelector('#app ul')

function find() {
    axios.get("https://api.github.com/users/" + inputElement.value + "/repos")
        .then(function (response) {
            render(response.data)
        })
        .catch(function () {
            alert('Usuário não encontrado')
        })
}

function render (repos) {
    listElement.innerHTML = ''
    repos.map(repo =>{
        var repositoryName = repo.name
        
        var repositoryElement = document.createElement('li')
        var repositoryText = document.createTextNode(repositoryName)

        repositoryElement.appendChild(repositoryText)
        listElement.appendChild(repositoryElement)
    }) 
}


buttonElement.onclick = find

