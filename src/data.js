import basket from "./img/shopping_cart_icon.png";
import favorite from "./img/favorite_heart_like_likes_love_icon.png";
import profile from "./img/profile_ui_user_icon.png";

const recommendData = [
  {
    id: 0,
    title: "White and Black",
    content: "Born in France",
    price: 120000,
  },

  {
    id: 1,
    title: "Red Knit",
    content: "Born in Seoul",
    price: 110000,
  },

  {
    id: 2,
    title: "Grey Yordan",
    content: "Born in the States",
    price: 130000,
  },
];

const IconArray = [
  { id: 0, icon: basket, url: "cart" },
  { id: 1, icon: favorite, url: "" },
  { id: 2, icon: profile, url: "" },
];

export { recommendData, IconArray };
