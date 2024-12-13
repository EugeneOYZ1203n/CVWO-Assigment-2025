import Provider from "./components/ui/provider"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { Toaster } from "./components/ui/toaster"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <Toaster />
      <App />
    </Provider>
  </React.StrictMode>,
)