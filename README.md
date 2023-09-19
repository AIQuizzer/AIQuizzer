# AI Quizzer

Simple quiz app that uses OpenAI's GPT-3 to generate questions from the categories.

[Link to the app](https://aiquizzer.onrender.com/)

## Tech stack

- React
- TypeScript
- Tailwind CSS
- Convex
- Auth0
- OpenAI's GPT-3
- Shadcn

## Installation

- Clone the repo
- Run `npm i` to install dependencies
- Add needed enviroment variables to the .env file (see .env.example)
- Deploy the Convex functions to the dev environment with `npx convex dev`
- Run `npm run dev` to start the app

To make the GPT-3 work, you need to add this enviroment variable to your Convex dashboard: `OPENAI_API_KEY="sk-<your key here>"`.
Otherwise, the app will use the mocked data.
