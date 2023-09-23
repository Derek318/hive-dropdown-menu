# Dropdown Menu Component

A flexible dropdown menu component built with React for the Hive Frontend Coding Assessment.

## Table of Contents

- [Getting Started](#getting-started)
  - [Usage](#usage)
- [API Reference](#api-reference)
- [Examples](#examples)

## Getting Started

### Clone this repo and run the following command:

```
npm i && npm run build && npm start
```

Finally navigate to `localhost:3000` in your browser.

### Usage

To use the Dropdown Menu component in your project, follow these steps:

1. Import the `Dropdown` component into your React application:

   ```javascript
   import Dropdown from "./Dropdown";
   const options = ["Option 1", "Option 2", "Option 3"];

    // Inside your component...
    return (
      <Dropdown
        options={options}
        onChange={(selectedOptions) => {
          console.log("Selected options:", selectedOptions);
        }}
        multiple={true}
        searchable={true}
        placeholder="Select options"
      />
    );

   ```
   ![Dropdown Menu](https://storage.googleapis.com/www.derekmccreight.me/assets/hidden/dropdown_ex.gif)


### API Reference

#### Props
- `options` (Array): An array of strings representing the available options in the dropdown.

- `onChange` (Function): A callback function that will be invoked when the selection changes. It receives an array of selected options as an argument.

- `multiple` (Boolean): If set to true, allows multiple options to be selected.

- `searchable` (Boolean): If set to true, enables a search input in the dropdown.

- `placeholder` (String): Text to display when no options are selected.


### Examples

Here are some usage examples of the Dropdown component:

#### Basic Dropdown
```javascript
import Dropdown from "./Dropdown";

const options = ["Option 1", "Option 2", "Option 3"];

function MyComponent() {
  return (
    <Dropdown options={options} />
  );
}
```

#### Multi-Selection Dropdown
```javascript
import Dropdown from "./Dropdown";

const options = ["Option 1", "Option 2", "Option 3"];

function MyComponent() {
  return (
    <Dropdown options={options} multiple />
  );
}
```

### Searchable Multi-Selection Dropdown
```javascript
import Dropdown from "./Dropdown";

const options = ["Apple", "Banana", "Cherry", "Date", "Fig", "Grape"];

function MyComponent() {
  return (
    <Dropdown options={options} searchable multiple />
  );
}
```
