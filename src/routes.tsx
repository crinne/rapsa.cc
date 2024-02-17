import App from "./App";
import { ResizableDiv } from "./pages/resizable-div";

export const routes = [
  { path: "/", element: <App /> },
  { path: "/resizable-div", element: <ResizableDiv /> },
]
