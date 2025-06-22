import { useParams } from "react-router-dom"

const Room = () => {
  const searchParams = useParams()
  const roomId = searchParams.roomId
  
  return (
    <div>Welcome to room {roomId}</div>
  )
}

export default Room