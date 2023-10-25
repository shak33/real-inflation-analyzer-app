# Project description

The primary aim of this project is to develop an application where users can record their purchases from the Biedronka shop. Using this data, the app will then calculate the base inflation rate for individual products or an entire cart of products. By utilizing real-time data from users, we can gauge the inflation rate instantly.

## Current revision
Not even close to an alpha version, still in development.

## Tech Stack

### Front-end

- React: Used for building the user interface components.
- TypeScript: Supersets JavaScript by adding static types, enhancing maintainability and robustness.
- Tailwind: A utility-first CSS framework for rapid UI development.
- Zustand: A minimalistic state management library, utilized to manage the application's global state without the boilerplate.
- Axios: A promise-based HTTP client that's used for making API calls to the back-end.
- React Hook Form: A performant, flexible and extensible form solution, implemented for form handling and validations.
- Zod: A schema declaration and validation library; used to validate and parse the incoming and outgoing data in our application, ensuring data integrity.

### Back-end

- Next.js: A React framework for server-rendered applications.
- TypeScript: Enhances back-end code reliability with strong static typing.

### Database

- Prisma ORM (MongoDB engine): Provides a set of database access and management capabilities with MongoDB as the underlying engine.

### Testing

- Jest: A delightful JavaScript testing framework.
- React Testing Library: Useful for testing React components' functionality.