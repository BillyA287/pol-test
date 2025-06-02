export type WorkerStats = {
    wait_time: number;
    workers: number;
    waiting: number;
    idle: number;
    time_to_return: number;
    recently_blocked_keys: [string, number, string][]; 
    top_keys: [string, number][]; 
  };
  
  export type ServerStats = {
    cpus: number;
    active_connections: number;
    wait_time: number;
    workers: [string, WorkerStats][]; 
    cpu_load: number;
    timers: number;
  };
  
  export type Results = {
    services: {
      database: boolean;
      redis: boolean;
    };
    stats: {
      servers_count: number;
      online: number;
      session: number;
      server: ServerStats;
    };
  };
  
  export type EndpointResponse = {
    status: string; 
    region: string; 
    roles: string[]; 
    results: Results;
    strict: boolean;
    server_issue: string | null; 
    version: string; 
  };
  
  export type EndpointData = {
    url: string; 
    status?: number; 
    data?: EndpointResponse; 
    error?: string; 
  };