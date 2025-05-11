import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/LoginPage";
import ForgotPassword from "../pages/ForgotPasswordPage";
import CreateAccount from "../pages/CreateAccountPage";
import HomePage from "../pages/HomePage";
import UploadPage from "../pages/UploadPage";
import EditPage from "../pages/EditPage";
const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/register",
    element: <CreateAccount />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/upload",
    element: <UploadPage />,
  },
  {
    path: "/edit/:sessionId",
    element: <EditPage />,
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