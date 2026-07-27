export interface TransportRoute {
  metro: string;
  bus: string;
  estimatedTime: string;
}

export interface NearbyTransport {
  id: number;
  name: string;
  type: "Metro" | "Bus Stop";
  distance: string;
}

export interface TransportSearchRequest {
  city: string;
  from: string;
  to: string;
}

export interface TransportData {
  route: TransportRoute;
  nearby: NearbyTransport[];
}