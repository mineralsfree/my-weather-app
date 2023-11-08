# Weather app
## Technologies used
### React
React was chosen as one of the most popular javascript libraries for building user interfaces. I have the most experience working with React as well.
### Typescript
In order to improve maintainability of the project and enhance developer experience, typescript is used.
### Material UI
MUI was used to reduce the cost of components development and better accessibility.
### Next.js
Next.js was selected as a framework to make use of it integrated features, like routing, HMR, SSR, etc.
### Redux, Reduxjs/toolkit
Redux tooltkit was used to eliminate boilerplate code while working with redux. Used in a project to fire API request and store cache.
### leaflet (Map)
Leaflet and lealet-react where used to render OpenStreetMap map
### prettier, estlint, pre-commit hooks
In order to improve consistency of the codebase, eslint and prettier are used. Pre-commit hooks are essential tools that help ensure that only well-formatted code makes its way into Git/GitHub repositories
## Steps to test the application
One of the essential activities would be to define user scenarios. These would be, in this case:
- The user can view the 5-day forecast for city X.
- The user can view the current weather for city X.
- The user can see the stations they previously added.
- The user can add a new station.
- The user can delete previously added stations.

Each of these scenarios should be covered by tests. These test sets can include unit tests (the cheapest option), integration tests, or they might be tested manually. For implementing unit tests, the `jest` library and `react-testing-library` can be utilized. `Playwright` would be the preferred end-to-end web testing framework.

## Steps to make sure the application is fast
There might be several issues that could affect the performance of the application. There are plenty of tools that can help measure and identify bottlenecks in the system. For identifying performance issues, you can use:
- The "Network" tab to track slow requests or big bundles.
- The "Performance" tab to notice tasks that are causing frame drops.
- "React Profiler" can be used to see if there are unnecessary re-renders and to identify the root cause of the "laggy" UI.

## Steps to ensure it is easy to maintain and easy to extend in the future
- Try to avoid increasing technical debt as much as possible and always manage it.
- Avoid using libraries with doubtful futures.
- Keep the code consistent and enforce the code style (eslint) that the team agreed on.
- Conduct code reviews.
- It might be beneficial to introduce the practice of shared ownership if the work is in a team.
- Write clean code.
- Don't forget about refactoring.

## Steps to deploy the application
- Select a hosting environment (for example, AWS, Google Cloud, ...).
- Configure the hosting environment depending on the type of service (IaaS, PaaS).
- Run tests and build the application (for example, locally).
- Upload the build artifacts to the configured hosting environment and start the application.
- (Optional) Install and start a monitoring tool to ensure that the app is running smoothly without disruptions.

It is worth considering introducing CI/CD so the process of deployment (testing, building, uploading) is automated and accelerated.

## Steps to start an application
- install dependencies (npm install)
- add `.env.local` file   
To ensure the program works correctly, you need an .env.local file to be located in the root of the repository. This file should contain the following values:
```text
NEXT_PUBLIC_WEATHER_API_KEY=_YOUR_WEATHER_API_KEY_
NEXT_PUBLIC_WEATHER_API_URL=https://api.openweathermap.org/data
NEXT_PUBLIC_API_WEATHER_V=2.5
NEXT_PUBLIC_API_STATION_V=3.0
```
- enable CORS workaround at https://cors-anywhere.herokuapp.com/corsdemo  
⚠️
For some reason, requests to station API are blocked by CORS️.
After spending reasonable amount of time investigating,
came up to the only possible workaround of adding this proxy `https://cors-anywhere.herokuapp.com/`.  
Before using the station API, go to https://cors-anywhere.herokuapp.com/corsdemo and click on `Request temporary access to the demo server` button.

- `npm run dev`  
run `npm run dev` to start the development server of an app

Commands to build a production version of the project can be found in `package.json` file

## Next.js README.md  
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
