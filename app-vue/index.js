import { createApp, h } from "vue";

const App = {
    render() {
        return h("h1", "Hello from Vue Microfrontend!");
    },
};

export function mount(el) {
    createApp(App).mount(el);
}
