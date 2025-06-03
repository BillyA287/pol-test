require('@testing-library/jest-dom');

// Mock the getEnvVar function
jest.mock('endpoint-tracker/src/context/WebsocketContext.tsx', () => ({
  ...jest.requireActual('endpoint-tracker/src/context/WebsocketContext.tsx'),
  getEnvVar: jest.fn((key, defaultValue) => {
    if (key === 'VITE_WEBSOCKET_URL') {
      return 'ws://localhost:8080';
    }
    return defaultValue;
  }),
}));