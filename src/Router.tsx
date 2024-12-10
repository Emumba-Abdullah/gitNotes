import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/homePage";
import GistPage from "./pages/gistPage";
import ProtectedRoute from "./ProtectedRoute";
import MyGists from "./pages/myGists";
import AddGist from "./pages/addGist";
import StaredGists from "./pages/starredGists";

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
