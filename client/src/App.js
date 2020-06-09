import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Suspense fallback={(<div>Loading</div>)}>
          <Home />
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
