import { toLower } from "lodash";

// Some example sets to use with the Dropdown Menu

export const fruitOptions = [
  "Strawberry 🍓",
  "Banana 🍌",
  "Apple 🍎",
  "Orange 🍊",
  "Grapes 🍇",
  "Cherry 🍒",
  "Pineapple 🍍",
  "Watermelon 🍉",
  "Kiwi 🥝",
  "Mango 🥭",
  "Peach 🍑",
  "Blueberry 🫐",
  "Raspberry 🍇",
  "Lemon 🍋",
  "Pear 🍐",
];

export const vegetableOptions = [
  "Eggplant 🍆",
  "Carrot 🥕",
  "Broccoli 🥦",
  "Cucumber 🥒",
  "Tomato 🍅",
  "Bell Pepper 🫑",
  "Zucchini 🥒",
  "Onion 🧅",
  "Potato 🥔",
  "Spinach 🍃",
  "Lettuce 🥬",
  "Cabbage 🥬",
  "Cauliflower 🥦",
  "Radish 🍅",
  "Green Bean 🥦",
];

export const usernames = Array.from({ length: 5000 }, (_, index) => {
  const adj = [
    "Happy",
    "Funny",
    "Bright",
    "Sunny",
    "Clever",
    "Creative",
    "Brilliant",
    "Energetic",
    "Lively",
    "Cheerful",
    "Charming",
    "Exciting",
    "Joyful",
    "Radiant",
    "Enthusiastic",
    "Vibrant",
    "Dynamic",
    "Playful",
    "Adventurous",
    "Delightful",
    "Amusing",
    "Optimistic",
    "Colorful",
    "Positive",
    "Whimsical",
    "Spirited",
    "Witty",
    "Zesty",
    "Jovial",
    "Spontaneous",
    "Magical",
    "Bubbly",
    "Ecstatic",
    "Effervescent",
    "Carefree",
    "Euphoric",
    "Animated",
    "Exuberant",
    "Zany",
    "Captivating",
    "Irresistible",
    "Mesmerizing",
    "Electrifying",
    "Quirky",
    "Lighthearted",
    "Inspirational",
    "Uplifting",
    "Refreshing",
    "Fantastic",
  ];
  const fruitIndex = index % fruitOptions.length;
  const vegetableIndex = index % vegetableOptions.length;
  const firstName = adj[fruitIndex % adj.length];
  const lastName = vegetableOptions[vegetableIndex].split(" ")[0];
  return `${toLower(firstName)}${lastName}${Math.round(Math.random() * 1000)}`;
});
