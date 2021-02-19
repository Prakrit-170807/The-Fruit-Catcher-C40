class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }
        touch = createSprite(200,500,120,50)  
        touch2 = createSprite(800,500,120,50)
        touch.visible=true
        touch2.visible=true
        
        player1 = createSprite(200,500);
        player1.addImage("player1",player_img);
    
        player2 = createSprite(800,500);
        player2.addImage("player2", player_img);

        players=[player1,player2];
        
        

    }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;
        drawSprites();

        for(var plr in allPlayers){
        
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            
            players[index -1].x = x;
            players[index - 1].y = y;
            
            if (index==player.index){
                players[index-1].shapeColor="red"
                fill('#000000')
                textSize(15)
                text(allPlayers[plr].name,x-25,y+25)
                touch.x = players[index-1].x
                touch2.x =players[index-1].x
              }
        }


        if(keyIsDown(LEFT_ARROW) && player.index !== null){
            player.distance +=20
            player.update();
          }
          if(keyIsDown(RIGHT_ARROW) && player.index !== null){
            player.distance -=20
            player.update();
          }


        if (frameCount%60==0){
            fruits = createSprite(random(100,1000),0,100,100)
            fruits.velocityY = 6
            switch(Math.round(random(1,5))){
                case 1:fruits.addImage('fruit1',fruit1_img)
                break
                case 2:fruits.addImage('fruit1',fruit2_img)
                break
                case 3:fruits.addImage('fruit1',fruit3_img)
                break
                case 4:fruits.addImage('fruit1',fruit4_img)
                break
                case 5:fruits.addImage('fruit1',fruit5_img)
                break
            }
            foodGroup.add(fruits)
        }

        if(touch.isTouching(foodGroup)){
            foodGroup.destroyEach()
        }

        
    }

    end(){
       console.log("Game Ended");
    }
}