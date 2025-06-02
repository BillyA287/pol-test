import WebSocket, { WebSocketServer } from 'ws';
import axios from 'axios';
import { EndpointData, EndpointResponse } from '../src/shared-types/types'; 
const endpoints = [
  'https://data--us-east.upscope.io/status?stats=1',
  'https://data--eu-west.upscope.io/status?stats=1',
  'https://data--eu-central.upscope.io/status?stats=1',
  'https://data--us-west.upscope.io/status?stats=1',
  'https://data--sa-east.upscope.io/status?stats=1',
  'https://data--ap-southeast.upscope.io/status?stats=1',
];

const PORT = parseInt(process.env.PORT || '8080', 10);
const wss = new WebSocketServer({ port: PORT });


let cachedData: EndpointData[] = [];
let isFetching = false;

const fetchEndpointOnce = async (url: string): Promise<EndpointData> => {
  try {
    const res = await axios.get<EndpointResponse>(url, { timeout: 5000 });

    if (!res.data || typeof res.data !== 'object') {
      throw new Error('Invalid or incomplete data received from endpoint');
    }

    return { url, status: res.status, data: res.data };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Failed to fetch ${url}: ${errorMessage}`);
    return { url, error: `Failed to fetch data: ${errorMessage}` };
  }
};

const fetchData = async (): Promise<void> => {
  if (isFetching) return;
  isFetching = true;

  try {
    const results: EndpointData[] = await Promise.all(
      endpoints.map((url) => fetchEndpointOnce(url))
    );

    const allFailed = results.every((result) => result.error);
    if (allFailed) {
      console.error('All endpoints failed to fetch data.');
    }

    cachedData = results;
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(results));
      }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching data:', errorMessage);
  } finally {
    isFetching = false;
  }
};

setInterval(fetchData, 10000);

fetchData();

wss.on('connection', (ws) => {
  console.log('Client connected');

  if (cachedData.length > 0) {
    ws.send(JSON.stringify(cachedData));
  } else {
    ws.send(JSON.stringify({ error: 'No data available from endpoints' }));
  }

  ws.onerror = (err) => {
    console.error('WebSocket error:', err.message);
  };

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});