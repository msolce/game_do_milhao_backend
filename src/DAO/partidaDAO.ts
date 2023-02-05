import mongodb, { ObjectId } from 'mongodb';

let partida: any;

class PartidaDAO {
    static async injectDB(conn:any){
        if (partida){
            return
        }
        try {
            partida = await conn.db(process.env.GAME_DO_MILHAO_NS).collection("partida");
        } catch (e) {
            console.error(`Não foi possível estabelecer conexão com o banco de dados de partidas ${e}`)
        }
    };

    static async novaPartida(user: any) {
        try {
            const novaPartida = await partida.insertOne({
                user: user,
                isFinished: false,
                pula:[true, true, true],
                fase: 1,
                totalRespondidas: 0,
                msg: null
            });
            
            return novaPartida;
        } catch (error) {  
            console.error(`Erro criando nova partida. Erro: ${error}`)
        }
        
    };
    
    static async getPartida(id: any){
        try {
            const dadosPartida = await partida.findOne(id);
           
           

            return dadosPartida;
        } catch (error) {
            console.error(`Erro recuperando partida. Erro: ${error}`)            
        }
    };
    
    static async respostaCerta(partidaId:any){
        try {
            const atualizaPartida = await partida.findOneAndUpdate(
                {_id: new ObjectId(partidaId)},
                {$inc: { totalRespondidas: 1}},
                {returnDocument:'after'}
            );
            return atualizaPartida;

        } catch (error) {
            console.error(`Erro atualizando partida. Erro: ${error}`)            
        };
    };
    
    static async respostaErrada(partidaId:any){
        try {
            const partidaAtualizada = await partida.findOneAndUpdate(
                {_id: new ObjectId(partidaId)},
                {$set: { 
                    isFinished: true,
                    msg:"Partida Finalizada"
                }},
                {returnDocument:'after'}
            );

            // const partidaFinalizada = await partida.findOne({_id: new ObjectId(partidaId)});
    
            return partidaAtualizada.value ;
    
        } catch (error) {
            console.error(`Erro atualizando partida. Erro: ${error}`)            
        };

    }
    
    static async apagarTudo(){
        try {
            const apagarTudo = await partida.deleteMany({});
            return apagarTudo;
        } catch (error) {
            console.error(`Erro deletando partidas. Erro: ${error}`)            
        }
    };
};

export { PartidaDAO };