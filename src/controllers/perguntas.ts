// import fetch from 'node-fetch';



function shuffleArray(arr:any){
    //Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i-- ){
        //Escolhendo elemento aleatório
        const j = Math.floor(Math.random() * (i + 1));
            //Reposicionando elemento
            [arr[i],arr[j]] = [arr[j], arr[i]];
    };
    return arr;
};



function perguntas01req(): any {
    const urlReqTrivia: URL = process.env.REQ_TRIVIA_01 as any;
    return fetch(urlReqTrivia)
            .then(res => res.json())
            .then(res => res[0])
            .then(results => {
                const {correctAnswer, incorrectAnswers } = results; 
                const arrayAnswers = [...incorrectAnswers,correctAnswer];
                const arrayAnswersEmbaralhado = shuffleArray(arrayAnswers);    
                results.answers_Embaralhado = arrayAnswersEmbaralhado;
                         
                return results
            })
            .catch( e => {
                console.log(e)
                return e
            });
};

export { perguntas01req }