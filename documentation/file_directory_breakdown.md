/src
    /app: Next.js App, Router-specific files
        /api/advocates: server-side API endpoint is defined.
            /route.ts: This handles all incoming GET requests to /api/advocates. It processes query parameters for  search, page, limit, and sort, then passes them to the database service.

        /page.tsx: The main page component. It manages all the client-side state, including advocates, searchTerm, currentPage, and sorting parameters. It fetches data from the /api/advocates endpoint with a debounce mechanism to prevent excessive API calls during typing.

        /advocateTable.tsx: renders the advocate data in a table format.

        /paginationControls.tsx: component for displaying and managing pagination.

        /searchBar.tsx: component for handling user input for the search functionality and the reset button.

        /globals.css: global CSS file that includes Tailwind CSS and custom classes using the @apply directive to refactor components like the SearchBar and AdvocateTable.

        /layout.tsx: The root layout component for the application.

        /utils: utility functions.
            /helpers.tsx: Contains the formatPhoneNumber function, which is a reusable utility for data formatting.

    /db: This directory contains the database related configuration and schema.

    /services: This directory contains the business logic for data fetching.
        /advocate.service.ts: core database query logic. It uses Drizzle ORM to construct SQL queries with dynamic conditions for searching, sorting, and pagination.

    /types: This directory contains all the shared TypeScript types and interfaces used throughout the application.
        /index.ts:  central hub for type safety in the entire application.



