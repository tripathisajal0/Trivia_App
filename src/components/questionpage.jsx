import React, { useState, useEffect } from 'react';
import "./home.css";
import CustomPopup from './winner'; // Import the CustomPopup component

export default function Questionspage({ category, player1, player2, UpdateScore1, UpdateScore2 }) {
    const [questions, setQuestions] = useState([]);
    const [curr_QuestionsIndex, setcurr_QuestionsIndex] = useState(0);
    const [currentPlayer, setCurrentPlayer] = useState(player1);
    const [selectedAnswers, setSelectedAnswers] = useState([]); 
    const [scoreUpdated, setScoreUpdated] = useState([]); 
    const [lockedAnswers, setLockedAnswers] = useState([]);
    const [showWinner, setShowWinner] = useState(false); 
    const [p1, setP1] = useState(0);
    const [p2, setP2] = useState(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await fetch(`https://opentdb.com/api.php?amount=30&category=${category}&type=multiple`);
            const data = await response.json();
            let easy = [];
            let medium = [];
            let hard = [];

            data.results.forEach(function(question) {
                let answers = []; 
                for (let i = 0; i < question.incorrect_answers.length; i++) {
                    answers.push(question.incorrect_answers[i]); 
                }
            
                
                const correctIndex = Math.floor(Math.random() * 4);
                answers.splice(correctIndex, 0, question.correct_answer);
            
                
                if (question.difficulty === 'easy') {
                    if (easy.length < 2) {
                        easy.push({
                            question: question.question,
                            correct_answer: question.correct_answer,
                            options: answers
                        });
                    }
                } else if (question.difficulty === 'medium') {
                    if (medium.length < 2) {
                        medium.push({
                            question: question.question,
                            correct_answer: question.correct_answer,
                            options: answers
                        });
                    }
                } else if (question.difficulty === 'hard') {
                    if (hard.length < 2) {
                        hard.push({
                            question: question.question,
                            correct_answer: question.correct_answer,
                            options: answers
                        });
                    }
                }
            });
            

            setQuestions([...easy, ...medium, ...hard]);
            setSelectedAnswers(Array(6).fill("")); 
            setScoreUpdated(Array(6).fill(false));
            setLockedAnswers(Array(6).fill(false)); 
        };

        fetchQuestions();
    }, [category]);

    if (questions.length === 0) {
        return <h1>Loading...</h1>;
    }

    const curr_Questions = questions[curr_QuestionsIndex];

    const answerSelection = (answer) => {
        if (!lockedAnswers[curr_QuestionsIndex]) { 
            const updatedAnswers = [...selectedAnswers];
            updatedAnswers[curr_QuestionsIndex] = answer; 
            setSelectedAnswers(updatedAnswers);

            const updatedLockStatus = [...lockedAnswers];
            updatedLockStatus[curr_QuestionsIndex] = true; 
            setLockedAnswers(updatedLockStatus);
        }
    };

    const getAnswerClass = (answer) => {
        const correctAnswer = curr_Questions.correct_answer;
        const selectedAnswer = selectedAnswers[curr_QuestionsIndex];

        if (lockedAnswers[curr_QuestionsIndex]) {
            if (answer === correctAnswer) {
                return 'text-success'; 
            } else if (answer === selectedAnswer && answer !== correctAnswer) {
                return 'text-danger'; 
            }
        }
        return ''; 
    };

    const nextButton = () => {
        const isCorrect = selectedAnswers[curr_QuestionsIndex] === curr_Questions.correct_answer;



        if(curr_QuestionsIndex === 5) {
            if (selectedAnswers[curr_QuestionsIndex] === "") {
                document.getElementById('reminder').innerHTML = "Please select an answer then\n Select another category to continue or 'Next' button to see the winner";
                return;
            }
            
                document.getElementById('reminder').innerHTML = "Select another category to continue or 'Next' button to see the winner";
            
        }
        else if(selectedAnswers[curr_QuestionsIndex] === "") {
            document.getElementById('reminder').innerHTML = "Select an answer";
            return;
        }
        else {
            document.getElementById('reminder').innerHTML = "";
        }       


        if (isCorrect && !scoreUpdated[curr_QuestionsIndex]) {
            if (currentPlayer === player1) {
                UpdateScore1((prevScore) => prevScore + 1);
                setP1(prev => prev + 1);
            } else {
                UpdateScore2((prevScore) => prevScore + 1);
                setP2(prev => prev + 1);
            }

            const updatedScoreStatus = [...scoreUpdated];
            updatedScoreStatus[curr_QuestionsIndex] = true; 
            setScoreUpdated(updatedScoreStatus);
        }

        if (curr_QuestionsIndex === 5) {
            setShowWinner(true); 
            setSelectedAnswers(Array(6).fill("")); 
            setScoreUpdated(Array(6).fill(false));
            setLockedAnswers(Array(6).fill(false)); 
        } else {
            setcurr_QuestionsIndex(curr_QuestionsIndex + 1);
            setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
        }
    };

    const previousButton = () => {
        if (curr_QuestionsIndex > 0) {
            setcurr_QuestionsIndex(curr_QuestionsIndex - 1);
            setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
        }
    };

    const PopUpCard = () => {
        setShowWinner(false); // Close the popup when "Close" button is clicked
        UpdateScore1(0);
        UpdateScore2(0);
        setP1(0);
        setP2(0);
    };

    return (
        <>
            {showWinner ? (
                <CustomPopup score1={p1} score2={p2} onClose={PopUpCard}/> 
            ) : (
                <div className="quizContainer card">
                    <div className='card-header'>
                        <h4>{currentPlayer}'s Turn</h4>
                    </div>
                    <hr />
                    <div className='card-body'>
                        <h5 className="question">Q). {curr_Questions.question}</h5>
                        <hr />
                        <div className="options row mx-2">
                            {curr_Questions.options.map((answer, index) => (
                                <div className={`option col-md-6 mb-3 text-start ${getAnswerClass(answer)}`} key={index}>
                                    <input
                                        type="radio"
                                        name="option"
                                        id={`option${index}`}
                                        checked={selectedAnswers[curr_QuestionsIndex] === answer} 
                                        onChange={() => answerSelection(answer)} 
                                        disabled={lockedAnswers[curr_QuestionsIndex]} 
                                    />
                                    <label htmlFor={`option${index}`} className="ml-2">
                                        {answer}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <hr />
                        <p>{curr_QuestionsIndex + 1}/6</p>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '10px'
                        }}>
                            <button className='buttonControl1' onClick={previousButton}>Previous</button>
                            <button className='buttonControl2' onClick={nextButton}>Next</button>
                        </div>
                        <hr />
                        <p id='reminder'></p>
                    </div>
                </div>
            )}
        </>
    );
}
