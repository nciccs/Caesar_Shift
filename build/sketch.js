var innerWheelImage;
var outerWheelImage;

var innerWheelSprite;
var outerWheelSprite;

var innerWheelRadius;

var shift = 0;
var angle = 360 / 26 / 2;

var mouseHeldInner = false;

var input;
var output;

var outputText = "";

function preload()
{
    innerWheelImage = loadImage('img/Cipher Disc Inner Wheel.png');
    outerWheelImage = loadImage('img/Cipher Disc Outer Wheel.png');
}

function setup()
{
    // put setup code here
    createCanvas(480, 360);

    outerWheelSprite = createSprite(width/2, height/2-25, 10, 10);
    outerWheelSprite.addImage('outerWheel', outerWheelImage);
    outerWheelSprite.scale = 0.8;

    outerWheelSprite.rotation = 77;

    innerWheelSprite = createSprite(width/2, height/2-25, 10, 10);
    innerWheelSprite.addImage('innerWheel', innerWheelImage);
    innerWheelSprite.scale = 0.8;
    innerWheelRadius = innerWheelSprite.width * innerWheelSprite.scale / 2;
    innerWheelSprite.rotation = 77;

    innerWheelSprite.onMousePressed = function()
    {
        if(dist(this.position.x, this.position.y, mouseX, mouseY) < innerWheelRadius)
        {
            mouseHeldInner = true;
            output.style('display', 'none');
        }
    };

    input = createInput();
    input.size(width * 0.9, input.height);
    input.position(width/2-input.width/2, height-30);
    //input.input(inputEvent);
    input.attribute('onkeypress', "inputEvent()");


    output = createElement('textarea', outputText);
    output.size(output.width, 50);
    output.position(width/2-input.width/2, height-110);
    output.attribute('readOnly', 'true');
    output.style('font-size', '18px');
    output.style('display', 'none');
}

function inputEvent()
{
    if(keyCode == ENTER)
    {
        outputText = "";

        let inputText = input.value().toUpperCase();

        for(let i = 0; i < inputText.length; i++)
        {
            if(/^[a-zA-Z]+$/.test(inputText[i]))
            {
                let index = inputText.charCodeAt(i) - 'A'.charCodeAt(0);
                let modIndex = mod(index+shift, 26);

                outputText += String.fromCharCode('A'.charCodeAt(0) + modIndex);
            }
        }

        output.value(outputText);
        output.style('display', 'block');
    }
}

function mod(n, m)
{
    return ((n % m) + m) % m;
}

function draw()
{
    // put drawing code here
    background(200);

    mouseClickAndHold();

    drawSprites();

    textSize(20);
    text("shift: " + shift, 10, 25);

    push();
    textSize(15);
    text('Outer wheel is plaintext. Inner wheel is ciphertext', 10, 40, 100, 100);
    textAlign(CENTER);
    text("Hold down left mouse button on inner wheel to change shift, then type", width/2, height-37);
    pop();
}

function mouseClickAndHold()
{
    if(mouseHeldInner)
    {
        if(mouseX > innerWheelSprite.position.x)
        {
            angle += 1;
            innerWheelSprite.rotation++;
        }
        else
        {
            angle -= 1;
            innerWheelSprite.rotation--;
        }

        shift = Math.floor(angle/(360/26));
    }
}

function mouseReleased()
{
    mouseHeldInner = false;
}

