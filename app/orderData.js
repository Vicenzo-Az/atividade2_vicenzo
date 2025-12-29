import * as fb from "firebase/database"; // sera preciso usar fb antes de cada funcao
import { dbConnect } from "./connetToFB.js";

dbConnect()
.then(db=>{//db contem a referencia ao banco
    console.log(db)//mostra informacoes da conexao(pode excluir)
    //implemente aqui
    const refProdutos = fb.ref(db, 'produtos');
    const consulta = fb.query(refProdutos, fb.orderByKey());
    
    fb.get(consulta)
        .then(snapshot => {
            if (snapshot.exists()) {
                console.log('Dados ordenados por chave:');
                console.log(snapshot.val());
            } else {
                console.log('Nenhum dado disponível');
            }
        })
        .catch(error => {
            console.error('Erro ao consultar dados:', error);
        });
}).catch(err=>console.log(err))