import { config } from './config.js';

export function Randombg() {
  var c = Math.floor(Math.random() * config.images.bg_list.length);
  document.body.style.backgroundImage = "url(" + config.images.bg_list[c] + ")";  
  
};

export function Staticbg() {
  document.body.style.backgroundImage = "url(" + config.images.static_bg + ")";
};