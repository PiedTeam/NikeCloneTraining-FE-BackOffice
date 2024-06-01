import { NextUIProvider } from "@nextui-org/react";
import "./styles/index.scss";
import { ReactElement } from "react";

function App(): ReactElement {
  return (
    <NextUIProvider>
      <h1 className="text-red-500">ahihi</h1>
    </NextUIProvider>
  );
}

export default App;
