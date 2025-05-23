import React from "react"
import { BrowserRouter } from "react-router-dom"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { ClerkProvider } from "@clerk/clerk-react"
import { store, persistor } from "./redux/store"
import App from "./App"
import "./index.css"
import Modal from "react-modal"

Modal.setAppElement('#root')

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
console.log("Clerk Publishable Key:", import.meta.env.VITE_CLERK_PUBLISHABLE_KEY)

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ClerkProvider>
  </React.StrictMode>
)

