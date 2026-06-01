import salmonImage from "../assets/foodPictures/TeriyakiSalmon.png";
import buffaloChickenImage from "../assets/foodPictures/BuffaloChickenPasta.png";
import koreanBeefImage from "../assets/foodPictures/KoreanBeefBowl.png";
import chiliBeefImage from "../assets/foodPictures/ChiliBeefSweetPotato.png";
import lemonChickenImage from "../assets/foodPictures/LemonHerbChickenRice.png";
import halloumiBowl from "../assets/foodPictures/HalloumiLentilBowl.png";

export const products = [
  {
    id: 1,
    name: "Teriyaki Salmon Bowl",
    category: "Fisk",
    kcal: 580,
    protein: 39,
    price: 125,
    image: salmonImage,
    popular: true,
    showCase: false,
  },
  {
    id: 2,
    name: "Buffalo Chicken Pasta",
    category: "Kyckling",
    kcal: 690,
    protein: 52,
    price: 119,
    image: buffaloChickenImage,
    popular: true,
    showCase: false,
  },
  {
    id: 3,
    name: "Korean Beef Bowl",
    category: "Nötkött",
    kcal: 620,
    protein: 42,
    price: 109,
    image: koreanBeefImage,
    popular: true,
    showCase: true,
  },
  {
  id: 4,
  name: "Lemon Herb Chicken Rice",
  category: "Kyckling",
  kcal: 610,
  protein: 48,
  price: 115,
  image: lemonChickenImage,
  popular: false,
  showCase: false,
  },
  {
  id: 5,
  name: "Chili Beef Sweet Potato",
  category: "Nötkött",
  kcal: 670,
  protein: 45,
  price: 119,
  image: chiliBeefImage,
  popular: false,
  showCase: false,
  },
  {
  id: 6,
  name: "Halloumi Lentil Bowl",
  category: "Vegetariskt",
  kcal: 640,
  protein: 34,
  price: 109,
  image: halloumiBowl,
  popular: false,
  showCase: false,
}
];