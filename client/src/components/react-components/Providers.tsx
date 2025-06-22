import { Provider } from "../ui/provider";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import App from "@/App";
import Room from "./Room";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/room/:roomId" element={<Room />} />
    </>
  )
);

const Providers = () => {
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default Providers;
