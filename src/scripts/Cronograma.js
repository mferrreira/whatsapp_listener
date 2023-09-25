const FILE_PATH = "./src/data/cronograma.json";
const { load, save } = require("./fs_crud");
const moment = require("moment");

/*
    CRONOGRAMA: /cronograma

    Use /cronograma [get] para obter a atividade agendada para o horário atual.
    Use /cronograma [add] [dia] [horario inicial] [horario final] [atividade] para adicionar uma atividade ao cronograma.
    Use /cronograma [del] [dia] [horario inicial] para remover uma atividade do cronograma.

    Exemplos de uso:
    - /cronograma get: Retorna a atividade agendada para o horário atual.
    - /cronograma add segunda 08:00 09:00 Reunião de equipe: Adiciona uma reunião de equipe para segunda-feira, das 08:00 às 09:00.
    - /cronograma del quarta 14:30: Remove uma atividade agendada para quarta-feira às 14:30.
*/


const diasTraduzidos = {
  'segunda': "Monday",
  'terça': "Tuesday",
  'quarta': "Wednesday",
  'quinta': "Thursday",
  'sexta': "Friday",
};

class Atividade {
  constructor(horarioInicial, horarioFinal, atividade) {
    this.horarioInicial = horarioInicial;
    this.horarioFinal = horarioFinal;
    this.atividade = atividade;
    this.enviada = false;
  }
}

class Cronograma {
  allowed_ids = {
    "553891446498-1487381077@g.us": "meu_grupo",
  };

  constructor() {
    this.cronograma = load(FILE_PATH);

    this.routes = {
      'get': this.get.bind(this),
      'add': this.add.bind(this),
      'del': this.del.bind(this),
    };
  }

  get(inputs) {
    const diaAtual = moment().format("dddd");
    const horarioAtual = moment().format("HH:mm");

    if (this.cronograma.hasOwnProperty(diaAtual)) {
      const atividadesDoDia = this.cronograma[diaAtual];
      for (const atividade of atividadesDoDia)
        if (
          horarioAtual >= atividade.horarioInicial &&
          horarioAtual <= atividade.horarioFinal &&
          atividade.enviada == false
        ) {
          atividade.enviada = true;
          return atividade.atividade;
        }
    }
    return undefined;
  }

  add(input) {
    const opcao = input[1];

    if (!opcao in this.routes) return "";

    const dia = diasTraduzidos[input[2]];
    let horarioInicial = input[3];
    let horarioFinal = input[4];
    const atividade = [...input].slice(5, input.length).join(" ");

    switch (true) {
      case !opcao in this.routes:
        return "Opção inválida";

      case !dia:
        return "Dia inválido";

      case isNaN(horarioInicial) || isNaN(horarioFinal):
        return "Horário inicial ou final inválido";

      case atividade.trim() === "":
        return "Atividade vazia";

      default:
        horarioInicial = moment(input[3], "HH:mm").format("HH:mm");
        horarioFinal = moment(input[4], "HH:mm").format("HH:mm");

        const novaAtividade = new Atividade(
          horarioInicial,
          horarioFinal,
          atividade
        );

        this.cronograma[dia].push(novaAtividade);
        this.cronograma[dia].sort((a, b) => {
          let horaA = moment(a.horarioInicial, "HH:mm");
          let horaB = moment(b.horarioInicial, "HH:mm");
          return horaA.diff(horaB);
        });
        save(this.cronograma, FILE_PATH);
        return "Atividade registrada com sucesso!";
    }
  }

  del(input) {

    const dia = diasTraduzidos[input[2]];
    const horarioInicial = moment(input[3], "HH:mm").format("HH:mm");

    if (!dia) 
      return "Dia inválido!"

    const atividades = this.cronograma[dia];
    const indice = atividades.findIndex(
      (atividade) => { atividade.horarioInicial == horarioInicial }
    )

    if (indice) {
      atividades.splice(indice, 1);
      save(this.cronograma, FILE_PATH);
      return "Atividade removida com sucesso!";
    }
  }

  run(input, id) {
    if (!(id in this.allowed_ids)) return "🤨";

    const comando = input[1];

    if (this.routes[comando]) {
      return this.routes[comando](input);
    }

    return "...";
  }
}

exports.Cronograma = Cronograma;