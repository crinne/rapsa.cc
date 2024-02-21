import App from "./App";
import { MakeFileForGO } from "./pages/makefile-for-go";
import { ResizableDiv } from "./pages/resizable-div";

export const routes = [
  { path: "/", element: <App /> },
  { path: "/resizable-div", element: <ResizableDiv /> },
  { path: "/makefile-for-go", element: <MakeFileForGO /> },
]
