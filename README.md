# Steller Web Player

This is a prototype of a new Steller web player built using [next.js](https://next.js). The goals of this new approach are as follows:

- Leverage Next.js for routing, server-rendering, and other UI infrastructure rather than rolling our own
- Utilize a model where each device category (desktop, phone, TV??) essentially has it's own app rather than relying primarily on CSS media queries. It's still one Node app on the server, but there is a dedicated webpack bundle for each device category. We can still have common components that are shared across devices.
-

### Debugging

- https://github.com/Microsoft/vscode-recipes/tree/master/Next-js

### References

- [nextgram](https://github.com/now-examples/nextgram) - sample app that has the same basic navigation pattern as Steller.
- [SSR and Server Only Modules](https://arunoda.me/blog/ssr-and-server-only-modules)
