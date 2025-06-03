import { render, act, waitFor } from '@testing-library/react';
import useWebSocket from '../../../src/hooks/useWebsocket';
import { Server } from 'mock-socket';

const WS_URL = 'ws://localhost:8080';

// Test component to use the hook
const TestComponent = () => {
  const { data, error, connectionState, sendMessage } = useWebSocket(WS_URL);

  return (
    <div>
      <p>Connection State: {connectionState}</p>
      <p>Data: {JSON.stringify(data)}</p>
      <p>Error: {error ?? 'null'}</p> 
      <button onClick={() => sendMessage('ping')}>Send Ping</button>
    </div>
  );
};

describe('useWebSocket', () => {
  let mockServer: Server;

  beforeEach(() => {
    mockServer = new Server(WS_URL);

    mockServer.on('connection', (socket) => {
      socket.on('message', (message) => {
       
        console.log(`Mock Server Received message: ${message}`);
      });
    });
  });

  afterEach(() => {
    mockServer.stop();
  });

  it('should connect to the WebSocket server and update connection state', async () => {
    const { getByText } = render(<TestComponent />);

    await waitFor(() =>
      expect(getByText('Connection State: connected')).toBeInTheDocument()
    );

    expect(getByText('Data: []')).toBeInTheDocument();
    expect(getByText('Error: null')).toBeInTheDocument();
  });

  it('should send a message without expecting a response', async () => {
    const { getByText } = render(<TestComponent />);

    await waitFor(() =>
      expect(getByText('Connection State: connected')).toBeInTheDocument()
    );

    await act(async () => {
      getByText('Send Ping').click();
    });

    expect(getByText('Data: []')).toBeInTheDocument();
  });

  it('should handle WebSocket errors', async () => {
    const { getByText } = render(<TestComponent />);

    act(() => {
      mockServer.simulate('error');
    });

    await waitFor(() =>
      expect(getByText('Connection State: error')).toBeInTheDocument()
    );

    expect(getByText('Error: error')).toBeInTheDocument();
  });

  it('should attempt to reconnect after disconnection', async () => {
    const { getByText } = render(<TestComponent />);

    await waitFor(() =>
      expect(getByText('Connection State: connected')).toBeInTheDocument()
    );

    act(() => {
      mockServer.close(); // simulate temporary disconnection
    });

    await waitFor(() =>
      expect(getByText('Connection State: disconnected')).toBeInTheDocument()
    );

    await waitFor(() =>
      expect(getByText('Connection State: connecting')).toBeInTheDocument()
    , { timeout: 10000 });
  }, 15000);


});