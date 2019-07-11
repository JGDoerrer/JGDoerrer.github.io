var clicks = 0;
var upgrades = 0;

function load()
{
    clicks = parseInt(getCookie("clicks"));
    upgrades = parseInt(getCookie("upgrades"));
    update();
}

function update()
{
    document.getElementById("p1").innerHTML = "Klicks: " + clicks;
    document.getElementById("upgradebtn").innerHTML = "Upgrades ("+upgrades+"): " + upgradeCost;
    setCookie("clicks", clicks, 300);
    setCookie("upgrades", upgrades, 300);
}

function btnclick()
{
    clicks += Math.pow(2, upgrades);
    update();
}

const upgradeCost = Math.pow(3, upgrades);
function upgrade()
{
    if (clicks >= upgradeCost)
    {
        clicks -= upgradeCost;
        upgrades++;
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