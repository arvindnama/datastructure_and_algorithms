
import React, { useState } from 'react';
import { bootstrapReactApp } from '../../../libs/react/bootstrap';

// custom usePrevious hook
import usePrevious from './usePrevious';
import './app.css';

export default function App() {
  // State value and setter for our example
  const [count, setCount] = useState(0);

  // Get the previous value (was passed into hook on last render)
  const prevCount = usePrevious(count);

  // Implementation of usePrevious should be such that
  // count should always be ahead of prevCount
  // 0 0
  // 1 0
  // 2 1
  // 3 2
  // ...
  return (
    <div>
      <h1>
        Now: {count}, before: {prevCount}
      </h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
bootstrapReactApp(<App />)
