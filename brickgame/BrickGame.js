var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var ballSpeed = 9;
var lifeInterval = 15;
var dx = ballSpeed;
var dy = -ballSpeed;
var numPositionX;
var numPositionY;
var cursorX;
var cursorY;
var paddleHeight = 10;
var paddleWidth = 130;
var paddleX = (canvas.width-paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var aPressed = false;
var brickRowCount = 12;
var brickColumnCount = 12;
var brickWidth = 60;
var brickHeight = 25;
var brickPadding = 0;
var brickOffsetTop = 60;
var brickOffsetLeft = 0;
var score = 0;
var lives = 3;
var combo;
var breakBrick = 0;
var itemPosX = 0;
var itemPosY = 0;
var getItemStatus = 0;
var itemUse = 0;
var equipItem = 0;
var randomValue = 0;
var minBallLocationX;
var maxBallLocationX;
var minBallLocationY;
var maxBallLocationY;
var minBallLocation2X;
var maxBallLocation2X;
var autoPaddle;
var mouseClicked = 0;
var gameStateHome = 0;
var gameEnding = 1;
var gameStateLevelUp = 2;
var gameStateRound1 = 11;
var gameStateRound2 = 12;
var gameStateRound3 = 13;
var gameStateRound4 = 14;
var time = 0;
var initRound = 0;
var beforeLevel = 0;
var gameStartTimer = -1;
var particleNum = 0;
var gameRestartTimer = 0;
var endTime = 0;
var bellCount = 0;

var gameState = gameStateHome;

var explosionArray = [];
for(var i = 0; i < 6; i++){
    explosionArray.push({ explosionTimer: 0, dx: 0, dy: 0, dw: 0, dh: 0, explosionOn: false });
} // 폭발탄 효과 배열

var flameArray = [];
for(var i = 0; i < 10; i++){
    flameArray.push({ flameTimer: 0, dx: 0, dy: 0, dw: 0, dh: 0, flameOn: false });
} // 폭발탄 효과 배열

var particleArray = [];
for(var i = 0; i < 12; i++){
    particleArray.push({ particleTimer: 0, dx: 0, dy: 0, dw: 0, dh: 0, particleOn: false });
} // 폭발탄 효과 배열

var imgPortal = [];
for(var i  = 0; i < 40; i ++){
    imgPortal[i] = new Image();
    imgPortal[i].src = "gif/portal/portal" + i + ".png";
}

var imgRaindrop = [];
for(var i  = 0; i < 29; i ++){
    imgRaindrop[i] = new Image();
    imgRaindrop[i].src = "gif/raindrop/raindrop" + i + ".png";
}

var imgDeadlyMoons = [];
for(var i  = 0; i < 23; i ++){
    imgDeadlyMoons[i] = new Image();
    imgDeadlyMoons[i].src = "gif/DeadlyMoon/deadlyMoon" + i + ".png";
}

var imgRaincity = [];
for(var i  = 0; i < 8; i ++){
    imgRaincity[i] = new Image();
    imgRaincity[i].src = "gif/raincity/raincity" + i + ".png";
}

var imgWaterdrop = [];
for(var i  = 0; i < 50; i ++){
    imgWaterdrop[i] = new Image();
    imgWaterdrop[i].src = "gif/waterdrop/waterdrop" + i + ".png";
}

var imgGameMain = [];
for(var i  = 0; i < 20; i ++){
    imgGameMain[i] = new Image();
    imgGameMain[i].src = "gif/gameMain/gameMain" + i + ".png";
}

var imgGameEnding = [];
for(var i  = 0; i < 31; i ++){
    imgGameEnding[i] = new Image();
    imgGameEnding[i].src = "gif/gameEnding/gameEnding" + i + ".png";
}

var imgDawn = [];
for(var i  = 0; i < 28; i ++){
    imgDawn[i] = new Image();
    imgDawn[i].src = "gif/dawn/dawn-" + i + ".png";
}

var imgSunrise = [];
for(var i  = 0; i < 54; i ++){
    imgSunrise[i] = new Image();
    imgSunrise[i].src = "gif/sunrise/sunrise" + i + ".png";
}

var imgExplosion = [];
for(var i  = 0; i < 37; i ++){
    imgExplosion[i] = new Image();
    imgExplosion[i].src = "gif/explosion/explosion" + i + ".png";
}

var imgFlame = [];
for(var i  = 0; i < 21; i ++){
    imgFlame[i] = new Image();
    imgFlame[i].src = "gif/flame/flame-" + i + ".png";
}

var imgParticle = [];
for(var i  = 0; i < 12; i ++){
    imgParticle[i] = new Image();
    imgParticle[i].src = "gif/particle/particle" + i + ".png";
}

var imgPieces = new Image();
imgPieces.src = "img/breakout_pieces.png";

var imgCustom = new Image();
imgCustom.src = "img/breakout_custom.png";
imgPieces.addEventListener("load", summonItem,false);

var imgBallPokeball = new Image();
imgBallPokeball.src = "img/pokeball.png";

var imgPlayButton = new Image();
imgPlayButton.src = "img/playButton.png";

var imgBreakout = new Image();
imgBreakout.src = "img/breakout.png";

var imgRound1 = new Image();
imgRound1.src = "img/round1.png";

var imgRound2 = new Image();
imgRound2.src = "img/round2.png";

var imgRound3 = new Image();
imgRound3.src = "img/round3.png";

var imgRound4 = new Image();
imgRound4.src = "img/round4.png";

var imgWin = new Image();
imgWin.src = "img/win.png";


var backgroundMusic = new Audio("sounds/Sakuria.mp3");
backgroundMusic.controls = true;
backgroundMusic.loop = true;

var rainSound = new Audio("sounds/rain1.ogg");
rainSound.controls = true;
rainSound.loop = true;

var getItemSound = new Audio("sounds/getItem.mp3");
var portalSound = new Audio("sounds/portal.mp3");
var levelUpSound = new Audio("sounds/levelUp.ogg");

var collisionSounds = [];
for(i = 0; i < 6; i++)
    collisionSounds[i] = new Audio("sounds/bit.ogg");
collisionSounds[6] = 0;
var brickHitSounds = [];
for(i = 0; i < 6; i++)
    brickHitSounds[i] = new Audio("sounds/break1.ogg");
brickHitSounds[6] = 0;
var explosionSounds = [];
for(i = 0; i < 6; i++)
    explosionSounds[i] = new Audio("sounds/explode2.ogg");
var flameSounds = [];
for(i = 0; i < 10; i++)
    flameSounds[i] = new Audio("sounds/twinkle_far1.ogg");

var imgNum = [];
imgNum.push({"img":imgPieces, "sx":304, "sy":48, "sw":5, "sh":8, "numPosX":numPositionX, "numPosY":numPositionY, "dw":12, "dh":21});
imgNum.push({"img":imgPieces, "sx":311, "sy":48, "sw":5, "sh":8, "numPosX":numPositionX, "numPosY":numPositionY, "dw":12, "dh":21});
imgNum.push({"img":imgPieces, "sx":316, "sy":48, "sw":5, "sh":8, "numPosX":numPositionX, "numPosY":numPositionY, "dw":12, "dh":21});
imgNum.push({"img":imgPieces, "sx":322, "sy":48, "sw":5, "sh":8, "numPosX":numPositionX, "numPosY":numPositionY, "dw":12, "dh":21});
imgNum.push({"img":imgPieces, "sx":328, "sy":48, "sw":5, "sh":8, "numPosX":numPositionX, "numPosY":numPositionY, "dw":12, "dh":21});
imgNum.push({"img":imgPieces, "sx":334, "sy":48, "sw":5, "sh":8, "numPosX":numPositionX, "numPosY":numPositionY, "dw":12, "dh":21});
imgNum.push({"img":imgPieces, "sx":340, "sy":48, "sw":5, "sh":8, "numPosX":numPositionX, "numPosY":numPositionY, "dw":12, "dh":21});
imgNum.push({"img":imgPieces, "sx":304, "sy":57, "sw":5, "sh":8, "numPosX":numPositionX, "numPosY":numPositionY, "dw":12, "dh":21});
imgNum.push({"img":imgPieces, "sx":310, "sy":57, "sw":5, "sh":8, "numPosX":numPositionX, "numPosY":numPositionY, "dw":12, "dh":21});
imgNum.push({"img":imgPieces, "sx":316, "sy":57, "sw":5, "sh":8, "numPosX":numPositionX, "numPosY":numPositionY, "dw":12, "dh":21});

var bricks = [];
function makeBricks(){
    for(var c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(var r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1, itemBrick: 1};
        }
    } // 변수에 지정해둔 벽돌의 행렬 값을 통해 벽돌 행렬을 구현
    getItemStatus = 0;
    equipItem = 0;
    itemUse = 0;
    getItemStatus = 0;
    dx = 9;
    dy = 9;
    x = canvas.width/2;
    y = canvas.height-30;
    if(score > 10)
        score += 200;
    // 초기화 구문
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("load", drawBall, false);

function keyDownHandler(e) {
    console.log(e.key);
    if(e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
    else if(e.key === "a"|| e.key === "A") {
        if(aPressed) aPressed = false;
        else aPressed = true;
    }
    else if(e.key === "n"|| e.key === "N") {
        beforeLevel = gameState;
        gameState = gameStateLevelUp
    }
    else if(e.key === "t"|| e.key === "T") {
        dx *= 1.2;
        dy *= 1.2;
    }
    else if(e.key === "r" || e.key === "R") {
        score = 0;
        gameState = gameStateHome;
        backgroundMusic.pause();
        rainSound.pause();
        lives = 3;
        equipItem = 0;
        itemUse = 0;
        getItemStatus = 0;
    }
}

function keyUpHandler(e) {
    if(e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}
// 마우스의 눌러짐을 감지하여 true, false로 값을 변경해주는 부분

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status > 0) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    if(b.status === 1){
                        particleArray[particleNum].particleOn = true;
                        particleArray[particleNum].particleTimer = 12;

                        particleArray[particleNum].dx =  x - 80;
                        particleArray[particleNum].dy =  y - 70;
                        particleArray[particleNum].dw = 150;
                        particleArray[particleNum].dh = 100;
                        particleNum++;
                        if(particleNum > 11)
                            particleNum = 0;
                    }
                    if(b.status > 30 && time > 600){
                        getItemStatus = 0;
                        itemPosY = 0;
                        getItemStatus = 7;
                        time = 0;
                    }
                    dy = -dy;
                    brickHitSounds[brickHitSounds[6]++ % 6].play().catch(function(e){});
                    b.status--;
                    breakBrick++;
                    if(b.status > 0)
                        b.itemBrick = 2;
                    if(equipItem > 1 && b.itemBrick > 0 && itemUse > 0){
                        minBallLocationX = Math.floor(x / 60) - 2;
                        minBallLocationY = Math.floor((y - 60) / 25) - 2;
                        maxBallLocationX = minBallLocationX + 5;
                        maxBallLocationY = minBallLocationY + 5;
                        minBallLocation2X = Math.floor(x / 60) - 1;
                        maxBallLocation2X = minBallLocationX + 4;
                        if(minBallLocationX < 0)
                            minBallLocationX = 0;
                        if(minBallLocation2X < 0)
                            minBallLocationX = 0;
                        if(maxBallLocationX > brickRowCount)
                            maxBallLocationX = brickRowCount;
                        if(maxBallLocation2X > brickRowCount)
                            maxBallLocation2X = brickRowCount;
                        if(minBallLocationY < 0)
                            minBallLocationY = 0;
                        if(maxBallLocationY > brickColumnCount)
                            maxBallLocationY = brickColumnCount;
                        if(equipItem === 2 && itemUse > 0){
                            for(var lineX = minBallLocationX; lineX < maxBallLocationX; lineX++){
                                bricks[c][lineX].status--;
                                score++;
                            }
                            for(var lineY = minBallLocationY; lineY < maxBallLocationY; lineY++){
                                bricks[lineY][r].status--;
                                score++;
                            }
                            for(var lineX = minBallLocation2X; lineX < minBallLocation2X; lineX++){
                                bricks[maxBallLocationY - 1][lineX].status--;
                                score++;
                            }
                            if(minBallLocationY <= maxBallLocationY){
                                for(var lineX = minBallLocation2X; lineX < maxBallLocation2X; lineX++){
                                    if(minBallLocation2X > 1){
                                        bricks[minBallLocationY + 1][lineX].status--;
                                        score++;
                                    }
                                }
                            }
                            explosionArray[itemUse - 1].explosionOn = true;
                            explosionArray[itemUse - 1].explosionTimer = 37;

                            explosionArray[itemUse - 1].dx =  x - 100;
                            explosionArray[itemUse - 1].dy =  y - 100;
                            explosionArray[itemUse - 1].dw = 200;
                            explosionArray[itemUse - 1].dh = 200;
                            explosionSounds[itemUse - 1].play().catch(function(e){});
                        } //  폭발탄 발생 시 발생하는 이벤트 처리 및 폭발 위치 지정
                        if(equipItem === 6 && itemUse > 0){
                            flameArray[itemUse - 1].flameOn = true;
                            flameArray[itemUse - 1].flameTimer = 20;

                            flameArray[itemUse - 1].dx =  x - 160;
                            flameArray[itemUse - 1].dy =  y - 220;
                            flameArray[itemUse - 1].dw = 300;
                            flameArray[itemUse - 1].dh = 200;
                            flameSounds[itemUse - 1].play().catch(function(e){});
                            if(b.status < 30)
                                b.status = 0;
                        }
                        itemUse--;
                    }
                    b.itembrick = 0;
                    score++;
                    if(dx > 13 || dy > 13 || dx < -13 || dy < -13)
                        score++;
                    if(dx > 18 || dy > 18 || dx < -18 || dy < -18)
                        score++;
                    if(dx > 22 || dy > 22 || dx < -22 || dy < -22)
                        score++;
                    if(dx > 25 || dy > 25 || dx < -25 || dy < -25)
                        score++;
                    if(dx > 29 || dy > 29 || dx < -29 || dy < -29)
                        score += 3;
                    /*if(score === brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATS!");
                        document.location.reload();
                    }*/
                }
            }
        }
    }
} // 공과 벽돌의 충돌을 감지하고 벽돌을 부수며 모든 벽돌이 파괴되었을 경우 클리어 문구를 출력하는 부분

