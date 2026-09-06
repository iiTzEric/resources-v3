# Realtime Chat App

**Level:** Advanced
**Concepts practiced:** WebSockets, state synchronization, architecture decisions

## What You're Building

A real-time chat application — users can join a room and send/receive messages instantly, without
needing to refresh the page or repeatedly poll the server.

## What Concepts It Teaches

Every backend interaction in this curriculum so far has followed the request/response cycle: client
asks, server responds, done. This project introduces a genuinely different communication model —
**WebSockets**, a persistent, two-way connection allowing the server to push data to the client at
any time, not just in response to a request — a real architectural decision beyond this
curriculum's core modules, requiring you to research and apply a new concept independently.

## Requirements

- Users can join a named chat room.
- Messages sent by one user appear, in real time, for all other users currently in the same room —
  without a page refresh or manual polling.
- Basic message history when a user joins a room (messages sent before they joined, at minimum for
  the current session).
- Proper handling of users joining/leaving (e.g., a system message, or an updated list of who's
  currently present).
- Reasonable handling of connection drops/reconnection — real networks aren't perfectly reliable,
  and a genuinely robust chat app should degrade gracefully, not silently break.

## Suggested Features

- Persist message history in a real database (Databases module), so it survives server restarts,
  distinct from the in-memory, current-session-only history in the base requirement.
- Basic authentication so messages are attributed to real, logged-in users rather than anonymous
  guests.
- Typing indicators ("Alice is typing...").

## What You Should Figure Out Yourself

- Which WebSocket library/approach to use (Socket.io is a common, well-documented choice) — this
  requires reading real documentation for a tool not covered in this curriculum's core modules,
  directly applying the "using AI to explain unfamiliar things, but verifying independently" skill
  from the Working With AI module.
- How to structure your server to manage multiple concurrent rooms and connections.
- How your React frontend should manage the real-time incoming message stream as state, and update
  the UI efficiently as new messages arrive (connecting to the React module's state management and
  performance topics).

## Possible Extensions

- Private, one-on-one messaging alongside room-based chat.
- File/image sharing within a chat room.
- Read receipts or delivery confirmation.

## Skills Demonstrated

Completing this project demonstrates the ability to research, learn, and correctly apply a genuinely
new technical concept (WebSockets) independently — going beyond this curriculum's explicitly taught
topics using the learning skills and critical AI-usage habits built throughout the entire path, not
just following a prescribed lesson.
