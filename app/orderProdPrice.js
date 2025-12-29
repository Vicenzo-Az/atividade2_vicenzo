import * as fb from "firebase/database"; // sera preciso usar fb antes de cada funcao
import { dbConnect } from "./connetToFB.js";

dbConnect()
.then(db=>{//db contem a referencia ao banco
    //implemente aqui
    const refProdutos = fb.ref(db, 'produtos');
    const consulta = fb.query(refProdutos, fb.orderByChild('preco'));
    
    fb.get(consulta)
        .then(snapshot => {
            if (snapshot.exists()) {
                console.log('Produtos ordenados por preço:');
                snapshot.forEach(childSnapshot => {
                    console.log(`\nChave: ${childSnapshot.key}`);
                    console.log('Dados:', childSnapshot.val());
                });
            } else {
                console.log('Nenhum dado disponível');
            }
        })
        .catch(error => {
            console.error('Erro ao consultar dados:', error);
        });
}).catch(err=>console.log(err))