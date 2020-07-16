var Main = /** @class */ (function () {
    // Método construtor por onde será inicializada a classe
    function Main() {
        this.inputElement = document.querySelector('#app input');
        this.buttonElement = document.querySelector('#app button');
        this.listElement = document.querySelector('#app ul');
    }
    // Método para buscar a informação da api do github via fetch
    // A resposta será transformada em JSON 
    // A resposta será setada no atributo apiResponse tendo o tipo da apiResponse (interface criada)
    // Se tudo ocorrer bem, será chamada o método render()
    Main.prototype.find = function () {
        var _this = this;
        this.isLoading(true);
        fetch("https://api.github.com/users/" + this.inputElement.value + "/repos")
            .then(function (response) { return response.json(); })
            .then(function (response) { return _this.apiResponse = response; })
            .then(function () { return _this.render(); })["catch"](function () {
            alert('Usuário não encontrado!');
            _this.isLoading(false);
        });
    };
    // Método render() cria os elementos html e insere valores recebidos da API
    Main.prototype.render = function () {
        var _this = this;
        this.cleanList();
        this.apiResponse.map(function (repo) {
            _this.repositoryText = document.createTextNode(repo.name);
            _this.repositoryElement = document.createElement('li');
            _this.repositoryElement.appendChild(_this.repositoryText);
            _this.listElement.appendChild(_this.repositoryElement);
        });
        this.isLoading(false);
    };
    // Método cleanList() limpa todos os resultados já existentes na lista
    Main.prototype.cleanList = function () {
        this.listElement.innerHTML = '';
    };
    // Método isLoading() é uma verificação para mudar o html durante a requisição
    Main.prototype.isLoading = function (loading) {
        loading ? this.buttonElement.innerHTML = 'Carregando...' : this.buttonElement.innerHTML = 'Buscar';
    };
    Main.prototype.clickListener = function () {
        var _this = this;
        this.buttonElement.addEventListener('click', function () {
            _this.find();
        });
    };
    Object.defineProperty(Main.prototype, "inputElement", {
        get: function () {
            return this._inputElement;
        },
        set: function (inputElement) {
            this._inputElement = inputElement;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Main.prototype, "buttonElement", {
        get: function () {
            return this._buttonElement;
        },
        set: function (buttonElement) {
            this._buttonElement = buttonElement;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Main.prototype, "listElement", {
        get: function () {
            return this._listElement;
        },
        set: function (listElement) {
            this._listElement = listElement;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Main.prototype, "repositoryElement", {
        get: function () {
            return this._repositoryElement;
        },
        set: function (repositoryElement) {
            this._repositoryElement = repositoryElement;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Main.prototype, "repositoryText", {
        get: function () {
            return this._repositoryText;
        },
        set: function (repositoryText) {
            this._repositoryText = repositoryText;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Main.prototype, "apiResponse", {
        get: function () {
            return this._apiResponse;
        },
        set: function (apiResponse) {
            this._apiResponse = apiResponse;
        },
        enumerable: false,
        configurable: true
    });
    return Main;
}());
var main = new Main;
main.clickListener();
