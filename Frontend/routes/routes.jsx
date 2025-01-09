import UserRoot from "../pages/UserRoot";
import AddPage from "../pages/add/AddPage";
import DetailPage from "../pages/details/DetailPage";
import HomePage from "../pages/home/HomePage";
const ROUTES = [
  {
    path: "/",
    element: <UserRoot />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "/details/:id",
        element: <DetailPage />,
      },
      {
        path: "/add",
        element: <AddPage />,
      },
    ],
  },
];

export default ROUTES;
