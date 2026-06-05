# Server Components in Next.js: A Practical Guide

The App Router blurs the line between server and client, and most teams I work with end up making everything a client component by default. That works, but it throws away the framework's biggest wins.

## The default should be a server component

If a component does not need `useState`, `useEffect`, browser APIs, or event handlers, it should be a server component. The Next.js compiler will tell you — `"use client"` is opt-in.

## Push `"use client"` to the leaves

A page can be a server component that fetches data and renders a layout, then renders a client component for the interactive bits (a navbar, a form, a chart). This keeps most of your bundle on the server.

## Data fetching belongs in the component

You do not need a global state library for server data. `async` server components can fetch directly, and Next will dedupe the requests for you. Save client state for things the server does not know about.