function drawBall() {
    ctx.beginPath();
    ctx.drawImage(imgPieces, 84, 136, 8, 8, x - 10, y - 10, 21, 21);
    //ctx.drawImage(imgBallPokeball, x - 13, y - 12, 22, 22);
    /*ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();*/
    ctx.closePath();
} // 벽돌을 부숴줄 공을 생성

function drawPaddle() {
    ctx.beginPath();
    ctx.drawImage(imgPieces, 144, 151, 64, 19, paddleX, canvas.height - paddleHeight - 8, 64 * paddleWidth / 65, 19 * paddleHeight / 10);
    /*    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();*/
    ctx.closePath();
} // 튕겨져나온 공을 받아칠 패들을 생성

function musicOn(){
    if(gameState > 10)
        backgroundMusic.play().catch(function(e){});
    if(gameState < 13 && gameState > 10)
        rainSound.play().catch(function (e){});
    if(gameState > 12 || gameState < 11)
        rainSound.pause();
}

function drawWaterDrop(){
    ctx.beginPath();
    ctx.drawImage(imgWaterdrop[Math.floor(time / 3 ) % 49], 0, 0, 192, 192, 250, 700, 192, 192 );
    ctx.closePath();
}
function drawBackground1() {
    ctx.beginPath();
    ctx.drawImage(imgGameMain[Math.floor(time / 3 ) % 20], 0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgPlayButton, 0, 0, 600, 200, canvas.width / 2 - 170, canvas.height * 0.7, 350, 150);
    if(cursorX > 200 && cursorX < 500 && cursorY > 650 && cursorY < 780){
        drawWaterDrop();
        if(mouseClicked === 1){
            gameState = gameStateLevelUp;
            beforeLevel = 0;
        }
    }
    ctx.closePath();
}

