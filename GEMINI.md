# GEMINI.md - TeachMeAI Home Site

This document provides a comprehensive overview of the TeachMeAI home site project, intended to be used as a context for future interactions with the Gemini CLI.

## Project Overview

This is a Next.js marketing website for TeachMeAI, a service offering personalized AI coaching. The site is designed to be a conversion-focused platform, with a clear value proposition, program showcases, an interactive AI readiness quiz, and lead generation forms.

The frontend is built with Next.js, React, and TypeScript, and styled with Tailwind CSS and shadcn/ui. The backend functionality, including the AI-powered chat quiz and email services, is implemented using Next.js API routes.

A key feature of the site is the "AI Skills Diagnostic" chat quiz, which engages users in a conversation to understand their needs and collects basic information. This quiz is powered by the Gemini API. Upon completion, a personalized intake link is sent to the user's email, using a JWT for a seamless transition to a more detailed intake application.

The project is well-documented, with a `docs` directory containing detailed architecture diagrams, implementation plans, and security guidelines.

## Building and Running

### Prerequisites

*   Node.js
*   npm (or a compatible package manager)

### Installation

1.  Clone the repository.
2.  Install the dependencies:

    ```bash
    npm install
    ```

### Running the Development Server

1.  Create a `.env.local` file by copying the example:

    ```bash
    cp .env.example .env.local
    ```

2.  Fill in the required environment variables in `.env.local`, as described in the `README.md` file.

3.  Start the development server:

    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

To create a production build, run:

```bash
npm run build
```

The output will be in the `.next` directory.

### Linting

To run the linter, use:

```bash
npm run lint
```

## Development Conventions

*   **Language:** TypeScript
*   **Framework:** Next.js with the `app` directory structure
*   **Styling:** Tailwind CSS with shadcn/ui components
*   **Code Quality:** ESLint is used for linting.
*   **Component-Based Architecture:** The project is organized into reusable React components located in the `components` directory.
*   **API Routes:** Backend logic is handled by Next.js API routes in the `app/api` directory.
*   **Content Management:** The content for the programs and FAQ sections is managed through JSON files in the `content` directory.
*   **Documentation:** The `docs` directory contains extensive project documentation, which should be consulted for a deeper understanding of the architecture and implementation details.

## Key Files and Directories

*   `app/`: The main application directory, following the Next.js `app` router convention.
*   `components/`: Contains reusable React components.
*   `config/`: Configuration files, such as `quiz-configs.ts`.
*   `content/`: JSON files for managing site content.
*   `docs/`: Extensive project documentation.
*   `lib/`: Utility functions and libraries, such as email handling.
*   `public/`: Static assets like images and fonts.
*   `package.json`: Project metadata and dependencies.
*   `next.config.js`: Next.js configuration.
*   `tailwind.config.ts`: Tailwind CSS configuration.
*   `GEMINI.md`: This file.
*   `README.md`: The main project README.
