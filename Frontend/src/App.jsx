import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ROUTES from "../routes/routes.jsx";

const routes = createBrowserRouter(ROUTES);
function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
