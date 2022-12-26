import fetch from 'node-fetch';

function shuffleArray(arr){
    //Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i-- ){
        //Escolhendo elemento aleatório
        const j = Math.floor(Math.random() * (i + 1));
            //Reposicionando elemento
            [arr[i],arr[j]] = [arr[j], arr[i]];
    };
    return arr;
};



function perguntas01req(): Promise {
    const urlReqTrivia = process.env.REQ_TRIVIA_01;
    return fetch(urlReqTrivia)
            .then(res => res.json())
            .then(res => res.results)
            .then(results => {
                const {correct_answer, incorrect_answers } = results[0]; 
                const arrayAnswers = [...incorrect_answers,correct_answer];
                const arrayAnswersEmbaralhado = shuffleArray(arrayAnswers);    
                results[0].answers_Embaralhado = arrayAnswersEmbaralhado;
                         
                return results[0]
            })
            .catch( e => {
                console.log(e)
                return e
            });
};

export { perguntas01req }