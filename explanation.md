# Version History

## v1

- Implemented base layout with user list, initialized project, and chose React Hook Form (RHF) to reduce re-rendering while managing forms. Opted for `shadcn/UI` for an attractive design system without needing to reinvent or spend time on CSS/accessibility, and used Tailwind CSS for optimized bundling to avoid unused styles across pages.
- Added an optimized context to reduce re-renders (pseudo-parents).
- Implemented skeleton loading, mocked reading data from an external store with "async" behavior.
- Persisted user data.

## v2

- After encountering performance issues due to numerous user rows with form inputs, switched from controlled to uncontrolled inputs. This refactoring took time, as I experimented with ways to use RHF alongside uncontrolled inputs across the app. Many RHF APIs I was familiar with didn’t work properly: they caused re-renders and inputs lost focus. After exploring internal APIs and discovering some workarounds, I balanced UX and performance, identified some bugs/glitches, and made a to-do list for further refinement.
- Added a welcome page with animations, a favicon, and adjusted some mobile styles (not perfect but functional).
- Added debounced search to prevent re-renders after each keyword entered.
- Added virtualization to render only rows within the viewport (this is a core performance feature btw)
- Updated component composition.
- Experimented with `onBlur` to count errors accurately; however, with uncontrolled inputs, using RHF’s API for error counting only works with the 'blur' event. Using it otherwise causes re-renders and the user loses focus.
- Added a stats page.

## v3

- To avoid disrupting UX, I decided against using RHF’s API and created my own. I implemented normalized data (for O(1) lookups rather than O(n)), set it up in a separate provider (pseudo-parent), and used it during validation to count errors without causing re-renders or loss of focus.
- Revised the entire codebase for cleanliness and readability, moved some code into dedicated components to encapsulate logic under the same abstraction layer.

---

### Time Spent

It took about 20 hours to complete this task. Not due to an abundance of features, but due to numerous refactoring steps required to optimize UX and performance. These adjustments caused occasional bugs, with one feature sometimes breaking another. I resolved most of them, leaving only minor issues in the to-do list (unrelated to the assignment requirements).

### Explanation of Technical Decisions

- **Uncontrolled Inputs:** Chosen for less coupling with React state to avoid re-renders when interacting with native browser elements.
- **`src/components/users/awesome-input.tsx`**

  1. Contains a `useEvent` hook, which remains stable across re-renders while accessing reactive state values. We validate each input change with Zod, updating a local error state if validity changes, making it crucial not to recreate the `validate()` function on each re-render.
  2. Potential improvement: consider using a Proxy (as in Immer.js) for simpler field handling, which could reduce destructuring and errors for better DX. For now, it’s left as is.

- **`src/components/users/search.tsx`**

  1. Currently, search only filters normalized data. As a result, if error/empty fields are counted and a search is performed, these counts persist. I decided to maintain this behavior, as removing the filter would re-display the errored/empty fields. This can be adjusted by updating normalized data within the search but, in my opinion, the current setup is preferable.

- **`src/components/users/users-list.tsx`**

  1. Task pending:

     > "Empty strings produce an error, but only if the field initially had a value and was cleared. If a new row is added without typing anything, it won’t be counted as an error for the error count."

     Currently, I trigger errors during the re-render of user rows if an error exists and haven’t yet implemented a way to distinguish touched/untouched fields. Although this isn’t difficult, I wanted to ensure existing features were stable before adding it.

  2. `handleAddUser` includes a workaround using `prevUsers`. Since `getValues('users')` doesn’t contain the right values within uncontrolled fields, this approach allows for more precise value population.

---
