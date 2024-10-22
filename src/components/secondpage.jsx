import React, { useState } from 'react'
import "./home.css"
import Questionpage from './questionpage';
export default function Secondpage({ player1, player2 }) {

    const [category, setCategory] = useState("");
    const [v, setv] = useState(true);



    //Function to update Score1
    const [score1, setScore1] = useState(0)
    function UpdateScore1(newvalue) {
        setScore1(newvalue);
    }

    //Function to update Score2
    const [score2, setScore2] = useState(0)
    function UpdateScore2(newvalue) {
        setScore2(newvalue);
    }
   

    //Hiding start button when questions appear
    const [isVisible, setIsVisible] = useState(true);


    //used Valid for conditional rendering 
    const [valid, setValid] = useState(false)
    const startGame1 = () => {
        setIsVisible(false);
        setValid(true);
    };

    return (
        <>
            {/* <div class="p-3 vsCard" >
                <div class="text-center"><h2 class=" te ts">{player1.toLocaleUpperCase()}</h2></div>
                <div class="text-center"><h1 class="te">VS</h1></div>
                <div class="text-center"><h2 class="te ts">{player2.toLocaleUpperCase()}</h2></div>
            </div> */}

            <div className="container">
                <div className="row scoreCard p-3 text-center">

                    <div className="scoreCard col-md-4 p-0 card mb-4">
                        <div className='bg-primary card '>
                            <h4 className="text-white">{player1.toLocaleUpperCase()}</h4>
                        </div>
                        <div className="p-2 ">
                            <h4><span className="text-danger">Score : </span>{score1}</h4>
                        </div>
                    </div>

                    <div className="scoreCard  col-md-4 p-0 card mb-4  ">
                        <div className='bg-primary card'>
                            <h4 className="text-white">{player2.toLocaleUpperCase()}</h4>
                        </div>
                        <div className="p-2">
                            <h4 className="text-success" ><span className="text-danger">Score : </span>{score2}</h4>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row d-flex justify-content-center">
                <div className="col-md-9">
                    <div className="card tex-center mb-2">
                        <div className="card-header bg-warning text-white">
                            <h4 className="text-white">Select a Category</h4>
                        </div>
                        <div className="card-body">
                            <select className="form-select" onChange={(e) => {setCategory(e.target.value);setv(false);}}>
                                <option value={null}>Any Category</option>
                                <option value={9}>General Knowledge</option>
                                <option value={10}>Entertainment: Books</option>
                                <option value={11}>Entertainment: Film</option>
                                <option value={12}>Entertainment: Music</option>
                                <option value={13}>Entertainment: Musicals & Theatres</option>
                                <option value={14}>Entertainment: Television</option>
                                <option value={15}>Entertainment: Video Games</option>
                                <option value={16}>Entertainment: Board Games</option>
                                <option value={17}>Science: Nature</option>
                                <option value={18}>Science: Computers</option>
                                <option value={19}>Science: Mathematics</option>
                                <option value={20}>Mythology</option>
                                <option value={21}>Sports</option>
                                <option value={22}>Geography</option>
                                <option value={23}>History</option>
                                <option value={24}>Politics</option>
                                <option value={25}>Art</option>
                                <option value={26}>Celebrities</option>
                                <option value={27}>Animals</option>
                                <option value={28}>Vehicles</option>
                                <option value={29}>Entertainment: Comics</option>
                                <option value={30}>Science: Gadgets</option>
                                <option value={31}>Entertainment: Japanese Anime & Manga</option>
                                <option value={32}>Entertainment: Cartoon & Animations</option>
                            </select>


                        </div>

                    </div>
                    {valid ? (
                        <Questionpage v={v} setv = {setv} setCategory={setCategory} category={category} UpdateScore1={UpdateScore1} UpdateScore2={UpdateScore2} player1={player1} player2={player2} />
                    ) : (
                        <> </>
                    )}
                </div>
            </div>
            <div className="button1 pt-3" style={{ display: isVisible ? 'block' : 'none' }}>
                <button className="button" onClick={startGame1}>
                    Start
                </button>
            </div>
        </>
    )
}
