import { NextUIProvider } from "@nextui-org/react";
import "./styles/index.scss";
import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import AccountDetail from "@pages/account-detail";

function App(): ReactElement {
  return (
    <NextUIProvider>
      <Routes>
        <Route
          path="dashboard/account/detail"
          element={
            <div>
              <AccountDetail />
            </div>
          }
        />
      </Routes>
    </NextUIProvider>
  );
}

export default App;
