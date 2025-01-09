import UserRoot from "../pages/UserRoot";
import DetailPage from "../pages/details/DetailPage";
import HomePage from "../pages/home/HomePage";
const ROUTES = [
  {
    path: "/",
    element: <UserRoot />,
    children: [
      { path: "", 
      element: <HomePage /> },
      {
        path: "/details/:id",
        element: <DetailPage />,
      },
    ],
  },
];

export default ROUTES;
