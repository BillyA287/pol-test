# pol-test

`pol-test` is a WebSocket-based endpoint tracker that fetches data from multiple endpoints, retries failed requests, and broadcasts the results to connected WebSocket clients. This project is designed to monitor the status of various endpoints and provide real-time updates to clients.

## Features

- Fetches data from multiple endpoints concurrently.
- Implements retry logic for failed requests.
- Broadcasts results to connected WebSocket clients.
- Handles errors gracefully and provides detailed logs.
- Designed for real-time monitoring of endpoint statuses.

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
├── README.md             # Project documentation
├── package.json          # Project dependencies and scripts
```

---

## Testing

### Run Tests

1. Add tests for the retry logic, WebSocket server.

## Logs

The server logs provide detailed information about:

- Retry attempts for failed requests.
- Errors encountered during data fetching.
- WebSocket client connections and disconnections.

---
