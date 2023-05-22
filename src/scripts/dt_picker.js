const FILE_NAME = './src/data/dt_picker.json';
const { save, load } = require('./fs_crud');

/*

DATE PICKER: /date

Chame /date [com || sem] para retornar uma ideia de date com ou sem dinheiro
Chame /date [add] [com || sem] [date]

*/


class DatePicker {

  allowed_ids = {
    "553892016917@c.us": "Flávia",
    "553891446498-1487381077@g.us": 'meu grupo'
  }

  constructor() {
    this.dates = load(FILE_NAME);

    this.routes = {
      'add': this.addDate.bind(this),
      'get': this.getDates.bind(this),
    }
  }

  addDate(input) {

    const type = input[2]
    const name = input.slice(3).join(' ')

    if (type !== 'com' && type !== 'sem') {
      return 'Para adicionar, digite com ou sem a grana no segundo argumento';
    }

    this.dates[type].push(name);
    save(this.dates, FILE_NAME);

    return `${name} adicionado à lista!`;
  }

  getDates() {
    let dates = '';
    for (const key in this.dates) {
      dates += `${key}: \n\n`;

      for (const date of this.dates[key])
        dates += '\t' + date + ' \n';

    }

    return dates;
  }

  pickDate(input) {
    const type = input[1];

    if (type !== 'com' && type !== 'sem') return 'Com ou sem grana??'

    const availableDates = this.dates[type];
    const randomIndex = Math.floor(Math.random() * availableDates.length);
    const selectedDate = availableDates[randomIndex];

    return `E o date vai ser... ${selectedDate}`;
  }

  run(input, id) {
    if (!(id in this.allowed_ids)) return '🤨'

    const route = input[1];
    if (!route) return 'Com ou sem grana??';

    if (!(this.routes[route])) return this.pickDate(input)

    return this.routes[route](input)
  }
}

exports.DatePicker = DatePicker;