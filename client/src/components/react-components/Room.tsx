import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  Center,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocketStore } from "@/store";

interface Message {
  type: string;
  payload: string;
  fromSelf: boolean;
}

const Room = () => {
  const { roomId } = useParams();
  const socketRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const { socket, updateSocket } = useSocketStore()

  function getSocketConnection() {
    if (socket !== null && socket.OPEN) {
      return socket
    }

    const newSocketConnection = new WebSocket(import.meta.env.VITE_WSS_URL)
    updateSocket(newSocketConnection)
    return newSocketConnection
  }

  useEffect(() => {
    const socket = getSocketConnection();
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      socket.send(JSON.stringify({ type: "JOIN", payload: "Client joined" }));
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received:", message);

      setMessages((prev) => [
        ...prev,
        { ...message, fromSelf: false }
      ]);
    };

    socket.onerror = (error) => console.error("Socket error:", error);
    socket.onclose = (event) => console.log("Socket closed", event);

    return () => {
      socket.close();
    };
  }, []);


  const handleSend = () => {
    if (input.trim() && socketRef.current?.readyState === WebSocket.OPEN) {
      const msg = { type: "CHAT", payload: input };

      // Send to server
      socketRef.current.send(JSON.stringify(msg));

      // Also store locally
      setMessages((prev) => [
        ...prev,
        { ...msg, fromSelf: true }
      ]);

      setInput("");
    }
  };

  const handleLeaveRoom = () => {
    socketRef.current?.close()
  }

  return (
    <Center minH="100vh" bg="#333446" color="white" p={4}>
      <VStack w="100%" maxW="600px">
        <Text fontSize="2xl" fontWeight="bold">
          Room: {roomId}
        </Text>

        <Box
          w="100%"
          h="60vh"
          bg="#1a1b2e"
          borderRadius="md"
          p={4}
          overflowY="auto"
        >
          <VStack align="stretch">
            {messages.map((msg, index) => (
              <Box
                key={index}
                alignSelf={msg.fromSelf ? "flex-end" : "flex-start"}
                bg={msg.fromSelf ? "green.400" : "gray.600"}
                color="white"
                px={4}
                py={2}
                borderRadius="lg"
                maxW="80%"
              >
                {msg.payload}
              </Box>
            ))}
          </VStack>
        </Box>

        <HStack w="100%">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            bg="gray.700"
            borderColor="gray.500"
            color="white"
            _placeholder={{ color: "gray.400" }}
          />
          <Button
            onClick={handleSend}
            bg="green.400"
            _hover={{ bg: "green.500" }}
            color="white"
          >
            Send
          </Button>
        </HStack>
        <Button
          onClick={handleLeaveRoom}
          bg="green.400"
          _hover={{ bg: "green.500" }}
          color="white"
        >
          Leave Room
        </Button>
      </VStack>
    </Center>
  );
};

export default Room;
