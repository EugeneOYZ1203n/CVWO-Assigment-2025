import Provider from "./components/ui/provider"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { Toaster } from "./components/ui/toaster"
import { Theme } from "@chakra-ui/react"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
    <Theme appearance="dark">
      <Toaster />
      <App />
    </Theme>
    </Provider>
  </React.StrictMode>,
)
