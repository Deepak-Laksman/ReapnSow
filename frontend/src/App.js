import './App.css';
import Navbar from './components/Navbar.js';
import { Routes, Route } from 'react-router-dom';
import SearchResults from './components/SearchResults.js'
import SingleQuestion from './components/SingleQuestion.js';
import AllQuestions from './components/AllQuestions';
import Login from './components/Login';
import SignUp from './components/SignUp';
import MyQuestions from './components/MyQuestions';
import EditQuestion from './components/EditQuestion';
import AskQuestion from './components/AskQuestion';

function App() {
  return (
    <div className="App">
        <Navbar />
        <Routes>
          <Route path = "/" element = {<AllQuestions />}></Route>
          <Route path = "/search" element = {<SearchResults />}></Route>
          <Route path = "/question" element = { <SingleQuestion />}></Route>
          <Route path = "/login" element = { <Login />}></Route>
          <Route path = "/register" element = { <SignUp />}></Route>
          <Route path = "/myquestions" element = {<MyQuestions />}></Route>
          <Route path = "/question/edit" element = { <EditQuestion />}></Route>
          <Route path = "/ask" element = {<AskQuestion />}></Route>
        </Routes>
    </div>
  );
}

export default App;
