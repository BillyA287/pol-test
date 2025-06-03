# pol-test

`pol-test` is a WebSocket-based endpoint tracker that fetches data from multiple endpoints, retries failed requests, and broadcasts the results to connected WebSocket clients. This project is designed to monitor the status of various endpoints and provide real-time updates to clients.

## Features

- Fetches data from multiple endpoints concurrently.
- Implements retry logic for failed requests.
- Broadcasts results to connected WebSocket clients.
- Handles errors gracefully and provides detailed logs.
- Designed for real-time monitoring of endpoint statuses.
- Includes unit tests for the custom hooks.
- Future plans to add integration tests for end-to-end functionality.

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd pol-test
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Usage

### Start the Server

1. Run the WebSocket server:
   ```bash
   npm run dev
   ```

2. The server will start on `ws://localhost:8080`.

3. Logs will display the status of endpoint requests and WebSocket connections.

---

### Client Integration

1. Connect a WebSocket client to `ws://localhost:8080`.
2. The server will broadcast the latest endpoint data to all connected clients.

---

## Project Structure

```
pol-test/
├── server/
│   ├── index.ts          # WebSocket server and data fetching logic
├── src/
│   ├── components/
│   │   ├── Card.tsx      # Card component for displaying endpoint data
│   │   ├── Card.css      # Styles for the Card component
│   ├── App.tsx           # Main React application
│   ├── App.css           # Styles for the application
├── shared-types/
│   ├── types.ts          # Shared TypeScript types
├── __tests__/
│   ├── unit/
│   │   ├── hooks/
│   │   │   ├── useWebsocket.test.tsx # Unit tests for the WebSocket hook
│   ├── integration/      # (Planned) Integration tests for end-to-end functionality
├── README.md             # Project documentation
├── package.json          # Project dependencies and scripts
```

---

## Testing

### Unit Tests

- Unit tests have been written for the custom hooks, such as `useWebSocket`, to ensure their functionality is robust and reliable.

### Integration Tests (Planned)

- Integration tests will be added in the future to verify the interaction between the client and server, ensuring end-to-end functionality.

### Run Tests

1. Run the test suite:
   ```bash
   npm test
   ```

---

## Logs

The server logs provide detailed information about:

- Retry attempts for failed requests.
- Errors encountered during data fetching.
- WebSocket client connections and disconnections.

---

## Future Plans

- Add integration tests to verify the interaction between the client and server.
- Enhance the UI for better user experience.
- Add more robust error handling and retry mechanisms.