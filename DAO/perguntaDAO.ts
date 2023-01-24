import mongodb, {ObjectId} from 'mongodb';

let pergunta: any;

class PerguntaDAO{
    static async injectDB(conn:any){
        if(pergunta){
            return
        }
        try {
            pergunta = await conn.db(process.env.GAME_DO_MILHAO_NS).collection("perguntas");
        } catch (e) {
            console.error(`Não foi possível estabelecer conexão com o banco de dados de perguntas: ${e}`)
        }
    };

    static async gravarPergunta(pergun: any, user: any, partida: any){

        try {
            const perguntaGravada = await pergunta.insertOne({
                user: user,
                partida: partida,
                pergun,
                user_answer: null
            });
            
            return perguntaGravada;



        } catch (error) {
            console.error(`Não foi possível gravar a pergunta ${error}`);
        }
        
    };
    
    static async checkResposta(perguntaId:any, resposta:any){
    console.log("🚀 ~ file: perguntaDAO.ts:38 ~ PerguntaDAO ~ checkResposta ~ resposta", resposta)
    console.log("🚀 ~ file: perguntaDAO.ts:38 ~ PerguntaDAO ~ checkResposta ~ perguntaId", perguntaId)


        
        try {
                      
            const perguntaAtualizada = await pergunta.findOneAndUpdate(                
                    { _id: new ObjectId(perguntaId) },
                    { $set : {user_answer: resposta}}
                );
            const respostaCorreta = perguntaAtualizada.value.pergun.correct_answer;

            if(resposta == respostaCorreta){
                return true;
            };
            
            return false;

        } catch (error) {
            console.error(`Não foi possível checar a resposta a resposta ${error}`);
        }
    };

    static async apagarTudo(){
        try {
            const apagarTudo = await pergunta.deleteMany({});
            return apagarTudo;
        } catch (error) {
            console.error(`Erro deletando partidas. Erro: ${error}`)            
        }
    };

};

export {PerguntaDAO};