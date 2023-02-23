
function gameInfo(){

fetch("http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=FCA53F323070D2EF17EF9D969B43EAC4&steamid=76561197960434622&include_appinfo=true&format=json").then((res) => res.json())
    .then((data) =>{
    console.log(data);
  });
}