function drawBackground2() {
    ctx.beginPath();
    ctx.drawImage(imgRaindrop[Math.floor(time / 9) % 29], 0, 0, canvas.width, canvas.height);
    ctx.closePath();
}

function drawBackground3() {
    ctx.beginPath();
    ctx.drawImage(imgRaincity[Math.floor(time / 9) % 7], 0, 0, canvas.width, canvas.height);
    ctx.closePath();
}

function drawBackground4() {
    ctx.beginPath();
    ctx.drawImage(imgDawn[Math.floor(time / 9) % 27], 0, 0, canvas.width, canvas.height);
    ctx.closePath();
}

function drawBackground5() {
    ctx.beginPath();
    ctx.drawImage(imgSunrise[Math.floor(time / 9) % 53], 0, 0, canvas.width, canvas.height);
    ctx.closePath();
}

function drawBackground6() {
    ctx.beginPath();
    ctx.drawImage(imgGameEnding[Math.floor(time / 3) % 31], 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(255,249,248)";
    ctx.font = '90px Fantasy';
    ctx.textBaseline = "top";
    ctx.fillText("Your score is...", canvas.width * 0.1, canvas.height * 0.1);
    ctx.fillStyle = "rgba(255,237,203,0.61)";
    ctx.font = '80px Fantasy';
    ctx.textBaseline = "top";
    ctx.fillText("Restart to press 'r'", canvas.width * 0.1, canvas.height * 0.8);
    if(endTime === 0){
        endTime = time;
        bellCount++;
    }
    if(bellCount > 0 && bellCount < 8 && time % 50 === endTime % 50){
        if(bellCount === 1 || score % 10 > 1){
            levelUpSound.play().catch(function(e){});
        }
        if(bellCount === 2 || score % 100 > 1){
            levelUpSound.play().catch(function(e){});
        }
        if(bellCount === 3 || score % 1000 > 1){
            levelUpSound.play().catch(function(e){});
        }
        if(bellCount === 4 || score % 10000 > 1){
            levelUpSound.play().catch(function(e){});
        }
        if(bellCount === 5 || score % 100000 > 1){
            levelUpSound.play().catch(function(e){});
        }
        if(bellCount === 6 || score % 1000000 > 1){
            levelUpSound.play().catch(function(e){});
        }
        if(bellCount === 7 || score % 10000000 > 1){
            levelUpSound.play().catch(function(e){});
        }
        bellCount++;
    }
    if(time > endTime + 50){
        ctx.fillStyle = "rgb(255,249,248)";
        ctx.font = '90px Fantasy';
        ctx.textBaseline = "top";
        ctx.fillText(" " + Math.floor(score % 10), canvas.width * 0.7, canvas.height * 0.5);
    }
    if(time > endTime + 100){
        if(score >= 10){
            ctx.fillStyle = "rgb(255,249,248)";
            ctx.font = '90px Fantasy';
            ctx.textBaseline = "top";
            ctx.fillText(" " + Math.floor(score / 10 % 10), canvas.width * 0.6, canvas.height * 0.5);
        }
    }
    if(time > endTime + 150){
        if(score >= 100){
            ctx.fillStyle = "rgb(255,249,248)";
            ctx.font = '90px Fantasy';
            ctx.textBaseline = "top";
            ctx.fillText(" " + Math.floor(score / 100 % 10), canvas.width * 0.5, canvas.height * 0.5);
        }
    }
    if(time > endTime + 200){
        if(score >= 1000){
            ctx.fillStyle = "rgb(255,249,248)";
            ctx.font = '90px Fantasy';
            ctx.textBaseline = "top";
            ctx.fillText(" " + Math.floor(score / 1000 % 10), canvas.width * 0.4, canvas.height * 0.5);
        }
    }
    if(time > endTime + 250){
        if(score >= 10000){
            ctx.fillStyle = "rgb(255,249,248)";
            ctx.font = '90px Fantasy';
            ctx.textBaseline = "top";
            ctx.fillText(" " + Math.floor(score / 10000 % 10), canvas.width * 0.3, canvas.height * 0.5);
        }
    }
    if(time > endTime + 300){
        if(score >= 100000){
            ctx.fillStyle = "rgb(255,249,248)";
            ctx.font = '90px Fantasy';
            ctx.textBaseline = "top";
            ctx.fillText(" " + score / Math.floor(100000 % 10), canvas.width * 0.2, canvas.height * 0.5);
        }
    }
    if(time > endTime + 350) {
        if (score >= 1000000) {
            ctx.fillStyle = "rgb(255,249,248)";
            ctx.font = '90px Fantasy';
            ctx.textBaseline = "top";
            ctx.fillText(" " + score / Math.floor(1000000 % 10), canvas.width * 0.1, canvas.height * 0.5);
        }
    }
    ctx.closePath();
}

function animationHandler() {
    for (var i =0 ; i < 6; i++){
        if (explosionArray[i].explosionOn === true){ //폭발 이벤트 발생 시
            if (explosionArray[i].explosionTimer > 0) { //타이머가 0이상일 경우

                ctx.drawImage(
                    imgExplosion[explosionArray[i].explosionTimer % 37],
                    explosionArray[i].dx,
                    explosionArray[i].dy,
                    explosionArray[i].dw,
                    explosionArray[i].dh); //타이머 시간동안 재생

                explosionArray[i].explosionTimer -= 1; //타이머 감소

                if (explosionArray[i].explosionTimer === 0) // 0일경우 해당 폭발이 끝났으므로 상태를 false로 설정
                    explosionArray[i].explosionOn = false;
            }
        }
    }
}

function animationHandler2() {
    for (var i =0 ; i < 10; i++){
        if (flameArray[i].flameOn === true){ //플레임 이벤트 발생 시
            if (flameArray[i].flameTimer > 0) { //타이머가 0이상일 경우

                ctx.drawImage(
                    imgFlame[flameArray[i].flameTimer % 20],
                    flameArray[i].dx,
                    flameArray[i].dy,
                    flameArray[i].dw,
                    flameArray[i].dh); //타이머 시간동안 재생

                flameArray[i].flameTimer -= 1; //타이머 감소

                if (flameArray[i].flameTimer === 0) // 0일경우 해당 플레임이 끝났으므로 상태를 false로 설정
                    flameArray[i].flameOn = false;
            }
        }
    }
}

function animationHandler3() {
    for (var i =0 ; i < 12; i++){
        if (particleArray[i].particleOn === true){
            if (particleArray[i].particleTimer > 0) {

                ctx.drawImage(
                    imgParticle[particleArray[i].particleTimer % 12],
                    particleArray[i].dx,
                    particleArray[i].dy,
                    particleArray[i].dw,
                    particleArray[i].dh);

                particleArray[i].particleTimer -= 1;

                if (particleArray[i].particleTimer === 0)
                    particleArray[i].particleOn = false;
            }
        }
    }
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var brickX;
            var brickY;
            if(bricks[c][r].status === 1) {
                brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.drawImage(imgPieces, 8, 8, 32, 16, brickX, brickY - 12, 63, 24);
                /* ctx.rect(brickX, brickY, brickWidth, brickHeight);
                 ctx.fillStyle = "#0095DD";
                 ctx.fill();*/
                ctx.closePath();
            }
            if(bricks[c][r].status === 2) {
                brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.drawImage(imgPieces, 8, 28, 32, 16, brickX, brickY - 12, 63, 24);
                ctx.closePath();
            }
            if(bricks[c][r].status === 3) {
                brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.drawImage(imgPieces, 8, 48, 32, 16, brickX, brickY - 12, 63, 24);
                ctx.closePath();
            }
            if(bricks[c][r].status === 4) {
                brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.drawImage(imgPieces, 8, 68, 32, 16, brickX, brickY - 12, 63, 24);
                ctx.closePath();
            }
            if(bricks[c][r].status === 5) {
                brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.drawImage(imgPieces, 8, 88, 32, 16, brickX, brickY - 12, 63, 24);
                ctx.closePath();
            }
            if(bricks[c][r].status === 6) {
                brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.drawImage(imgPieces, 8, 108, 32, 16, brickX, brickY - 12, 63, 24);
                ctx.closePath();
            }
            if(bricks[c][r].status > 50){
                brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.drawImage(imgCustom, 0, 16, 32, 16, brickX, brickY - 12, 63, 24);
                ctx.closePath();
            }
        }
    }
} // 앞서 만들어둔 벽돌 행렬을 토대로 벽돌을 그려냄

