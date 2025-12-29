import * as fb from "firebase/database"; // sera preciso usar fb antes de cada funcao
import { dbConnect } from "./connetToFB.js";

dbConnect()
.then(db=>{  //db contem a referencia ao banco
    //implemente aqui
    const refProdutos = fb.ref(db, 'produtos');
    fb.get(refProdutos)
        .then(snapshot => {
            if (snapshot.exists()) {
                console.log('Todos os dados:');
                console.log(snapshot.val());
            } else {
                console.log('Nenhum dado disponível');
            }
        })
        .catch(error => {
            console.error('Erro ao ler dados:', error);
        });
}).catch(err=>console.log(err))