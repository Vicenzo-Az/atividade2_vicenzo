import * as fb from "firebase/database"; // sera preciso usar fb antes de cada funcao
import { dbConnect } from "./connetToFB.js";

dbConnect()
.then(db=>{//db contem a referencia ao banco
    console.log(db)//mostra informacoes da conexao(pode excluir)
    //implemente aqui
    const refProdutos = fb.ref(db, 'produtos');
    
    const unsubscribe = fb.onChildChanged(refProdutos, (snapshot) => {
        console.log('\n=== Nó alterado ===');
        console.log('Chave:', snapshot.key);
        console.log('Dados:', snapshot.val());
        
        // Task 5: Interrompe o monitoramento quando o nó específico for alterado
        if (snapshot.key === '-MwSzyJMlNDToTGtPuhc') {
            console.log('\nNó -MwSzyJMlNDToTGtPuhc foi alterado. Encerrando monitoramento.');
            unsubscribe();
        }
    }, (error) => {
        console.error('Erro ao monitorar alterações:', error);
    });
}).catch(err=>console.log(err))