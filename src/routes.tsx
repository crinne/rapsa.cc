import App from "./App";
import { MakeFileForGO } from "./pages/makefile-for-go";
import { PoorManCICD } from "./pages/poor-man-ci-cd";
import { ResizableDiv } from "./pages/resizable-div";

export const routes = [
  { path: "/", element: <App /> },
  { path: "/resizable-div", element: <ResizableDiv /> },
  { path: "/makefile-for-go", element: <MakeFileForGO /> },
  { path: "/poor-man-ci-cd", element: <PoorManCICD /> },
]
