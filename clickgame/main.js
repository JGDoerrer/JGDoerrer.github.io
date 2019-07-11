var clicks = 0;
var prevclicks = 0;
var nextclicks = 0;
var upgrades = 0;
var autoclicks = 0;

var progress = 0;

function load()
{
    clicks = parseInt(getCookie("clicks"));
    nextclicks = clicks;
    upgrades = parseInt(getCookie("upgrades"));
    autoclicks = parseInt(getCookie("autoclicks"));
    setInterval(update, 10);
}

function update()
{
    clicks = Math.floor(prevclicks + (nextclicks - prevclicks) * progress);
    document.getElementById("p1").innerHTML = "Klicks: " + clicks;
    document.getElementById("upgradebtn").innerHTML = "Upgrades ("+upgrades+"): " +  Math.pow(3, upgrades) * 100;
    document.getElementById("autoclickbtn").innerHTML = "Autoklicks ("+autoclicks+"): " + 60 * Math.pow(1.25, autoclicks);
    setCookie("clicks", clicks, 300);
    setCookie("upgrades", upgrades, 300);
    setCookie("autoclicks", autoclicks, 300);    

    progress += .01;
    if (progress >= 1)
    {
        clicks = nextclicks;
        prevclicks = clicks;
        nextclicks = clicks + autoclicks;
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
    if (clicks >= Math.pow(3, upgrades) * 100)
    {
        clicks -= Math.pow(3, upgrades) * 100;
        nextclicks -= Math.pow(3, upgrades) * 100;
        prevclicks = clicks;
        upgrades++;
    }
}

function buyautoclick()
{
    if (clicks >= 60 * Math.pow(1.25, autoclicks))
    {
        clicks -= 60 * Math.pow(1.25, autoclicks);
        nextclicks -= 60 * Math.pow(1.25, autoclicks);
        prevclicks = clicks;
        autoclicks++;
    }
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
    return "";
}