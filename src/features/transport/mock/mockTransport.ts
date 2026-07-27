import type {
  NearbyTransport,
  TransportRoute,
} from "../types/transport.types";

export const mockTransportRoute: TransportRoute = {
  metro: "Yellow Line via Rajiv Chowk",
  bus: "Route 534",
  estimatedTime: "42 min",
};

export const mockNearbyTransport: NearbyTransport[] = [
  {
    id: 1,
    name: "GTB Nagar Metro Station",
    type: "Metro",
    distance: "700 m",
  },
  {
    id: 2,
    name: "Vishwavidyalaya Metro Station",
    type: "Metro",
    distance: "1.4 km",
  },
  {
    id: 3,
    name: "Mukherjee Nagar Bus Stop",
    type: "Bus Stop",
    distance: "350 m",
  },
  {
    id: 4,
    name: "Batra Cinema Bus Stop",
    type: "Bus Stop",
    distance: "900 m",
  },
];