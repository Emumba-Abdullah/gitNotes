import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/HomePage";
import GistPage from "./pages/GistPage";
import ProtectedRoute from "./ProtectedRoute";
import MyGists from "./pages/MyGists";
import AddGist from "./pages/AddGist";
import StaredGists from "./pages/StaredGists";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    index: true,
  },
  {
    path: "/gist/:id",
    element: <GistPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        index: true,
      },
      {
        path: "/mygists",
        element: <MyGists />,
      },
      {
        path: "/addgist",
        element: <AddGist />,
      },
      {
        path: "/starredgists",
        element: <StaredGists />,
      },
    ],
  },
  {
    path: "*",
    element: <p>NotFound</p>,
  },
]);

export default router;
