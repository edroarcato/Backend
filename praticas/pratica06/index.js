const readline = require("readline-sync");

const controlador = require("./controlador");

function menu() {
  console.log("\n=== MENU PRINCIPAL ===");
  console.log("1 - Adicionar contato");
  console.log("2 - Buscar contato");
  console.log("3 - Atualizar contato");
  console.log("4 - Remover contato");
  console.log("5 - Sair");
}

async function escolherOpcao(opcao) {
  switch (opcao) {

    case "1":
      const nomeAdicionar = readline.question("Digite o nome da tarefa: ");
      await controlador.adicionarTarefa(nomeAdicionar);
      break;

    case "2":
      const nomeBuscar = readline.question("Digite o nome da tarefa: ");
      const tarefa = await controlador.buscarTarefa(nomeBuscar);
      if (tarefa && tarefa.id) {
        console.log(`\nTarefa encontrada:`);
        console.log(`ID: ${tarefa.id}`);
        console.log(`Nome: ${tarefa.nome}`);
        console.log(`Concluida: ${tarefa.concluida ? "Sim" : "Nao"}`);
      } else {
        console.log("Tarefa não encontrada.");
      }
      break;

    case "3":
      const nomeAtualizar = readline.question("Digite o nome da tarefa: ");
      const concluidaStr = readline.question("A tarefa esta concluida? (sim/nao): ");
      const concluida = concluidaStr.toLowerCase() === "sim";
      await controlador.atualizarTarefa(nomeAtualizar, concluida);
      break;

    case "4":
      const nomeRemover = readline.question("Digite o nome da tarefa: ");
      await controlador.removerTarefa(nomeRemover);
      break;

    case "5":
      console.log("Saindo do sistema...");
      process.exit();
      break;

    default:
      console.log("Opcao invalida. Tente novamente.");
  }
}

async function main() {
  while (true) {
    menu();
    const opcao = readline.question("Escolha uma opcao: ");
    await escolherOpcao(opcao);
  }
}

main();
