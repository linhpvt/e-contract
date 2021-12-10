import SigaturePad from './components/signature-pad';
import './App.css';
import Hooks from './pages/Hooks';

function App() {
  return (
    <div>
      <h1>E-Contract application</h1>
      <SigaturePad clearOnResize={true} />
      <Hooks />
    </div>
  );
}

export default App;
