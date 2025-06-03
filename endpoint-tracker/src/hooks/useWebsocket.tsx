import { useEffect, useState, useRef } from 'react';
import type { EndpointData } from '../../shared-types/types';

type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

export const useWebSocket = (url: string) => {
  const [data, setData] = useState<EndpointData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [connectionState, setConnectionState] = useState<ConnectionStatus>('connecting');

  const hasConnectedOnceRef = useRef(false);
  const reconnectAttemptRef = useRef(0);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const errorHandledRef = useRef(false);

  const sendMessage = (message: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
    } else {
      setError('WebSocket is not open. Unable to send message.');
    }
  };

  useEffect(() => {
    const connect = () => {
      setConnectionState('connecting');
      setError(null);
      errorHandledRef.current = false;
      wsRef.current = new WebSocket(url);

      wsRef.current.onopen = () => {
        setConnectionState('connected');
        hasConnectedOnceRef.current = true;
        reconnectAttemptRef.current = 0;
        setError(null);
      };

      wsRef.current.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          if (parsed.error) {
            setError(parsed.error);
          } else {
            setData(parsed);
          }
        } catch {
          setError('Error parsing WebSocket message');
        }
      };

      wsRef.current.onerror = () => {
        errorHandledRef.current = true;
        setConnectionState('error');
        setError('error');
        wsRef.current?.close();
      };

      wsRef.current.onclose = () => {
        if (!errorHandledRef.current) {
          setConnectionState('disconnected');
        }

        if (reconnectAttemptRef.current < 1) {
          reconnectAttemptRef.current += 1;
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, 5000);
        } else {
          if (hasConnectedOnceRef.current && !errorHandledRef.current) {
            setConnectionState('error');
            setError('Failed to reconnect WebSocket after 1 attempt.');
          }
        }
      };
    };

    connect();

    return () => {
      wsRef.current?.close();
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [url]);

  return { data, error, connectionState, sendMessage };
};

export default useWebSocket;