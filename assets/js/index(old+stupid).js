$.getScript("/src/site_config.js");
const url = 'https://api.openweathermap.org/data/2.5/'
const key = ''
//const lat = 14.771008
//const lon = 100.691651
const loac = 'Thailand, lop buri'

//get api as json
$.ajax({
  url: "https://api.lanyard.rest/v1/users/829156179803504670",
  type: "get",
  dataType: 'json',
  error: function(data) { console.error("Hmmm, Looks like something went wrong."); },
  success: function(data) {



    const userdata = data;

    //data extraction
    var user = userdata["data"]["discord_user"];
    //get user status(online, offline, dnd, idle)
    var status = data["data"]["discord_status"];
    //get user tag

    var discriminator = data["data"]["discord_user"]["discriminator"];

    //get username 
    var username = data["data"]["discord_user"]["username"];
    //  get user avatar ID
    var avatar = data["data"]["discord_user"]["avatar"];
    //get user ID
    var id = data["data"]["discord_user"]["id"];
    //insert to activities
    var ac = data["data"]["activities"][0];

    //convert arry to json dict

    let con = Object.assign({}, ac);
    //get status message 
    var stat = con.state;
    //if your status is empty (undefined)
    console.log(stat);
    if (stat == undefined) {
      //set status to empty 
      stat = "";
    }

    //-----------------------------------


    //stringfy username 
    let name1 = JSON.stringify(username);

    let namef = JSON.parse(name1);

    let dataformat = JSON.stringify(data);
    console.dir(dataformat);


    //avatar size ex:16 32 64 512 1024 4096
    let size = "4096";

    //convert to avatar url
    let d_avatar = `https://cdn.discordapp.com/avatars/${id}/${avatar}.webp?size=${size}`;

    //convert to discord url
    var disurl = `https://discord.com/users/${id}`;


    //format to discord username
    var fullname = namef + "#" + discriminator;


    //pfp image(automatically set pfp image)
    document.getElementById("profile").innerHTML = `
    
      <a class="preimg" href="${d_avatar}" data-lightbox="pfp">
        <img class="imgpfp" src="${d_avatar}" alt="pfp"/></a>
           `;



    //offline/online or dnd and idle status
    document.getElementById("status").innerHTML = `
    
   <div class="status" id = "${status}"><ubntu>${status} on discord</ubntu></div> 
   
    `;
    document.getElementById("username").innerHTML = `${fullname}`;


    //soical icons
    document.getElementById("soicals").innerHTML = `
   <div class="soical">
   
        <a href="${config["discordurl"]}">
          <img class="soicalic" src="icon/discord.svg"></a>
          
        <a href="${config["instagramurl"]}">
          <img class="soicalic" src="icon/instagram.svg"></a>
          
        <a href="${config["facebookurl"]}">
          <img class="soicalic" src="icon/facebook.svg"></a>
          
        <a href="${config["twitterurl"]}">
          <img class="soicalic" src="icon/twitter.svg"></a>
        <a href="${config["youtubeurl"]}">
          <img class="soicalic" src="/icon/youtube.svg"></a></div>
          `;

    $.getJSON(`https://api.openweathermap.org/data/2.5/weather?q=${loac}&appid=${key}&units=metric`, function(data) {
      $("#weather").html(`
      
    <span>${data.weather[0].description}</span> And ${Math.round(data.main.temp)}°C in ${data.name}, ${data.sys.country}`);

      console.log(data)
    });
  }
});