import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/LoginPage";



const routes = [
  {
    path: "/",
    element: <Login />,
  },
]
const router = createBrowserRouter(routes, {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
  }
});
export default router;