function drawScore() {
    ctx.drawImage(imgPieces, 328, 26, 5, 8, canvas.width * 0.02, lifeInterval, 12, 21);
    ctx.drawImage(imgPieces, 316, 8, 5, 8, canvas.width * 0.04, lifeInterval, 12, 21);
    ctx.drawImage(imgPieces, 304, 26, 5, 8, canvas.width * 0.06, lifeInterval, 12, 21);
    ctx.drawImage(imgPieces, 322, 26, 5, 8, canvas.width * 0.08, lifeInterval, 12, 21);
    ctx.drawImage(imgPieces, 328, 8, 5, 8, canvas.width * 0.10, lifeInterval, 12, 21);
    ctx.drawImage(imgPieces, 323, 57, 5, 8, canvas.width * 0.12, lifeInterval, 12, 21);
    imgNumDraw(score % 10, canvas.width * 0.25, lifeInterval);
    if(score >= 10)
        imgNumDraw(Math.floor(score / 10 % 10), canvas.width * 0.23, lifeInterval);
    if(score >= 100)
        imgNumDraw(Math.floor(score / 100 % 10), canvas.width * 0.21, lifeInterval);
    if(score >= 1000)
        imgNumDraw(Math.floor(score / 1000 % 10), canvas.width * 0.19, lifeInterval);
    if(score >= 10000)
        imgNumDraw(Math.floor(score / 10000 % 10), canvas.width * 0.17, lifeInterval);
    if(score >= 100000)
        imgNumDraw(Math.floor(score / 100000 % 10), canvas.width * 0.15, lifeInterval);
    if(score >= 1000000)
        imgNumDraw(Math.floor(score / 1000000 % 10), canvas.width * 0.13, lifeInterval);
    /*ctx.font = "16px Arial";
    ctx.fillStyle = "#dd0091";
    ctx.fillText("Score: "+score, 8, 20);*/
} // 화면에 벽돌을 파괴해서 얻은 점수를 표시

