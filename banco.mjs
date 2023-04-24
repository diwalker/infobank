import fetch from 'node-fetch';
import readlineSync from 'readline-sync';

const estado = 'SP'; // Definindo a variável estado

let opcao = 0;

async function getContaBancaria(opcao) {
  const response = await fetch('https://www.invertexto.com/ajax/gerar-conta-bancaria.php', {
    method: 'POST',
    body: new URLSearchParams({
      banco: opcao,
      estado: estado
    }),
  });
  
  const json_r = await response.json();
  
  if(json_r.banco == "") {
    console.log("Não foi possível gerar a conta.");
  } else {
    console.log(`\x1b[33mBANCO: ${json_r.banco}\nAGÊNCIA: ${json_r.agencia}\nCONTA: ${json_r.conta}\nCIDADE: ${json_r.cidade}\nESTADO: ${json_r.estado}\u001b[0m`);
  }
  
  process.exit(0); // Sai do programa depois de gerar a conta bancária
}

let ascii = (`

\x1b[31m ####    ##   ##  #######   #####   ######     ##     ##   ##  ###  ##
  ##     ###  ##   ##   #  ##   ##   ##  ##   ####    ###  ##   ##  ##
  ##     #### ##   ## #    ##   ##   ##  ##  ##  ##   #### ##   ## ##
  ##     ## ####   ####    ##   ##   #####   ##  ##   ## ####   ####
  ##     ##  ###   ## #    ##   ##   ##  ##  ######   ##  ###   ## ##
  ##     ##   ##   ##      ##   ##   ##  ##  ##  ##   ##   ##   ##  ##
 ####    ##   ##  ####      #####   ######   ##  ##   ##   ##  ###  ##\u001b[0m
                                    \u001b[36m+-++-++-+ +-++-++-++-++-++-++-++-+
                                      |b||y| |d||i||w||a||l||k||e||r|
                                    +-++-++-+ +-++-++-++-++-++-++-++-+ \u001b[0m
                            

`)

console.log(`${ascii}`)

async function main() {
    while (opcao != 3) {
    console.log("Selecione o banco:");
    console.log("\x1b[31m[1]\u001b[0m - Banco do Brasil");
    console.log("\x1b[31m[2]\u001b[0m - Bradesco");
    console.log("\x1b[31m[3]\u001b[0m - Caixa");
    console.log("\x1b[31m[4]\u001b[0m - Itaú");
    console.log("\x1b[31m[5]\u001b[0m - Santander");
    console.log("\x1b[31m[0]\u001b[0m - Sair");

    opcao = parseInt(readlineSync.question("Escolha: "));

    if (opcao >= 1 && opcao <= 5) {
      await getContaBancaria(opcao);
    } else if (opcao === 0) {
      console.log("Saindo...");
      process.exit(0); // Sai do programa se escolher sair
    } else {
      console.log("Opção inválida.");
    }
  }
}

main();
