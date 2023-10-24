import { RouteObject } from "react-router-dom";

import { HomePage } from "@/pages/home.page";
import { Layout } from "@/components/layout";

const normalRoutes: RouteObject = {
  path: "*",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
  ],
};

const routes: RouteObject[] = [normalRoutes];

export default routes;