function drawItem(){
    ctx.drawImage(imgPieces, 310, 17, 5, 8, canvas.width * 0.426, lifeInterval, 12, 21);
    ctx.drawImage(imgPieces, 334, 26, 5, 8, canvas.width * 0.44, lifeInterval, 12, 21);
    ctx.drawImage(imgPieces, 328, 8, 5, 8, canvas.width * 0.46, lifeInterval, 12, 21);
    ctx.drawImage(imgPieces, 334, 17, 5, 8, canvas.width * 0.48, lifeInterval, 12, 21);
    ctx.drawImage(imgPieces, 323, 57, 5, 8, canvas.width * 0.50, lifeInterval, 12, 21);
    imgNumDraw(itemUse % 10, canvas.width * 0.54, lifeInterval);
    if(itemUse >= 10)
        imgNumDraw(Math.floor(itemUse / 10 % 10), canvas.width * 0.52, lifeInterval);
}

function drawLives() {
    ctx.drawImage(imgPieces, 328, 17, 5, 8, canvas.width * 0.69, lifeInterval, 12, 21);
    ctx.drawImage(imgPieces, 311, 17, 5, 8, canvas.width * 0.715, lifeInterval, 12, 21);
    ctx.drawImage(imgPieces, 334, 8, 5, 8, canvas.width * 0.73, lifeInterval, 12, 21);
    ctx.drawImage(imgPieces, 328, 8, 5, 8, canvas.width * 0.75, lifeInterval, 12, 21);
    ctx.drawImage(imgPieces, 323, 57, 5, 8, canvas.width * 0.77, lifeInterval, 12, 21);

    if(lives > 0)
        ctx.drawImage(imgPieces, 120, 135, 10, 9, canvas.width * 0.79, lifeInterval, 36, 25);
    if(lives > 1)
        ctx.drawImage(imgPieces, 120, 135, 10, 9, canvas.width * 0.83, lifeInterval, 36, 25);
    if(lives > 2)
        ctx.drawImage(imgPieces, 120, 135, 10, 9, canvas.width * 0.87, lifeInterval, 36, 25);
    if(lives > 3)
        ctx.drawImage(imgPieces, 120, 135, 10, 9, canvas.width * 0.91, lifeInterval, 36, 25);
    if(lives > 4)
        ctx.drawImage(imgPieces, 120, 135, 10, 9, canvas.width * 0.95, lifeInterval, 36, 25);
    if(lives > 5){
        lives = 5;
    }
    /*ctx.font = "16px Arial";
    ctx.fillStyle = "#dd00aa";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);*/
} // 화면에 플레이어의 남은 목숨의 수를 표시

