import './App.css';
import Card from './components/Card';
import ErrorMessage from './components/Error';
import { useWebSocketContext } from './context/WebsocketContext';

function App() {
  const { data, error, connectionState } = useWebSocketContext();

  return (
    <div className="App">
      <h1>Endpoint Tracker</h1>
      <div className="connection-status">
        <span className="status-text">Connection Status: {connectionState}</span>
        <span className={`status-indicator ${connectionState}`} />
      </div>
      <ErrorMessage message={error} />
      <div className="endpoint-list">
        {data.map((endpoint) => (
          <Card
            key={endpoint.url}
            url={endpoint.url}
            status={endpoint.status}
            data={endpoint.data}
          />
        ))}
      </div>
    </div>
  );
}

export default App;