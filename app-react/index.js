import React from "react";
import ReactDOM from "react-dom/client";

const App = () => <h1>Hello from React Microfrontend!</h1>;

export function mount(el) {
    const root = ReactDOM.createRoot(el);
    root.render(<App />);
}
