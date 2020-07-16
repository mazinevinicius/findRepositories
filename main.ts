interface apiResponse {
    id: number,
    node_id: string,
    name: string,
    private: boolean,
    owner: {
        login: string,
        id: number
    }
}

class Main {
    // Atributos da class que serão manipulados 
    private _inputElement?: HTMLInputElement
    private _buttonElement?: HTMLButtonElement
    private _listElement?: HTMLUListElement
    private _repositoryElement?: HTMLLIElement
    private _repositoryText?: Text
    private _apiResponse?: apiResponse[]

    // Método construtor por onde será inicializada a classe
    constructor() {
        this.inputElement = document.querySelector('#app input')
        this.buttonElement = document. querySelector('#app button')
        this.listElement = document.querySelector('#app ul')
    }

    // Método para buscar a informação da api do github via fetch
    // A resposta será transformada em JSON 
    // A resposta será setada no atributo apiResponse tendo o tipo da apiResponse (interface criada)
    // Se tudo ocorrer bem, será chamada o método render()
    private find() {
        this.isLoading(true)
        fetch(`https://api.github.com/users/${this.inputElement.value}/repos`)
            .then((response) => response.json())
            .then((response): apiResponse[] => this.apiResponse = response)
            .then(() => this.render())
            .catch(() => {
                alert('Usuário não encontrado!')
                this.isLoading(false)
            })
    }

    // Método render() cria os elementos html e insere valores recebidos da API
    private render() {
        this.cleanList()
        this.apiResponse.map(repo => {
            this.repositoryText = document.createTextNode(repo.name)
            this.repositoryElement = document.createElement('li')
            this.repositoryElement.appendChild(this.repositoryText)
            this.listElement.appendChild(this.repositoryElement)
        })
        this.isLoading(false)
    }

    // Método cleanList() limpa todos os resultados já existentes na lista
    private cleanList() {
        this.listElement.innerHTML = ''
    }

    // Método isLoading() é uma verificação para mudar o html durante a requisição
    private isLoading(loading: boolean) {
        loading ? this.buttonElement.innerHTML = 'Carregando...' : this.buttonElement.innerHTML = 'Buscar'
    }

    clickListener() {
        this.buttonElement.addEventListener('click', () => {
            this.find()
        })
    }


    private get inputElement(): HTMLInputElement {
        return this._inputElement
    }

    private set inputElement(inputElement: HTMLInputElement) {
        this._inputElement = inputElement
    }

    private get buttonElement(): HTMLButtonElement {
        return this._buttonElement
    }

    private set buttonElement(buttonElement: HTMLButtonElement) {
        this._buttonElement = buttonElement
    }

    private get listElement(): HTMLUListElement {
        return this._listElement
    }

    private set listElement(listElement: HTMLUListElement) {
        this._listElement = listElement
    }

    private get repositoryElement(): HTMLLIElement {
        return this._repositoryElement
    }

    private set repositoryElement(repositoryElement: HTMLLIElement) {
        this._repositoryElement = repositoryElement
    }

    private get repositoryText(): Text {
        return this._repositoryText
    }

    private set repositoryText(repositoryText: Text) {
        this._repositoryText = repositoryText
    }

    private get apiResponse(): apiResponse[] {
        return this._apiResponse
    }

    private set apiResponse(apiResponse: apiResponse[]) {
        this._apiResponse = apiResponse
    }
    
}

const main = new Main
main.clickListener()

