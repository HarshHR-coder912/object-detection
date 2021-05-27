img = "";
status = "";
objects = [];


function preload() {
    img = loadImage('sacred-cat-.jpg');
}

function draw() {
    image(img, 0, 0, 640, 420);

    if(status != "")
    {
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("#000000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x - 50, objects[i].y -80);
            noFill();
            stroke("#000000");
            rect(objects[i].x - 250, objects[i].y - 100, objects[i].width, objects[i].height);
        }
    }
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}