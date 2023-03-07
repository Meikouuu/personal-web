import { config } from './config.js';
import { Randombg, Staticbg } from './bg.js';
import './render.js';

//import mustache from 'https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.2.0/mustache.min.js';
if (config.random_bg == true) {
  Randombg();
}
else {
  Staticbg();
};



