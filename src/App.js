import './styles/App.css';
import Header from './SharedComponents/Header';
import Footer from './SharedComponents/Footer';
import Canvas from './SharedComponents/Canvas';
import Main from './SharedComponents/Main';

function App() {
  return (
    <div className="App">
     <Header />
     <Canvas />
     <Main />
     <Footer />
    </div>
  );
}

export default App;
