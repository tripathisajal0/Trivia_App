import React, { useState } from 'react';
import './home.css';
import Secondpage from './secondpage';

const Home = () => {
  const [player1, setPlayer1] = useState('player1');
  const [player2, setPlayer2] = useState('player2');
  const [gameStarted, setStartGame] = useState(false);

  //Checking for the empty feilds
  const startGame = () => {
    let flag = true;
    if (player1.trim() === '') {
      document.getElementById('para1').innerText = "*This can't be empty*";
      document.getElementById('para1').style.color = 'red';
      document.getElementById('para1').style.paddingBottom = '20px';
      flag = false;
    } else {
      document.getElementById('para1').innerText = '';
    }

    if (player2.trim() === '') {
      document.getElementById('para2').innerText = "*This can't be empty*";
      document.getElementById('para2').style.color = 'red';
      document.getElementById('para2').style.paddingBottom = '20px';
      flag = false;
    } else {
      document.getElementById('para2').innerText = '';
    }
    if (player1.trim().toLowerCase() === player2.trim().toLowerCase()) {
      document.getElementById('para1').innerText = "*Name can't be same*";
      document.getElementById('para1').style.color = 'red';
      document.getElementById('para1').style.paddingBottom = '20px';
      document.getElementById('para2').innerText = "*Name can't be same*";
      document.getElementById('para2').style.color = 'red';
      document.getElementById('para2').style.paddingBottom = '20px';
      flag = false;
    }

    // setting startgame to true so that game could start
    if (flag) {
      setStartGame(true);
    }
  };



  

  return (
    <div className="mainDiv  container-fluid">
      <div className="cardDiv pl-md-5 text-center container">

        {gameStarted ? (              //Checking if the game is started or not 
            <Secondpage player1={player1} player2={player2}/>
        ) : (
          <>
            <h1 className="gameHeading"> Trivia Battle Game</h1>
            <div className="d-flex flex-column ">
              <label className="labelP text-center pb-2" htmlFor="player1">Player 1 </label>
              <input className="inputFeild" id="player1" placeholder="Enter Player1 Name" onChange={(e) => setPlayer1(e.target.value)} type="text" required/>
              <p id="para1"></p>
              <br />
              <label className="labelP text-center pb-2" htmlFor="player2">Player 2 </label>
              <input className="inputFeild" id="player2" type="text" placeholder="Enter Player2 Name" onChange={(e) => setPlayer2(e.target.value)} required />
              <p id="para2"></p>
              <br />
              <div className="button1">
                <button className="button" onClick={startGame}>
                  Proceed
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
