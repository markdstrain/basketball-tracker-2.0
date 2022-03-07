import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Navigation from  './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import Standings from './components/Standings/Standings';
import Team from './components/Team/Team';
import { getPlayers,
                getTeams,
                } from './actions/startup';
import './App.css';

function App() {

          /**get all the players */
          const dispatch = useDispatch();
          useEffect(() => {
                    dispatch(getPlayers());
                    // eslint-disable-next-line react-hooks/exhaustive-deps
          },[]);
          
          /**get all the teams */
          useEffect(() => {
                    dispatch(getTeams());
                    // eslint-disable-next-line react-hooks/exhaustive-deps
          },[]);

         
          
          
          return (
                    <div className='app-container'>
                            
                              <Navigation />
                              <Routes>
                                        <Route exact path ='/' element={<LandingPage/>} />
                                        <Route exact path="/login" element={<Login/>} />
                                        <Route exact path="/register" element={<Signup/>} />
                                        <Route exact path = "/standings" element ={<Standings/>}/>
                                        <Route exact path ="/team/:teamId" element={<Team/>}/>

                              </Routes> 
                    </div>
          );
}

export default App;
