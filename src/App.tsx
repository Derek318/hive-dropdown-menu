import "./App.css";
import Dropdown from "./components/Dropdown/Dropdown";
import { fruitOptions, vegetableOptions, usernames } from "./constants";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* !! Custom Dropdown Components !! */}

        {/* Selecting one fruit */}
        <h5>Select One Fruit 🍉</h5>
        <Dropdown options={fruitOptions} placeholder="Select One Fruit" />

        {/* Selecting many vegetables */}
        <h5>Select Many Vegetables 🥦</h5>
        <Dropdown
          options={vegetableOptions}
          multiple
          placeholder="Select Multiple"
        />

        {/* Selecting many fruits and vegetables */}
        <h5> Select Many Fruits & Vegetables 🍉 🥦</h5>
        <Dropdown
          options={fruitOptions.concat(vegetableOptions)}
          multiple
          placeholder="Select Multiple"
        />

        {/* Selecting one username from 5,000 */}
        <h5>Select One Username from 5,000</h5>
        <Dropdown options={usernames} placeholder="Select One" searchable />

        {/* Selecting many usernames from 5,000 */}
        <h5>Select Many Usernames from 5,000</h5>
        <Dropdown
          options={usernames}
          placeholder="Select Multiple"
          multiple
          searchable
          onChange={(selection) => console.log("Selected Items: ", selection)}
        />
      </header>
    </div>
  );
}

export default App;
