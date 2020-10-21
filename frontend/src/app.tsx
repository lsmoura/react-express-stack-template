import useFetch from './useFetch';

const App = (): JSX.Element => {
  const fetchResponse = useFetch<{ message: string }>('/api/', 10000);

  return (
    <div>
      Hello World
      <div>Message: {fetchResponse.data?.message}</div>
    </div>
  );
};

export default App;
