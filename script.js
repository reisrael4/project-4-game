let random = document.querySelector('.random');
let questionBox = document.querySelector('.questionBox');
let questionContainer = document.querySelector('.question');
let answers = document.querySelectorAll('.answer');
let bottom = document.querySelector('.bottom');
let answersContent = [];
let correctAnswer = [];
let questions = [];
let randomUrl = 'https://opentdb.com/api.php?amount=10&type=multiple';
random.addEventListener('click', randomGame);
function randomGame(e){
    e.preventDefault();
    fetch(randomUrl)
        .then(res=>{
            return res.json()
        })
        .then(res=>{ 
            questions.push(...res.results);
            console.log(questions);
            let i=0;
            turn();
            function turn(){
                questionContainer.innerHTML = questions[i].question;
                answersContent.push(questions[i]["correct_answer"], ...questions[i]["incorrect_answers"]);
                correctAnswer.push(questions[i]["correct_answer"]);
                console.log(answersContent);
                let answersContentFinal = [];
                for(let j=0; j<answers.length; j++){
                    answersContentFinal.push(...answersContent.splice(Math.floor(Math.random()*answersContent.length)));    
                    answers[j].innerHTML = answersContentFinal[j]
                }
                console.log(answersContentFinal)
            }
            answers.forEach(answer=>{
                answer.addEventListener('click', newQuestion)
            })
            function newQuestion(e){
                e.preventDefault();
                console.log(e.target)
                if(e.target.innerHTML == correctAnswer[0]){
                    bottom.classList.add('bottomCorrect');
                    bottom.innerText = "Correct!";
                } else{
                    bottom.classList.add('bottomWrong');
                    bottom.innerHTML = 'Nice try, but the correct answer was ' + correctAnswer[0]; 
                }
                i+=1;
            //     console.log(i);
                correctAnswer = [];
                turn();
            }
            questionBox.classList.add('questionBoxOpen');
            });
}