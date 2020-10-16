import React from 'react';
import useFetch from "./useFetch";

const App = () => {
  const fetchResponse = useFetch<{ message: string }>('/api/', 10000);

  return (
    <div>
      Hello World
      <div>Message: {JSON.stringify(fetchResponse)}</div>
    </div>
  );
};

export default App;
