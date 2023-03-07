import Typed from 'https://cdn.skypack.dev/typed.js';
import { createApp, reactive, toRefs } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { config } from './config.js'
const DateTime = luxon.DateTime;
const app = reactive({
  about: `<div id="about" class="">
  <div id="intro">
    <Hi I'm mac
      <br>
      Just normal person with a lot of curiousity
   <br><small>i don't know how can i get here💀
    </small>
  </div>
          <h3 id="about-font">About-me</h3>
          <li>Nickname: Mac</li>
          <li>Age: 14 ~ 16 </li>
          <li>MBTI: ENFP </li>
          <li>Status: Don't mess with my life </li>
          <li>Favorite: Codeing, science, space, astro, tech</li>
          <li>Education: non-formal education</li>
          <br>
          <br>           
          </div>
          `,
  soical_ic: `
     <div class="soical" style="text-align: center; align-items: center;">
          <a href="${config.soical.discord_url}">
            <img class="soicalic" src="./assets/icon/discord.svg"></a>
          <a href="${config.soical.instagram_url}">
            <img class="soicalic" src="./assets/icon/instagram.svg"></a>
          <a href="${config.soical.facebook_url}">
            <img class="soicalic" src="./assets/icon/facebook.svg"></a>
          <a href="${config.soical.twitter_url}">
            <img class="soicalic" src="./assets/icon/twitter.svg"></a>
          <a href="${config.soical.youtube_url}">
                    <img class="soicalic" src="./assets/icon/youtube.svg"></a></div>
             <br>
            <br>`,
  time: '',
  wt: ''
});

const App = {
  setup() {
    return toRefs(app);
  },
  template: `
  <div id="#statsbar" style='font-size: 1px;'> My time: <span v-html="time"></span>
  <br> Weather: <span v-html="wt"></span>
</div>
<div id="container">
  <div>
  <img class="imgpfp" src="https://api.lanyard.rest/${config.discord_id_str}.png">
    <br>
  </div>
  <div style="text-align: center" class="type">
    <span id="typeingname"></span>
  </div>
  <br>
  <div id="status"></div>
  <br>
  <div v-html="about"></div>
  <br>
  <div v-html="soical_ic"></div>
</div>
    `
};


const time = () => {
  const dt = DateTime.now();
  let t = dt.toFormat('ff:ss ZZZZ', { zone: config.timezone })
  app.time = t;
};
const updateTime = () => {
  time();
  setTimeout(updateTime, 1000);
};
const fetchWeatherData = async () => {
  const response = await fetch('https://wttr.in/Thailand Lop Buri?format=%t in %l, Wind speed %w, %m');
  const data = await response.text();
  app.wt = data;
};
const shuffle = (o) => {
  let r = o.length,
    e;
  for (; 0 != r;) e = Math.floor(Math.random() * r), r--, [o[r], o[e]] = [o[e], o[r]];
  return o
}
const d = (num) => {
  const digits = num.toString().split('');
  const realDigits = digits.map(Number);
  return realDigits;
}
const handlePresenceUpdate = (data) => {

  console.log()
  const realtag = data.discord_user.discriminator;
  const tagsh = shuffle(d(realtag));
  const mixedTag = parseInt(tagsh.join(''));
  const name = data.discord_user.username || '';
  const nameLetters = name.split('');
  const shname = shuffle(nameLetters).join('');
  const options = {
    strings: [
      `<span class="tfs">${shname}#${mixedTag}<span>`,
      `<span class="tfs">${name}#${mixedTag}<span>`,
      `<span class="tfs">${name}#${realtag}<span>`,
      `<span class="ts1">${name}#${realtag}</span>`
    ],
    typeSpeed: 30,
    cursorChar: '_',
    showCursor: false,
    startDelay: 1200,
    backSpeed: 20,
    backDelay: 500,
  };
  const typed = new Typed('#typeingname', options);
}
createApp(App).mount('#app');
updateTime();
fetchWeatherData();
lanyard({
  userId: config.discord_id_str,
  socket: true,
  onPresenceUpdate: handlePresenceUpdate
});