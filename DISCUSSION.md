- Using TailWind CSS
https://tailwindcss.com/docs

- Using Drizzle ORM Documentation
https://orm.drizzle.team/docs/overview

- I used AbortController and setTimeout together prevents redundant API calls. The settimeout with a 500ms delay debounces the search input, to make sure the API is only called after the user has stopped typing, while the AbortController cancels any requests that are no longer needed.

- Using flex-grow in main div container
I Wanted to allow the container to grow and take up any available vertical space within its parent container. Basically it's what makes the card expand to fill the entire screen height. It will also be pushing the pagination controls all the way to the bottom.

- Added a documentation directory
it includes File and Directory Breakdown

- I used CAST(... AS TEXT) because the specialties column is an array type in the database, and this converts it to a searchable string so we can use ILIKE for partial text matching.

- checklist:
Add a debounce function to optimize API calls from the search bar. ✅
Adjust (/api/advocates) to fetch data. ✅
Implement server-side searching, sorting, and pagination logic in the database service. ✅
Build the main page.tsx component to manage all client-side state. ✅
Develop the AdvocateTable, SearchBar, and PaginationControls child components. ✅
Integrate Font Awesome icons for a clean UI, especially for sort indicators. ✅
Refactor CSS by creating custom classes in globals.css using @apply. ✅
Create a dedicated types file to define all component props and data interfaces. ✅
Configuration file to dynamically changes repetitive/glbal values.
Table accordion. ✅
Better files/directory organization
enhance main page title , maybe a banner?
create an Downloa all button - will download all in csv
Expand row when search find specialty ✅