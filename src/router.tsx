import { createBrowserRouter } from "react-router";

import { Home } from "./pages/home";
import { Detail } from "./pages/detail";
import { NotFound } from "./pages/notfound";
import { Layout } from "./components/layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/detail/:cripto',
        element: <Detail />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

export { router }