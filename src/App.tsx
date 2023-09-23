import "./App.css";
import Dropdown from "./components/Dropdown/Dropdown";
import { fruitOptions, vegetableOptions, usernames } from "./constants";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Custom Dropdown Components */}
        <h2>Select One Fruit 🍉</h2>
        <Dropdown options={fruitOptions} placeholder="Select One Fruit" />
        <h2>Select Many Vegetables 🥦</h2>
        <Dropdown
          options={vegetableOptions}
          multiple
          placeholder="Select Multiple"
        />
        <h2> Select Many Fruits & Vegetables 🍉 🥦</h2>
        <Dropdown
          options={fruitOptions.concat(vegetableOptions)}
          multiple
          placeholder="Select Multiple"
        />
        <h2>Select One Username from 5,000</h2>
        <Dropdown options={usernames} placeholder="Select One" searchable />

        <h2>Select Many Usernames from 5,000</h2>
        <Dropdown
          options={usernames}
          placeholder="Select Multiple"
          multiple
          searchable
        />
      </header>
    </div>
  );
}

export default App;
