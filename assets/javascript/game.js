$(document).ready(function() {

// let initalize = function(){
  //Hooks to document

  let docCharSection = $('charactersSection');
  let docHeroSelection = $('.heroSelection');
  let heroHolder = $('.heroHolder');
  let message = $('#message');
  let player = $('#player');
  let enemy = $('#enemy');
  let stats = $('#stats');
  let submessage = $('#submessage');
  let eAttack = $('#eAttack');
  let eLife = $('#eLife');
  let pLife = $('#pLife');
  let pAttack = $('#pAttack')

  //Global Variables

  let heroList = ['Aiden', "Lin", "Saya", "Star", "Nyx", "Boggs", "Hinata", "Kov"];
  let playerHero = [];
  let enemeyHeros = [];
  let heroChosen = 0;
  let enemiesChosen = false;
  let playerLife = 100;
  let heroConfirm = false;
  let enemyConfirm = false;
  let gameOver = false;
  let enemyCounter = 0;
  let enemyTeamReady=false;

  //restart buttonSpot

  let restart = $('<button>');
  restart.addClass('btn btn-lg btn-dark confirm-button');
  restart.text('Restart');
  restart.attr('id', 'restartButton');

  //functions of operation/game logic

  let gameStart = function() {

    heroChosen = 0;
    player.hide();
    enemy.hide();
    stats.hide();

    console.log('Game begins.  heroChosen: ' + heroChosen);

    //creates tiles for heros in array
    playerLife = 100;
    for (i = 0; i < heroList.length; i++) {
      let heroTile = $("<div>");
      heroTile.addClass("heroTile namePlate", heroList[i]);
      heroTile.attr("id", heroList[i]);
      heroTile.attr("data-tile", heroList[i]);
      heroTile.html('<p>' + heroList[i] + '</p>');
      $(".heroHolder").append(heroTile);
    }
    //makes hero tiles clickable to perform game function
    $('.heroTile').click(function() {
      //creates confirm hero button when a heroTile is clicked
      let confirmButton = $('<button>');
      confirmButton.attr('id', 'confirmHeroButton');
      confirmButton.addClass('btn btn-lg btn-dark confirm-button');
      confirmButton.text("Confirm Hero Selection");
      //When the hero confirm button is clicked:
      confirmButton.click(function() {
        //changes message text
        console.log('Button pressed.  heroChosen: '+heroChosen)
        message.text('Choose Your Enemies!');
        submessage.text('Select any 3 available heros to fight!')
        //changes confirm boolian to true
        heroConfirm = true;
        //changes selected hero classes to isolate and move it to the side
        $('.champSelect .heroTile').addClass('playersHero chosenTile').removeClass('heroTile');
        //changes champ select display to accomidate evolving choices
        $('.champSelect').addClass('gameDisplay tempDisplay');
        //hides hero confirm button after choice is made
        $(confirmButton).hide();
        //creates confirm enemy button
        let confirmButton2 = $('<button>');
        confirmButton2.addClass('btn btn-lg btn-dark confirm-button');
        confirmButton2.text('Choose your enemies');
        confirmButton2.attr('id', 'enemyConfirmButton');

        // if(enemyCounter===3){
        $('#buttonSpot').append(confirmButton2);
        // }
        //disables button until 3 enemies are chosen

        //confirm enemy button functions
        confirmButton2.click(function() {
          //resets enemyTeamReady = which is only needed once.
          enemyTeamReady=false;
          //if player tries to select confirm button without selecting 3 enemies, gets this message.
          if(enemyCounter<3){
            message.text('Please Select 3 Enemies')
          }
          if(enemyCounter>=3){
          //hides confirm button
          confirmButton2.hide();
          //swithes enemy confirm true
          enemyConfirm = true;
          //increments heroChosen
          heroChosen++;
          //changes display to accomidate progress
          $('#championSelect').removeClass('gameDisplay').addClass('battleDisplay');
          //shows player and enemy area
          player.show();
          enemy.show();
          //moves users Hero to battle area
          $('#player').addClass('gameOn').append($('.chosenTile'));
          //hides unused heros
          $('.heroHolder').hide();
          message.text('Choose Your First Opponent...');
          console.log('heroChosen Step 3:' + heroChosen);
          //
          //Assigns stats to characters:
          playerLife = 100 + Math.floor(Math.random() * 100);
          playerAttack = 20 + Math.floor(Math.random() * 20);


          enemyLife = 50 + Math.floor(Math.random() * 70);
          enemyAttack = 10 + Math.floor(Math.random() * 10);

          console.log('Player life: ' + playerLife);
          console.log('Player attack: ' + playerAttack);

          console.log('Enemy life: ' + enemyLife);
          console.log('Enemy attack: ' + enemyAttack);
        }
        });

      });

      //displays champ in center area
      if (heroChosen === 0) {
        $(".champSelect").append($(this));
        $("#buttonSpot").append(confirmButton);
        $('.champSelect').show();

        heroChosen++;
      }
      //cycles through champions to select
      if (heroChosen === 1 && heroConfirm === false) {
        $('.heroHolder').append($('.champSelect .heroTile'));
        $(".champSelect").append($(this));
        message.text('Confirm Your Hero!');
        console.log('Cycle through hero.  heroChosen:' + heroChosen);
      }
      //Select Enemies
      if (heroConfirm === true && heroChosen >= 1 && enemyCounter <4) {
        enemyCounter++;
        console.log('enemyCounter: '+enemyCounter);
        $('.champSelect').append($(this));
        $('.champSelect').removeClass('tempDisplay');
        heroChosen++;
        console.log('Enemy Selector! heroChosen: ' + heroChosen);
      }
      if(enemyCounter>3){
        enemyTeamReady=true;
        console.log("enemyTeamReady: "+enemyTeamReady);
      }else{
        enemyTeamReady=false;
        console.log("enemyTeamReady: "+enemyTeamReady);
      }

      if (enemyTeamReady === true && heroChosen<6) {
        $('.champSelect').append($(this));
        $('.heroHolder').append($('.gameDisplay .heroTile').first());
        console.log('attempt to cycle enemies. heroChosen: '+heroChosen);
      }
      // if(heroChosen>4 && enemyConfirm===false){
      //   heroChosen--;
      // }








      if (heroChosen === 6 && enemyConfirm === true) {
        stats.show().text('VS');
        $(this).addClass('fightBox challenger');
        $('#enemy').append($(this));
        heroChosen++;
        console.log('heroChosen Step 4: ' + heroChosen);


        let confirmButton3 = $('<button>');
        confirmButton3.addClass('btn btn-lg btn-dark confirm-button');
        confirmButton3.text('Attack!');
        confirmButton3.attr('id', 'confirmButton3');
        $('#buttonSpot2').append(confirmButton3);
        confirmButton3.click(function() {
          // stats.text('Health Remaining ' + playerLife);
          if (heroChosen === 7) {
            playerLife = playerLife - enemyAttack;
            enemyLife = enemyLife - playerAttack;
            console.log('Player life: ' + playerLife);
            console.log('Enemy life: ' + enemyLife);
          }
          if (enemyLife <= 0 && heroChosen === 7) {
            heroChosen++;
            message.text('Enemy Defeated! Choose another...');
            submessage.text('Can you defeat the next challenger?');
            $('.heroHolder').append($('.challenger'));
            $('.heroHolder .challenger').removeClass('.challenger');
            $('#confirmButton3').prop('disabled', true);
            enemyConfirm = false;
            console.log("challenger removed");
            console.log('Enemy defeated, heroChosen: ' + heroChosen);
          }

            $('.heroTile').click(function() {
//sets up 2nd opponent
            if(heroChosen===8&&enemyConfirm===false){
              enemyConfirm = true;
              $('#confirmButton3').prop('disabled', false);
              $('#enemy').append($(this));
              $(this).addClass('challenger');
              heroChosen++;
              console.log('Next Opponent Selected. heroChosen!!!!: ' + heroChosen);
              console.log(enemyConfirm);
              enemyLife = 50 + Math.floor(Math.random() * 70);
              enemyAttack = 10 + Math.floor(Math.random() * 10);
            }
            });

          if (heroChosen === 9 && enemyConfirm === true) {
            heroChosen++;
            console.log('move along please, heroChosen: ' + heroChosen);



          }
          if (heroChosen === 10 && enemyConfirm===true) {
            playerLife = playerLife - enemyAttack;
            enemyLife = enemyLife - playerAttack;

            console.log('moved along quite nicely');
            console.log('playerlife: ' + playerLife);
            console.log('playerAttack: ' + playerAttack);
            console.log('enemylife: ' + enemyLife);
            console.log('enemyAttack: ' + enemyAttack);
          }
          if (enemyLife <= 0 && heroChosen === 10) {
            heroChosen++;
            $('#confirmButton3').prop('disabled', true);
            $('#heroHldr').append($('.challenger'));
            console.log('appending!' + heroChosen);
            enemyConfirm=false;
          }
          $('.heroTile').click(function(){
          if(heroChosen===11 && enemyConfirm===false){
            heroChosen++;
            enemyConfirm=true;
            $('#confirmButton3').prop('disabled', false);
            $('#enemy').append($(this));
            $(this).addClass('challenger');
            console.log('adding 3rd challenger, heroChosen: ' + heroChosen);
        }
        if(heroChosen===12 && enemyConfirm===true){
          heroChosen++;
          enemyLife = 50 + Math.floor(Math.random() * 70);
          enemyAttack = 10 + Math.floor(Math.random() * 10);
        console.log('moved along quite nicely');
        }
      });
      if(heroChosen===13 && enemyConfirm===true){
        playerLife = playerLife - enemyAttack;
        enemyLife = enemyLife - playerAttack;

        console.log('playerlife: ' + playerLife);
        console.log('playerAttack: ' + playerAttack);
        console.log('enemylife: ' + enemyLife);
        console.log('enemyAttack: ' + enemyAttack);
      }
      if(enemyLife <=0 && heroChosen === 13){
        $('#heroHldr').append($('.challenger'));
        console.log('END GAME!!!');
        message.text('Congradulations! You won!');
        submessage.text('Press restart to play again!');
        confirmButton3.hide();
        restart.show();
        $('#buttonSpot2').append($('#restartButton'));
        gameOver=true;
      }
      stats.text('Health Remaining ' + playerLife);
      console.log(playerLife);


      if( playerLife <=0){
      $('#heroHldr').append($('.heroTile'));
      $('.rowClass').addClass('rowClassLose');
      $('#confirmButton3').hide();
      message.text('You Lost!');
      submessage.text('Click restart to try again!');
      console.log("LOST");
      restart.show();
      $('#buttonSpot2').append(restart);
      $('#confirmButton3').hide();
      confirmButton3.hide();
      gameOver = true;

      $('#buttonSpot2').append(restart);
      restart.click(function(){
        if (gameOver===true && heroChosen>0){
          console.log('wtf');
          gameOver=false;
          enemyConfirm=false;
          heroConfirm=false;
          enemyTeamReady=false;
          enemyCounter=0;
          $('.champSelect').addClass('tempDisplay');
          $('#championSelect').removeClass('battleDisplay').addClass('gameDisplay');
          ($('#heroHldr')).empty();
          // ($('.rowClassLose')).empty();
          player.empty();
          enemy.empty();
          stats.empty();
          ($('.champSelect').hide());
          // ($('.champSelect')).empty();
          heroChosen=0;
          $('.heroHolder').show();
          restart.hide();
          message.text('Select Your Hero!');
          submessage.text('');
          gameStart();
    }
});
        // gameStart();


      }



      });

      }

    });
    //end of gamestart function
    if (gameOver===true && heroChosen>0){
      $('#buttonSpot2').append($('#restartButton'))}
  };

  //player selection and moving of hero tiles to battle area



  //game processes


  gameStart();



// initalize();
  //end of wrapper
});
