var clicks = 0;
var nextclicks = 0;
var upgrades = 0;
var autoclicks = 0;

var progress = 0;

function load()
{
    clicks = parseInt(getCookie("clicks"));
    upgrades = parseInt(getCookie("upgrades"));
    autoclicks = parseInt(getCookie("autoclicks"));
    setInterval(update, 10);
    update();
}

function update()
{
    document.getElementById("p1").innerHTML = "Klicks: " + (clicks + (nextclicks - clicks) * progress);
    document.getElementById("upgradebtn").innerHTML = "Upgrades ("+upgrades+"): " +  Math.pow(3, upgrades) * 100;
    document.getElementById("autoclickbtn").innerHTML = "Autoklicks ("+autoclicks+"): " + 100;
    setCookie("clicks", clicks, 300);
    setCookie("upgrades", upgrades, 300);
    setCookie("autoclicks", autoclicks, 300);    

    progress += .01;
    if (progress >= 1)
    {
        nextclicks = clicks + autoclicks;
        progress = 0;
    }
}

function btnclick()
{
    clicks += Math.pow(2, upgrades);
    nextclicks += Math.pow(2, upgrades);
}

function upgrade()
{
    if (clicks >=  Math.pow(3, upgrades) * 100)
    {
        clicks -=  Math.pow(3, upgrades) * 100;
        upgrades++;
    }
}

function buyautoclick()
{
    if (clicks >= 100)
    {
        clicks -= 100;
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