import * as fb from "firebase/database"; // sera preciso usar fb antes de cada funcao
import { dbConnect } from "./connetToFB.js";

dbConnect()
.then(db=>{//db contem a referencia ao banco
    //implemente aqui 
    const refProdutos = fb.ref(db, 'produtos');
    fb.onValue(refProdutos, (snapshot) => {
        console.log('\n=== Dados atualizados ===');
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log('Nenhum dado disponível');
        }
    }, (error) => {
        console.error('Erro ao monitorar dados:', error);
    });
}).catch(err=>console.log(err))