// store/socketStore.ts
import { create } from "zustand";

interface SocketStore {
  socket: WebSocket | null;
  updateSocket: (newSocket: WebSocket) => void;
}

const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  updateSocket: (newSocket) => set({ socket: newSocket }),
}));

export { useSocketStore };
