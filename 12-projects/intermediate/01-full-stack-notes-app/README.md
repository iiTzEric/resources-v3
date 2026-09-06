# Full-Stack Notes App

**Level:** Intermediate
**Concepts practiced:** React + Express + MongoDB, full CRUD, API design

## What You're Building

A notes application with a React frontend and your own Express + MongoDB backend: create, view,
edit, and delete notes, with data genuinely persisted in a real database.

## What Concepts It Teaches

This is the direct, natural culmination of Modules 06-08 (React, Backend, Databases) — the exact
full-stack connection pattern built throughout this curriculum's practical sections (React →
Express → MongoDB), now applied as a complete, standalone project rather than following along step
by step.

## Requirements

- A React frontend with: a list view of all notes, a way to create a new note, a way to edit an
  existing note, and a way to delete a note.
- An Express backend exposing REST endpoints (REST APIs topic) for all four CRUD operations.
- Data persisted in MongoDB via Mongoose (Databases module).
- Proper separation into routes/controllers/services (Backend module) rather than all logic inline
  in `server.js`.
- Input validation on the backend (never trust the frontend alone) for note creation/editing —
  e.g., reject empty note content.
- CORS properly configured so the React frontend can actually reach the Express backend.
- Loading and error states in the React frontend for all data-fetching operations (Data Fetching
  Patterns topic).

## Suggested Features

- Search/filter notes by title or content.
- Timestamps showing when each note was created/last edited.
- Basic categorization or tagging of notes.

## What You Should Figure Out Yourself

- The exact API endpoint design (following REST conventions from the Backend module).
- The Mongoose schema design for a note (what fields, what validation).
- Where different pieces of state should live in the React app (Component Composition and State
  Management topics).
- Your project's folder structure, applying the Project Structure topic from the React module and
  the layered structure from the Backend module.

## Possible Extensions

- Add authentication (Backend module's Authentication topic) so notes are private per user.
- Add pagination (API Architecture topic) once you have many notes.
- Deploy the full application (frontend and backend) somewhere publicly accessible.

## Skills Demonstrated

Completing this project demonstrates genuine, independent full-stack capability — building both
sides of a real application from scratch, connecting them correctly, and handling the real
practical issues (CORS, validation, error states) that arise along the way, without step-by-step
guidance.
