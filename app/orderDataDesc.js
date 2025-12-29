import * as fb from "firebase/database"; // sera preciso usar fb antes de cada funcao
import { dbConnect } from "./connetToFB.js";

dbConnect()
.then(db=>{//db contem a referencia ao banco
    //implemente aqui
    const refProdutos = fb.ref(db, 'produtos');
    const consulta = fb.query(refProdutos, fb.orderByKey());
    
    fb.get(consulta)
        .then(snapshot => {
            if (snapshot.exists()) {
                console.log('Dados em ordem reversa:');
                const dados = snapshot.val();
                const chavesReversas = Object.keys(dados).reverse();
                const dadosReversos = {};
                chavesReversas.forEach(chave => {
                    dadosReversos[chave] = dados[chave];
                });
                console.log(dadosReversos);
            } else {
                console.log('Nenhum dado disponível');
            }
        })
        .catch(error => {
            console.error('Erro ao consultar dados:', error);
        });
}).catch(err=>console.log(err))