import mongodb from 'mongodb';

let gravarPergunta: any;

class PerguntaDAO{
    static async injectDB(conn:any){
        if(gravarPergunta){
            return
        }
        try {
            gravarPergunta = await conn.db(process.env.GAME_DO_MILHAO_NS).collection("perguntas");
        } catch (e) {
            console.error(`Não foi possível estabelecer conexão com o banco de dados de perguntas: ${e}`)
        }
    };

    static async gravarPergunta(pergunta, usuario){
        console.log("🚀 ~ file: gravarPergunta.ts:18 ~ PerguntaDAO ~ gravarPergunta ~ usuario", usuario)
        console.log("🚀 ~ file: gravarPergunta.ts:18 ~ PerguntaDAO ~ gravarPergunta ~ pergunta", pergunta)
        
    }
};

export {PerguntaDAO};