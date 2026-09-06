# Weather Dashboard (External API)

**Level:** Intermediate
**Concepts practiced:** Fetching, error/loading states, environment variables for API keys

## What You're Building

A weather dashboard: a user searches for a city, and the app displays current weather and a short
forecast, using a real, free public weather API (e.g., OpenWeatherMap or a similar service).

## What Concepts It Teaches

This project focuses specifically on working with a **real external API you don't control** —
different from the earlier `jsonplaceholder` practice API, since real APIs require an API key,
have rate limits, and can genuinely fail in ways worth handling gracefully (Fetch & HTTP Requests
and Data Fetching Patterns topics), plus proper secret management (Environment Variables topic).

## Requirements

- A search input for a city name, using a controlled component (React module).
- Fetching real weather data from a public API upon search.
- Displaying current temperature, conditions, and a short forecast.
- Proper loading state while a request is in progress, and a clear error state if the city isn't
  found or the request fails (Data Fetching Patterns topic).
- The API key stored in an environment variable, never committed to your repository (Environment
  Variables & Secrets topic) — this matters even for a frontend-only project; research how to
  handle API keys that a frontend-only app would otherwise expose publicly, and make a deliberate,
  explained choice (a common real answer: proxy the request through a small backend you control,
  so the key never reaches the browser at all).

## Suggested Features

- Show weather for multiple saved cities at once.
- Toggle between Celsius and Fahrenheit.
- Handle the specific case of typos/city-not-found distinctly from a genuine network failure.

## What You Should Figure Out Yourself

- Exactly which weather API to use, and how its specific response shape is structured (read its
  real documentation — a genuinely useful exercise in working with unfamiliar, real API docs).
- Whether and how to build a small backend proxy for the API key, and why that's a meaningfully
  different security posture than exposing the key directly in frontend code.
- How to structure loading/error/success states cleanly in your React components.

## Possible Extensions

- Cache recent search results briefly to avoid redundant API calls for the same city (connects to
  the general idea of not repeating unnecessary network requests).
- Add a map showing the searched location.
- Build the small backend proxy suggested above into a genuine, minimal Express server, if you
  haven't already.

## Skills Demonstrated

Completing this project demonstrates genuine competence working with a real, external, rate-limited
API — reading unfamiliar documentation, handling realistic failure modes, and making a deliberate,
informed decision about protecting an API key rather than blindly exposing it.
