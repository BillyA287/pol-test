import './App.css';
import Card from './components/Card';
import ErrorMessage from './components/Error';
import { useWebSocketContext } from './context/WebsocketContext';
import { useState } from 'react';

function App() {
  const { data, error, connectionState } = useWebSocketContext();
  const [expandedCardUrl, setExpandedCardUrl] = useState<string | null>(null);

  const handleExpand = (url: string) => {
    setExpandedCardUrl((prevUrl) => (prevUrl === url ? null : url));
  };

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
            error={endpoint.error}
            isExpanded={expandedCardUrl === endpoint.url}
            onExpand={() => handleExpand(endpoint.url)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;