class RecintosZoo {
  analisaRecintos(animal, quantidade) {
    //animais
    const animais = [
      {
        nome: "LEAO",
        tamanho: 3,
        biomas: "savana",
        tipoAlimentacao: "carnivoro",
      },
      {
        nome: "LEOPARDO",
        tamanho: 2,
        biomas: "savana",
        tipoAlimentacao: "carnivoro",
      },
      {
        nome: "CROCODILO",
        tamanho: 3,
        biomas: "rio",
        tipoAlimentacao: "carnivoro",
      },
      {
        nome: "MACACO",
        tamanho: 1,
        biomas: "savana ou floresta",
        tipoAlimentacao: "nao-carnivoro",
      },
      {
        nome: "GAZELA",
        tamanho: 2,
        biomas: "savana",
        tipoAlimentacao: "nao-carnivoro",
      },
      {
        nome: "HIPOPOTAMO",
        tamanho: 4,
        biomas: "savana ou rio",
        tipoAlimentacao: "onivoro",
      },
    ];
    //recintos
    const recintos = [
      {
        numero: 1,
        bioma: "savana",
        tamanho: 10,
        animais: ["macaco", "macaco", "macaco"],
      },
      { numero: 2, bioma: "floresta", tamanho: 5, animais: [""] },
      { numero: 3, bioma: "savana e rio", tamanho: 7, animais: ["gazela"] },
      { numero: 4, bioma: "rio", tamanho: 8, animais: [""] },
      { numero: 5, bioma: "savana", tamanho: 9, animais: ["leão"] },
    ];
    //logicas para animais e quantidades invalidas
    if (animais[animal]) {
      return console.error("animal inválido");
    }
    if (quantidade <= 0) {
      return console.error("quantidade inválida");
    }
    const oanimal = animais.find((animal) => animal.nome);
    if (!oanimal) {
      return console.error("Animal não encontrado");
    }
    const recintosViaveis = [];

    recintos.forEach((recinto) => {
      //compatibilidade de bioma e espaço
      if (
        recinto.bioma.includes(oanimal.biomas[0]) &&
        recinto.tamanho - recinto.animais.length - quantidade - 1 >= 0
      ) {
        //compatibilidade entre espécies, etc.
        if (isRecintoViavel(recinto, animal, quantidade, animais)) {
          recintosViaveis.push({
            numero: recinto.numero,
            espaçoLivre:
              recinto.tamanho - recinto.animais.length - quantidade - 1,
            tamanhoTotal: recinto.tamanho,
          });
        }
      }
    });

    if (recintosViaveis.length === 0) {
      return { error: "Não há recinto viável" };
    }

    return recintosViaveis;
  }
}

// Verificar se todos os animais são carnívoros não
function saoTodosCarnivoros(recinto, animais) {
  return recinto.animais.every((nomeAnimal) => {
    const animal = animais.find((animal) => animal.nome === nomeAnimal);
    return animal && animal.tipoAlimentacao === "carnivoro";
  });
}

function isRecintoViavel(recinto, animal, quantidade, animais) {
  const oanimal = animais.find((a) => a.nome === animal);
  const tiposAlimentacaoNoRecinto = new Set();

  return recinto.bioma.includes(oanimal.biomas[0]) && saoTodosCarnivoros;
}

// Exemplo de uso
const resultado = new RecintosZoo().analisaRecintos("MACACO", 2);

console.log(resultado);

export { RecintosZoo as RecintosZoo };
