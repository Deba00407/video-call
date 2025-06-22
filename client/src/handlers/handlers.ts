import type { JoiningFunctions } from "@/types"
import { v4 as uuidv4 } from "uuid"

class HandlerFunctions implements JoiningFunctions {
    private roomId: string = ""
    private navigate: (path: string) => void

    constructor(
        navigator: (path: string) => void
    ) {
        this.navigate = navigator
    }

    handleJoin() {
        console.log("Joining room:", this.roomId)
        this.navigate(`/room/${this.roomId}`)
    }

    handleJoinWithId(id: string) {
        this.currentRoomId = id
        this.handleJoin()
    }

    handleCreate() {
        this.currentRoomId = uuidv4()
        this.handleJoin()
    }

    get currentRoomId() {
        return this.roomId
    }

    set currentRoomId(newRoomId: string) {
        this.roomId = newRoomId
    }
}

export { HandlerFunctions }

