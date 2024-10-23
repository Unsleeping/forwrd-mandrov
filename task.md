## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

To run the project locally: clone -> npm i -> npm start

## Description

You are tasked with building a react app that receives a long list of users.
Each user has the following fields: Name, Country, Email and Phone.
In addition, the app has two different pages.

- users page in which you will render the users' inputs and handle changes in the data.
- statistics page, in which you will render a graphic representation of how many users live in each country.

### Context

The users data, which is a long array of users, is saved within a global state - for this project we utilize react context.
When app loads, the app 'mimics' getting users data from a server. This is the initial users data (provided json file).
When we will make changes to the data inside Users Page and save those changes - after clicking on save - it should update the users data global state.
You can choose any other state management solution you prefer instead of the built-in react context (you can add packages to the project as you see fit).

- **Emphasize on Performance :**
  - In the process of working on the assignment, pay attention to performance optimization, avoid unnecessary re-renders and make the user experience as flawless as possible.

## Requirements

### Users Page

- render a list of inputs in the dedicated container
  each list item includes all the fields of the user (except id) organized in one row
  see the mock below (most of it is already implemented):
  ![enter image description here](https://i2.paste.pics/331ce901a70bc7b64c4cab202d336cd1.png)
  you have some components already in the code, you can utilize them or implement your own.

- Each field value can be edited. You need to manage local changes and onChange callbacks.
- Support delete user functionality - onClick on the trash icon on the right side of each row
- Support add a new user functionality - onClick on the plus button on the top
  a click on the plus button should render a new row above the existing rows (newly added row would be first),
  it's field values would be empty (a placeholder of the input name should be shown inside each input when empty)
- Render how many users in total are currently on the list (how many rows) - show number in parentesis near the Users List title

- **Validation and Error management:**

  - On change of each input, if invalid value has been entered, the field should have an 'error' state - it's border will become red (by passing error={true} prop to the input)

  - Validation rules for the task:
    - name should include only letters a-z (not case sensitive)
    - country should be one of the countries in the options provided
    - email - you can use an email validation regex, or for simplicity - email must contain exactly one '@' character
    - phone - must have a '+' character as first character, but only one '+' (for simplicity we won't check numeric characters etc)


  - Empty string also produces an error, but not at the first render, just after it had some value and it was deleted. So if I just added a new row, and didn't start typing anything, it will not be counted as an error for the error count.

  - **Error Count**

    Distinguish between empty errors (had value and it was deleted) and invalid errors (not matching the validation requirements but not empty):

    Render a separate container beneath the users container and above the save button, which includes information counting the error types, like so: (you can design this as you wish)

    ``"Errors: Empty Fields - 2, Invalid Fields - 5"``

    It means there are 7 fields with red border overall, 5 of them include invalid content but not empty, 2 of them are empty.

  - Save button should be disabled if there is at least one error, or if there is at least one empty field (on blur on a new row - empty fields are marked as error)

  - Successful save => updates the shared global state (as mentioned before) and local error states should be reset
  - Pay attention when you implement row deletion, take care also of it's errors if it had any.

- **Extra:**
  - After scrolling a very long way down there are a lot of elements that are already rendered and the performance can get poor. Implement a solution to deal with rendering and scrolling when you have a large list of heavy rows.
  - Persist users data - after refresh the changes that were made don't get lost
  - Make the country field to be rendered as an autocomplete/select from the provided options (with a dropdown of choices) others remain input type text.
  - Implement the loading state and some ui while users data is loading.
  - Search - add a search input on the top of the users list, on change of the search string, it will filter the users and show only those that have the search string included in one of user's fields.

### Statistics Page

- Render a pie chart of the countries (each piece in the pie is a country from the options that we have) - and visualize how many users are from each country. The biggest piece in the pie would be the country with the largest amount of users (the updated amount that is currently saved on our context, after the latest changes on Users List)
  - You can use any solution you prefer for the chart, any chart library you know (for example, Chart.js is an open-source library that is really simple to use) or even some js-css solution. Note that there is no library currently installed in the project for that. Feel free to install any library of your choosing.
- If you don't manage to show the data in a graphic solution as a pie chart, or you don't have enough time, the minimum requirement is to render a list of the countries we have - and render near each country a number of how many users are from this country.

### Bonus Round :)
- Deploy your code to any platform you wish to be accessible from the web.

### General notes:
- Make sure the code meets your standards (dont take the current code standards as guidelines/for granted) and allows you to express yourself. Feel free to make any changes to the existing code, changing the components implementation, changing passed props, css, and so on.
- Using Vite is optional. Again - feel free to make any changes.
- The suggested design and Look&Feel (mock) are also optional. You can follow it or design your own.
- If there are any other changes or optimizations that you think are in place and it wasn't mentioned here, we would be glad for you to mention and explain 🤩

