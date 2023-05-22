const FILE_NAME = './src/data/mv_picker.json'
const { save, load } = require('./fs_crud')

/*
Movie Picker: /filme

Chame /filme pra retirar e retornar um filme aleatório de uma lista de filmes
Chame /filme [add] [nome do filme] para adicionar um filme à lista
Chame /filme [get] para retornar todos os filmes da lista

*/


class MoviePicker {

  allowed_ids = {
    '553892016917@c.us': 'flavia',
    '553891446498-1487381077@g.us': 'meu_grupo',
  }

  constructor() {
    this.movies = load(FILE_NAME);

    this.routes = {
      'add': this.addMovie.bind(this),
      'get': this.getMovies.bind(this)
    }
  }

  addMovie(input) {
    const movieName = input.slice(2).join(' ');

    this.movies.push(movieName);
    save(this.movies, FILE_NAME);

    return `${movieName} adicionado!`;
  }

  getMovies() {
    let filmes = 'Filmes na fila: \n\n';

    for (let filme of this.movies)
      filmes += filme + '\n'

    return filmes;
  }

  pickRandomMovie() {
    const randIndex = Math.floor(Math.random() * this.movies.length)
    const res = this.movies[randIndex]

    this.movies.splice(randIndex, 1)
    save(this.movies, FILE_NAME)

    return `O filme sorteado é: ${res}`
  }

  run(input, id) {
    if (!(id in this.allowed_ids)) return '🤨'

    const route = input[1]

    if (!(route)) return this.pickRandomMovie(input)

    return this.routes[route](input)
  }
}

exports.MoviePicker = MoviePicker;