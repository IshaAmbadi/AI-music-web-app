track1 = "";
track2 = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

playTrack1 = 0;
playTrack2 = 0;

function preload() {
    track1 = loadSound("funkmusicTrack1.mp3");
    track2 = loadSound("swingmusicTrack2.mp3")


}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotposes)
}

function draw() {
    image(video, 0, 0, 600, 500)

        fill('red');
        stroke('red');
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX,leftWristY,30);
        leftWristYAsNumber = Number(leftWristY);
        roundedNumberY = floor(leftWristYAsNumber);
        track2.stop()

        if (playTrack1 == false) {
            track1.play()
            document.getElementById("songPlaying").innerHTML = "Current song playing - Funk Music";
        }

        playTrack1 = track1.isPlaying()
        console.log("status of song 1 is "+playTrack1);
    }
}


function modelLoaded() {
    console.log('PoseNet is initialized');
}

function gotposes(results) {
    if(results.length > 0) {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("confidence = " + scoreLeftWrist);
    }
}