function draw() {
    ctx.clearRect(200, 0, canvas.width, canvas.height);
    if(gameState === gameStateHome){
        drawBackground1();
    }
    if(gameState > 10){
        if(gameState === gameStateRound1){
            drawBackground2();
            if(initRound === 0){
                makeBricks();
                for(var c=0; c<brickColumnCount / 12; c++) {
                    bricks[c] = [];
                    for(var r=0; r<brickRowCount; r++) {
                        bricks[c][r] = { x: 0, y: 0, status: 2, itemBrick: 1};
                    }
                }
                for(var c=brickColumnCount / 12 * 11; c<brickColumnCount; c++) {
                    bricks[c] = [];
                    for(var r=0; r<brickRowCount; r++) {
                        bricks[c][r] = { x: 0, y: 0, status: 2, itemBrick: 2};
                    }
                }
                for(var r = 0; r < brickColumnCount; r++)
                    bricks[1][r] = {x: 0, y: 0, status: 200, itemBrick: 100};
                initRound = 1;
            }
        }
        if(gameState === gameStateRound2){
            drawBackground3();
            if(initRound === 1){
                makeBricks();
                for(var c=0; c<brickColumnCount / 12; c++) {
                    bricks[c] = [];
                    for(var r=0; r<brickRowCount; r++) {
                        bricks[c][r] = { x: 0, y: 0, status: 2, itemBrick: 1};
                    }
                }
                for(var c=brickColumnCount / 12 * 11; c<brickColumnCount; c++) {
                    bricks[c] = [];
                    for(var r=0; r<brickRowCount; r++) {
                        bricks[c][r] = { x: 0, y: 0, status: 2, itemBrick: 2};
                    }
                }
                initRound = 2;
            }
        }
        if(gameState === gameStateRound3){
            drawBackground4();
            if(initRound === 2){
                makeBricks();
                for(var c=0; c<brickColumnCount / 12; c++) {
                    bricks[c] = [];
                    for(var r=0; r<brickRowCount; r++) {
                        bricks[c][r] = { x: 0, y: 0, status: 2, itemBrick: 1};
                    }
                }
                for(var c=brickColumnCount / 12 * 11; c<brickColumnCount; c++) {
                    bricks[c] = [];
                    for(var r=0; r<brickRowCount; r++) {
                        bricks[c][r] = { x: 0, y: 0, status: 2, itemBrick: 2};
                    }
                }
                initRound = 3;
            }
        }
        if(gameState === gameStateRound4){
            drawBackground5();
            if(initRound === 3){
                makeBricks();
                for(var c=0; c<brickColumnCount / 12; c++) {
                    bricks[c] = [];
                    for(var r=0; r<brickRowCount; r++) {
                        bricks[c][r] = { x: 0, y: 0, status: 2, itemBrick: 1};
                    }
                }
                for(var c=brickColumnCount / 12 * 11; c<brickColumnCount; c++) {
                    bricks[c] = [];
                    for(var r=0; r<brickRowCount; r++) {
                        bricks[c][r] = { x: 0, y: 0, status: 2, itemBrick: 2};
                    }
                }
                initRound = 4;
            }
        }
        drawBricks();
        drawBall();
        drawPaddle();
        longPaddleItem();
        drawScore();
        drawItem();
        drawLives();
        collisionDetection();
        summonItem();
        if(getItemStatus > 0){
            dropItem();
        }
        autoItem();
        ballImage();
        autoMode();

        animationHandler(); //애니메이션
        animationHandler2();
        animationHandler3();
        musicOn();
        // 앞서 생성한 함수들을 호출
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            collisionSounds[collisionSounds[6]++ % 6].play().catch(function(e){});
            dx = -dx;
            dy *= 1.05;
            // 튕긴 후 속도
        }
        if(y + dy < ballRadius) {
            collisionSounds[collisionSounds[6]++ % 6].play().catch(function(e){});
            dy = -dy;
            dx *= 1.2;
            // 튕긴 후 속도
        }
        // 공이 벽을 닿으면 반대방향으로 이동하도록 좌표를 수정
        else if(y + dy > canvas.height-ballRadius - 6) {
            if(x > paddleX && x < paddleX + paddleWidth + 16) {
                collisionSounds[collisionSounds[6]++ % 6].play().catch(function(e){});
                if(paddleWidth / (x - paddleX) >= 20){
                    dx = -ballSpeed;
                    dx = dx * 1.5;
                    dy = dy / 1.45;
                }
                if(paddleWidth / (x - paddleX) < 20 && paddleWidth / (x - paddleX) >= 6.66){
                    dx = -ballSpeed;
                    dx = dx * 1.3;
                    dy = dy / 1.25;
                }
                if(paddleWidth / (x - paddleX) < 6.66 && paddleWidth / (x - paddleX) >= 3.33){
                    dx = -ballSpeed;
                    dx = dx * 1.15;
                    dy = dy / 1.13;
                }
                if(paddleWidth / (x - paddleX) < 3.33 && paddleWidth / (x - paddleX) >= 2.5){
                    dx = -ballSpeed;
                    dx = dx * 1.08;
                    dy = dy / 1.08;
                }
                if(paddleWidth / (x - paddleX) < 2.7  && paddleWidth / (x - paddleX) >= 1.62){
                    dx = 1.03;
                    dy = dy * 1.1;
                }
                if(paddleWidth / (x - paddleX) < 1.55  && paddleWidth / (x - paddleX) >= 1.42){
                    dx = ballSpeed;
                    dx = dx * 1.08;
                    dy = dy / 1.08;
                }
                if(paddleWidth / (x - paddleX) < 1.42  && paddleWidth / (x - paddleX) >= 1.17){
                    dx = ballSpeed;
                    dx = dx * 1.15;
                    dy = dy / 1.13;
                }
                if(paddleWidth / (x - paddleX) < 1.17  && paddleWidth / (x - paddleX) >= 1.05){
                    dx = ballSpeed;
                    dx = dx * 1.3;
                    dy = dy / 1.25;
                }
                if(paddleWidth / (x - paddleX) < 1.05 && paddleWidth / (x - paddleX) >= 1){
                    dx = ballSpeed;
                    dx = dx * 1.5;
                    dy = dy / 1.45;
                }
                dy = -dy;
                combo = 0;
            }
            else {
                lives--;
                gameRestartTimer = 0;
                if(!lives) {
                    draw();
                    setTimeout(function() {
                        alert("GAME OVER");
                        document.location.reload()
                    }, 1);
                }
                else {
                    x = canvas.width / 2;
                    y = canvas.height - 70;
                    dx = ballSpeed;
                    dy = -ballSpeed;
                    paddleX = (canvas.width-paddleWidth)/2;
                }
            }
        }
        // 공이 바닥에 닿으면 게임오버
        /*if(rightPressed && paddleX < canvas.width-paddleWidth) {
            paddleX += 7;
        }
        else if(leftPressed && paddleX > 0) {
            paddleX -= 7;
        }*/ // 키보드 입력으로 패들을 움직일 경우 패들의 속도를 지정하는 부분

        if(paddleX < 0) {
            paddleX += 5;
        }
        else if(paddleX + paddleWidth > canvas.width) {
            paddleX -= 5;
        }

        if(rightPressed) {
            paddleX += 5;
        }
        else if(leftPressed) {
            paddleX -= 5;
        }

        if(rightPressed && paddleX < canvas.width-paddleWidth) {
            paddleX += 5;
        }
        else if(leftPressed && paddleX > 0) {
            paddleX -= 5;
        }
        x += dx;
        y += dy;
    }

    gameLevelUpCheck();

    if(gameState === gameEnding){
        drawBackground6();
    }
    if(mouseClicked > 0)
        mouseClicked = 0;
    time++;
    if(gameRestartTimer === 0 && gameState > 10){
        itemUse = 0;
        equipItem = 0;
        x = canvas.width / 2;
        y = canvas.height - 70;
        getItemStatus = 0;
        itemPosY = 0;
        ctx.fillStyle = "rgba(255,242,206,0.62)";
        ctx.font = '40px Fantasy';
        ctx.textBaseline = "top";
        ctx.fillText("Left Click to shot ball", canvas.width * 0.25, canvas.height * 0.8);
    }
    if(dx > 0 && dx < 5)
        dx = 5;
    if(dx > -5 && dx < 0)
        dx = -5;
    if(dy > 0 && dy < 5)
        dy = 5;
    if(dy > -5 && dy < 0)
        dy = -5;
    if(dx > 30)
        dx = 30;
    if(dx < -30)
        dx = -30;
    if(dy > 30)
        dy = 30;
    if(dy < -30)
        dy = -30;
    // 공속도가 비정상적으로 느려지거나 빨라지면 일정속도로 설정
    requestAnimationFrame(draw); // 고정 프레임 속도보다 게임을 더 잘 렌더링 할 수 있도록 설정
}

