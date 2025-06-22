import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";

import { useState } from "react";
import type { JoiningFunctions } from "@/types";

export default function HomePage({ handler }: { handler: JoiningFunctions }) {
  const [roomId, setRoomId] = useState("");

  const handleRoomJoin = () => {
    if (roomId.trim()) {
      handler.handleJoinWithId(roomId);
    }else{
      alert("Room id is empty or invalid")
    }
  };

  return (
    <Center h="100vh">
      <Box
        border="1px solid white"
        borderRadius="md"
        p={8}
        w={["90%", "400px"]}
        textAlign="center"
      >
        <Heading mb={8} fontSize="2xl" color="white">
          Welcome to the App
        </Heading>

        <Stack direction="row" mb={6}>
          <Input
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter Room ID"
            variant="outline"
            color="white"
            borderColor="white"
            _placeholder={{ color: "gray.400" }}
          />
          <Button
            onClick={handleRoomJoin}
            border="1px solid white"
            variant="ghost"
            color="white"
            _hover={{ bg: "whiteAlpha.200" }}
          >
            Join Room
          </Button>
        </Stack>

        <Button
          onClick={() => handler.handleCreate()}
          border="1px solid white"
          variant="ghost"
          color="white"
          _hover={{ bg: "whiteAlpha.200" }}
          w="100%"
        >
          Create New Room
        </Button>
      </Box>
    </Center>
  );
}
