import { NextUIProvider } from "@nextui-org/react";
import "./styles/index.scss";
import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/users/Main";

function App(): ReactElement {
  return (
    <NextUIProvider>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <div>
              <Main />
            </div>
          }
        >
          <Route
            path="sub1"
            element={
              <div>
                <div>
                  <h1>sub 1</h1>
                </div>
              </div>
            }
          />
          <Route
            path="sub2"
            element={
              <div>
                <div>
                  <h1>sub 3</h1>
                </div>
              </div>
            }
          />
          <Route
            path="sub3"
            element={
              <div>
                <div>
                  <h1>sub 3</h1>
                </div>
              </div>
            }
          />
        </Route>
      </Routes>
    </NextUIProvider>
  );
}

export default App;
