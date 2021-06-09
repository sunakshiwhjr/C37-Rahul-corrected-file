class Game {
  constructor(){

  }
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();

      }
   
      form = new Form()
      form.display();
    }
  }

  play(){
    form.hide_details();
    textSize(25);
    stroke("black");
    text("Game Start",120,100);

    //class name because the function is static
    Player.getPlayerInfo();
    //sdr: one of the equals to sign missing
    if(allPlayers!== undefined){
      var display_position = 120;
      //for(var plr = 0; && plr < 4; plr ++)
      for(var plr in allPlayers){
        //sdr: triple equals to missing
        if(plr === "player" + player.index){
          //sdr: given fill = "red" wrong syntax
          fill("red");
        }
        else{
          //sdr: given fill = "red" wrong syntax
          fill("black");
        }
      
      display_position += 20;
      text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120, display_position);
      }
    }
    //sdr: if(keyDown(UP_ARROW && player.index !== null)) wrong syntax
    if(keyDown(UP_ARROW) && player.index !== null){
      player.distance += 40;
      player.update();

    }


  }
}
