import logo from './logo.svg';
import './styles/App.css';
import Header from './SharedComponents/Header';
import Footer from './SharedComponents/Footer';
import Main from './SharedComponents/Main';

function App() {
  return (
    <div className="App">
     <Header />
     <Main />
     <Footer />
    </div>
  );
}

export default App;