draw(); // draw 함수를 실행하여 실제 게임이 동작 되도록 함

function imgNumDraw(i, numPositionX, numPositionY){
    ctx.drawImage(imgNum[i].img, imgNum[i].sx, imgNum[i].sy, imgNum[i].sw, imgNum[i].sh, numPositionX, numPositionY, imgNum[i].dw, imgNum[i].dh);
}

function imgNumDrawFinal(i, numPositionX, numPositionY){
    ctx.drawImage(imgNum[i].img, imgNum[i].sx, imgNum[i].sy, imgNum[i].sw, imgNum[i].sh, numPositionX, numPositionY, 50, 80);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function summonItem() {
    if(breakBrick > 0 && itemPosY === 0 && itemUse < 1){
        if(getRandomInt(1, 1000) < 250){
            randomValue = getRandomInt(1, 1000);
            if(randomValue > 1 && randomValue <= 100)
                getItemStatus = 1;
            else if(randomValue > 100 && randomValue <= 350)
                getItemStatus = 2;
            else if(randomValue > 350 && randomValue <= 500)
                getItemStatus = 3;
            else if(randomValue > 500 && randomValue <= 700)
                getItemStatus = 4;
            else if(randomValue > 700 && randomValue <= 850)
                getItemStatus = 5;
            else if(randomValue > 850 && randomValue <= 950)
                getItemStatus = 6;
            else if(randomValue > 950 && randomValue <= 1000)
                getItemStatus = 7;
        }
        breakBrick = 0;
    }
}

function dropItem() {
    if(itemPosX === 0 && itemPosY === 0){
        itemPosX = x;
        itemPosY = y - 30;
    }
    itemPosY += 3;
    if(getItemStatus === 1){
        ctx.drawImage(imgCustom, 32, 0, 16, 16, itemPosX, itemPosY, 30, 30);
        if(itemPosX > paddleX && itemPosX < paddleX + paddleWidth && itemPosY > canvas.height - 36 && itemPosY < canvas.height){
            getItemSound.play().catch(function(e){});
            if(lives === 5)
                score *= 1.2;
            lives++;
            getItemStatus = 0;
            itemUse = 0;
            itemPosY = 10000;
        }
    }
    if(getItemStatus === 2){
        ctx.drawImage(imgCustom, 0, 0, 16, 16, itemPosX, itemPosY, 30, 30);
        if(itemPosX > paddleX && itemPosX < paddleX + paddleWidth && itemPosY > canvas.height - 36 && itemPosY < canvas.height){
            getItemSound.play().catch(function(e){});
            equipItem = 2;
            itemUse = 6;
            itemPosY = 10000;
        }
    }
    if(getItemStatus === 3){
        ctx.drawImage(imgCustom, 48, 0, 16, 16, itemPosX, itemPosY, 30, 30);
        if(itemPosX > paddleX && itemPosX < paddleX + paddleWidth && itemPosY > canvas.height - 36 && itemPosY < canvas.height){
            getItemSound.play().catch(function(e){});
            equipItem = 3;
            itemUse = 9;
            itemPosY = 10000;
        }
    }
    if(getItemStatus === 4){
        ctx.drawImage(imgCustom, 16, 0, 16, 16, itemPosX, itemPosY, 30, 30);
        if(itemPosX > paddleX && itemPosX < paddleX + paddleWidth && itemPosY > canvas.height - 36 && itemPosY < canvas.height){
            getItemSound.play().catch(function(e){});
            equipItem = 4;
            itemUse = 15;
            itemPosY = 10000;
        }
    }
    if(getItemStatus === 5){
        ctx.drawImage(imgCustom, 80, 0, 16, 16, itemPosX, itemPosY, 30, 30);
        if(itemPosX > paddleX && itemPosX < paddleX + paddleWidth && itemPosY > canvas.height - 36 && itemPosY < canvas.height && getItemStatus === 5){
            getItemSound.play().catch(function(e){});
            dx = dx * 0.7;
            dy = dx * 0.7;
            getItemStatus = 0;
            itemUse = 0;
            itemPosY = 10000;
        }
    }
    if(getItemStatus === 6){
        ctx.drawImage(imgCustom, 128, 0, 16, 16, itemPosX, itemPosY, 30, 30);
        if(itemPosX > paddleX && itemPosX < paddleX + paddleWidth && itemPosY > canvas.height - 36 && itemPosY < canvas.height){
            getItemSound.play().catch(function(e){});
            equipItem = 6;
            itemUse = 10;
            itemPosY = 10000;
        }
    }
    if(getItemStatus === 7){
        ctx.drawImage(imgCustom, 144, 0, 16, 16, itemPosX, itemPosY, 30, 30);
        if(itemPosX > paddleX && itemPosX < paddleX + paddleWidth && itemPosY > canvas.height - 36 && itemPosY < canvas.height){
            getItemSound.play().catch(function(e){});
            itemUse = 1;
            beforeLevel = gameState;
            gameState = gameStateLevelUp;
            gameRestartTimer = 0;
            itemPosY = 10000;
        }
    }
    if(itemPosY > canvas.height){
        itemPosX = 0;
        itemPosY = 0;
        getItemStatus = 0;
    }
    if(itemUse < 0)
        equipItem = 0;
    if(equipItem < 1)
        itemUse = 0;
}

function autoItem(){
    if(equipItem === 3 && itemUse > 0){
        if(y > canvas.height - 70)
            paddleX = x - getRandomInt(1 , paddleWidth);
    }
}

function longPaddleItem(){
    if(equipItem === 4 && itemUse > 0){
        paddleWidth = 260;
    }
    else paddleWidth = 130;
}

function ballImage(){
    if(itemUse > 0){
        if(equipItem === 2)
            ctx.drawImage(imgPieces, 66, 136, 8, 8, x - 12, y - 12, 25, 25);
        if(equipItem === 3){
            autoPaddle = getRandomInt(1,6);
            if(autoPaddle === 1)
                ctx.drawImage(imgPieces, 76, 151, 64, 19, paddleX, canvas.height - paddleHeight - 8, 64 * paddleWidth / 65, 19 * paddleHeight / 10);
            if(autoPaddle === 2)
                ctx.drawImage(imgPieces, 8, 151, 64, 19, paddleX, canvas.height - paddleHeight - 8, 64 * paddleWidth / 65, 19 * paddleHeight / 10);
            if(autoPaddle === 3)
                ctx.drawImage(imgPieces, 212, 151, 64, 19, paddleX, canvas.height - paddleHeight - 8, 64 * paddleWidth / 65, 19 * paddleHeight / 10);
            if(autoPaddle === 4)
                ctx.drawImage(imgPieces, 8, 175, 64, 19, paddleX, canvas.height - paddleHeight - 8, 64 * paddleWidth / 65, 19 * paddleHeight / 10);
            if(autoPaddle === 5)
                ctx.drawImage(imgPieces, 76, 175, 64, 19, paddleX, canvas.height - paddleHeight - 8, 64 * paddleWidth / 65, 19 * paddleHeight / 10);
            if(autoPaddle === 6)
                ctx.drawImage(imgPieces, 144, 175, 64, 19, paddleX, canvas.height - paddleHeight - 8, 64 * paddleWidth / 65, 19 * paddleHeight / 10);
        }
        if(equipItem === 6)
            ctx.drawImage(imgPieces, 48, 136, 8, 8, x - 12, y - 12, 25, 25);
    }

}

function autoMode(){
    if(aPressed){
        if(y > canvas.height - 40)
            paddleX = x - getRandomInt(1 , paddleWidth);
        if(itemPosY > canvas.height - 40 && itemPosY < canvas.height)
            paddleX = itemPosX - getRandomInt(1 , paddleWidth);
        ctx.drawImage(imgPieces, 304, 8, 5, 8, canvas.width * 0.02, canvas.height - 3 * lifeInterval, 18, 31.5);
        ctx.drawImage(imgPieces, 340, 26, 5, 8, canvas.width * 0.05, canvas.height - 3 * lifeInterval, 18, 31.5);
        ctx.drawImage(imgPieces, 334, 26, 5, 8, canvas.width * 0.075, canvas.height - 3 * lifeInterval, 18, 31.5);
        ctx.drawImage(imgPieces, 304, 26, 5, 8, canvas.width * 0.10, canvas.height - 3 * lifeInterval, 18, 31.5);
    }
}

function gameLevelUpCheck(){
    if(gameState === 2){
        portalSound.play().catch(function(e){});
        ctx.drawImage(imgPortal[Math.floor(time / 2 ) % 39], 0, 0, 500, 500, 0, 0, canvas.width, canvas.height);
        gameStartTimer++;
        gameRestartTimer = 0;
        if(beforeLevel === 0){
            if(gameStartTimer > 0 && gameStartTimer < 50)
                ctx.drawImage(imgRound1, 0, 0, 560, 161, 80, 400, 560, 161);
            if(gameStartTimer > 50 && gameStartTimer <= 90)
                ctx.drawImage(imgRound1, 0, 162, 560, 161, -70, 400, 840, 242);
            if(gameStartTimer > 90){
                gameStartTimer = 0;
                gameState = beforeLevel + 1;
                if(beforeLevel === 0)
                    gameState = gameStateRound1;
            }
        }
        if(beforeLevel === 11){
            if(gameStartTimer > 0 && gameStartTimer < 50)
                ctx.drawImage(imgRound2, 0, 0, 560, 161, 80, 400, 560, 161);
            if(gameStartTimer > 50 && gameStartTimer <= 90)
                ctx.drawImage(imgRound2, 0, 162, 560, 161, -70, 400, 840, 242);
            if(gameStartTimer > 90){
                gameStartTimer = 0;
                gameState = beforeLevel + 1;
            }
        }
        if(beforeLevel === 12){
            if(gameStartTimer > 0 && gameStartTimer < 50)
                ctx.drawImage(imgRound3, 0, 0, 560, 161, 80, 400, 560, 161);
            if(gameStartTimer > 50 && gameStartTimer <= 90)
                ctx.drawImage(imgRound3, 0, 162, 560, 161, -70, 400, 840, 242);
            if(gameStartTimer > 90){
                gameStartTimer = 0;
                gameState = beforeLevel + 1;
            }
        }
        if(beforeLevel === 13){
            if(gameStartTimer > 0 && gameStartTimer < 50)
                ctx.drawImage(imgRound4, 0, 0, 560, 161, 80, 400, 560, 161);
            if(gameStartTimer > 50 && gameStartTimer <= 90)
                ctx.drawImage(imgRound4, 0, 162, 560, 161, -70, 400, 840, 242);
            if(gameStartTimer > 90){
                gameStartTimer = 0;
                gameState = beforeLevel + 1;
            }
        }
        if(beforeLevel === 14){
            ctx.drawImage(imgWin, 100, 0, 560, 161, 20, 400, 560, 161);
            if(gameStartTimer > 90){
                gameStartTimer = 0;
                gameState = gameEnding;
            }
        }
    }
}
document.onmousemove = function(e){
    cursorX = e.pageX;
    cursorY = e.pageY;
}

canvas.addEventListener('click',(arg)=>{
    console.log("beforeLevel = " + beforeLevel);
    console.log("gameState = " + gameState);
    mouseClicked++;
    gameRestartTimer++;
});


/*setInterval(checkCursor, 1000);
function checkCursor(){
    alert("Cursor at: " + cursorX + ", " + cursorY);
}*/