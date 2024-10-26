version history
v1

- implement base layout with users list, init project, choose RHF (react hook form) for reduce rerendering while managing form, choose shadcn/ui for beautiful design system without needed of reinventing and wasting time into css/accessibility, choose tw for better bundling, not to mess with unused styles on every page
- implement better context for reducing rerenders (preudo-parents)
- implement skeleton, mock reading data from external store with "async" behavior
- persist user data

v2

- after discovering a low performance due to a lot of users rows with form inputs over the page, decided to choose uncontrolled inputs than controlled ones. this refactoring took me a while, cuz i've tried to find a better way to play with RHF + uncontrolled inputs across the task, many of RHF api's which i'm familiar with doesn't work properly because it causes rerenders and inputs lose focus, i've played a lot with internal api's and find some hacks to save better UX while balancing with performance, also discovered some bugs/glitch and made a todo's to find a way to solve it properly
- add welcome page with animations, add favicon, kinda fix some mobile styles (not perfect but still)
- add debounced search not to rerender after each keyword entered
- add virtualization to render only rows in viewport, that is core permofance feature here
- update component composition
- playing with onBlur to count errors properly but it has a tradeoff, whether i have uncontrolled inputs and if i want to use RHF api for errors counting, i can only trigger validation only on 'blur' event cuz it causes rerender and user lose its focus
- add stats page

v3

- so i decided not to mess with UX for this and reject this api's to my own one, so i've implemented normalized data (to lookup by O(1) not O(n)) set it in separate provider (pseudo parent) and after validation i've playing with this normalized data to count errors without causing rerenders to lose focus
- revision all the code, make it more "clean" and understandable for developers, move some code into its own components to hide its logic inside (under the same abstraction layer)

time spent:
it took me about 20h in total to complete this task, not because it has a lot of features to implement, but because of many refactoring steps, while i was finding a better way to save nice UX and balancing with performance it caused some bugs happens, sometimes one feature was broken, sometimes another one. But still, i've fixed most of them and leave some unimportant in TODO's (which aren't mention in the assignment to do)

explanation some technical decisions:

- uncontrolled inputs was chosen because of less coupling with react state not to trigger rerenders after interacting with native browser elements.
- src/components/users/awesome-input.tsx

  1. it has useEvent hook, it is a hook which can be stable during rerenders while has an ability to read from the state reactive values, while we entered a value, we check its validity with zod, if validity changes while changing input's value we play with local state error, that's why it is crucial not to recreate validate() function during rerendering
  2. it has some potential improvement to use Proxy (like it has in Immer.js), it can lead us not to mess with destructuring fields, more DX, less errors but for now it is like it is

- src/components/users/virtualized-list.tsx

1. handleRemoveUser has some hack inside, after removing the row we should trigger rerender programmatically within RHF api trigger(), this help us not to mess with next row fields, like if we delete N row, N+1 now stands on the place N, so we rerender it

- src/components/users/search.tsx

1. for now search doesn't setting normalized data, only filtering, that's why if we have some error/empty fields counted and do some search we can still see this numbers, but it is my decision to save this behavior, because if we remove this filter, we can see this errored/emptied fields, once we update normalized data within the search, we can fix this behavior but IMO it is not the correct behavior (while fixing takes only couple of minutes, so it isn't crucial)

- src/components/users/users-list.tsx

1. there is a task to do:
   > "Empty string also produces an error, but not at the first render, just after it had some value and it was deleted. So if I just added a new row, and didn't start typing anything, it will not be counted as an error for the error count."

for now i trigger an errors during rerenders of user row if it has one, don't count some touched/untouched fields, it is not hard to implement, but i'm a bit tired of refactoring and ensured that all other features are staying the same, so for now i decided not to implement this

2. handleAddUser has some hack with prevUsers, while getValues('users') doesn't have the right values inside uncontrolled fields, i can populate them more precisely with this approach
