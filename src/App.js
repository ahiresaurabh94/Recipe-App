import React from 'react';
import './App.css';
import {BrowserRouter , Routes , Route} from "react-router-dom";
import Register from './components/registeration/registeration';
import LoginPage from './components/login/login'
import Recipe from './components/recipe/recipe';
import CreateRecipe from './components/create/create';
import ExpandImage from './components/expand/expand';


function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<LoginPage/>}/>
    <Route path='/register' element={<Register/>} />
    <Route path='/recipes' element={<Recipe/>} />
    <Route path="/buildRecipe" element={<CreateRecipe/>}/>
    <Route path="/expandDetail" element={<ExpandImage/>}/>
  </Routes>
  </BrowserRouter>
  );
}

export default App;