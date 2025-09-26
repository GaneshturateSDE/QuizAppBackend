function calculateScore(questions,answers){

        let score = 0;
        let correctMap={};
        questions.forEach((question) => {
            correctMap[question._id]=question.answer; 
        });
   
        for(const answer of answers){
              if(correctMap[answer.qid]===answer.aid){
                score++;
              }
        }
       
        return {score, total:questions.length};
}

export {calculateScore};