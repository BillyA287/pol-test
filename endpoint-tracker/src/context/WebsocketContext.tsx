import React, { createContext, useContext } from 'react';
import useWebSocket from '../hooks/useWebsocket';
import type { EndpointData } from '../shared-types/types'; 


interface WebSocketContextType {
  data: EndpointData[]; 
  error: string | null;
  connectionState: 'connecting' | 'connected' | 'disconnected' | 'error';
}


const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);


export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, error, connectionState } = useWebSocket('ws://localhost:8080');

  return (
    <WebSocketContext.Provider value={{ data, error, connectionState }}>
      {children}
    </WebSocketContext.Provider>
  );
};


export const useWebSocketContext = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocketContext must be used within a WebSocketProvider');
  }
  return context;
};