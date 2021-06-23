import logo from './logo.svg';
import './styles/App.css';
import Header from './SharedComponents/Header';
import Footer from './SharedComponents/Footer';
import Canvas from './SharedComponents/Canvas';

function App() {
  return (
    <div className="App">
     <Header />
     <Canvas />
     <Footer />
    </div>
  );
}

export default App;
//update