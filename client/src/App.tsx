import { useNavigate } from "react-router-dom"
import { HandlerFunctions } from "./handlers/handlers"
import HomePage from "./components/react-components/HomePage"

const App = () => {
  const navigator = useNavigate()
  const handler = new  HandlerFunctions(navigator)

  return (
    <HomePage handler={handler}/>
  )
}

export default App