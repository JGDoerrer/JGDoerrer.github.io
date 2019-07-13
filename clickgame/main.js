var clicks = 0;
var prevclicks = 0;
var nextclicks = 0;
var upgrades = 0;
var autoclicks = 0;
var autoclickupgrades = 0;

var progress = 0;

function load()
{
    clicks = parseInt(getCookie("clicks"));
    var timePassed = Date.now() - parseInt(getCookie("lastonline"));1
    upgrades = parseInt(getCookie("upgrades"));
    autoclicks = parseInt(getCookie("autoclicks"));
    autoclickupgrades = parseInt(getCookie("autoclickupgrades"));    
    var offlineclicks = autoclicks * Math.pow(2, autoclickupgrades) * timePassed / 1000
    nextclicks = clicks + offlineclicks;
    console.log(offlineclicks);
    window.setInterval(update, 10);
}

function update()
{
    clicks = Math.floor(prevclicks + (nextclicks - prevclicks) * progress);
    document.getElementById("p1").innerHTML = "Klicks: " + clicks;
    document.getElementById("p2").innerHTML = "Klicks pro Sekunde: " + autoclicks * Math.pow(2, autoclickupgrades);
    document.getElementById("upgradebtn").innerHTML = "Upgrades ("+upgrades+"): " + upgradecost();
    document.getElementById("autoclickbtn").innerHTML = "Autoklicks ("+autoclicks+"): " + autoclickcost();
    document.getElementById("upgradeautoclickbtn").innerHTML = "Autoklickupgrades ("+autoclickupgrades+"): " + autoclickupgradecost();
    setCookie("clicks", clicks, 300);
    setCookie("upgrades", upgrades, 300);
    setCookie("autoclicks", autoclicks, 300);    
    setCookie("autoclickupgrades", autoclickupgrades, 300);    
    setCookie("lastonline", Date.now(), 300);    

    progress += .01;
    if (progress >= 1)
    {
        clicks = nextclicks;
        prevclicks = clicks;
        nextclicks = clicks + autoclicks * Math.pow(2, autoclickupgrades);
        progress = 0;
    }
}

function btnclick()
{
    clicks += Math.pow(2, upgrades);
    nextclicks += Math.pow(2, upgrades);
    prevclicks += Math.pow(2, upgrades);
}

function upgrade()
{
    if (clicks >= upgradecost())
    {
        clicks -= upgradecost();
        nextclicks -= upgradecost();
        prevclicks = clicks;
        upgrades++;
    }
}

function buyautoclick()
{
    if (clicks >= autoclickcost())
    {
        clicks -= autoclickcost();
        nextclicks -= autoclickcost();
        prevclicks = clicks;
        autoclicks++;
    }
}

function upgradeautoclick()
{
    if (clicks >= autoclickupgradecost())
    {
        clicks -= autoclickupgradecost();
        nextclicks -= autoclickupgradecost();
        prevclicks = clicks;
        autoclickupgrades++;
    }
}

function upgradecost()
{
    return Math.pow(3, upgrades) * 50;
}

function autoclickcost()
{
    return Math.floor(60 * Math.pow(1.25, autoclicks));
}

function autoclickupgradecost()
{
    return 250 * Math.pow(3, autoclickupgrades)
}

function setCookie(name, value, exdays)
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name)
{
    var name = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "0";
}