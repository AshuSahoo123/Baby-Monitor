img = "";
status = "";

function preload() {
    song = loadSound("siren.mp3");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects!";
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            
            fill(r, g, b);

            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);

            noFill();

            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == "person") {
                document.getElementById("noo").innerHTML = "Baby found";
                song.stop();
            }
            else {
                document.getElementById("noo").innerHTML = "BABY IS NOT FOUND";
                song.play();
            }
        }

        if (objects.length == 0) {
            document.getElementById("noo").innerHTML = "BABY IS NOT FOUND";
            song.play();
        }
    }
}

function modelLoaded() {
    console.log("The model is loaded!");
    status = true;
}

function gotResults() {
    if(error) {
        console.log(error);
    }

    console.log(results);
}