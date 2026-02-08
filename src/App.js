import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Header from './components/Header';
import Home from './pages/Home';
import "react-toastify/dist/ReactToastify.css"


function App() {
  return (
    <>
    <Header/>
    <Home/>
    </>
  );
}

export default App;
