import React from 'react';
import SigaturePad from './components/signature-pad';

import './App.css';

function App() {
  return (
    <div>
      <h1>E-Contract application</h1>
      <SigaturePad clearOnResize={true} />
    </div>
  );
}

export default App;
