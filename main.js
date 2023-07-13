track1 = "";
track2 = "";
function preload() {
    track1 = loadSound("funkmusicTrack1.mp3");
    track2 = loadSound("swingmusicTrack2.mp3")
}

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

playTrack1 = 0;
playTrack2 = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotposes)
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
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("confidence = " + scoreRightWrist);
    }
}

function draw() {
    image(video, 0, 0, 600, 500)

    playTrack1 = track1.isPlaying()
    console.log("status of song 1 is " + playTrack1);

        fill('red');
        stroke('red');

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX,leftWristY,20);
        track2.stop()

        if (playTrack1 == false) {
            track1.play()
            document.getElementById("songPlaying").innerHTML = "Current song playing - Funk Music";
        }
    }

    playTrack2 = track2.isPlaying()
    console.log("status of song 2 is " + playTrack2);

    if (scoreRightWrist > 0.2) {
        circle(rightWristX,rightWristY,20);
        track1.stop()

        if (playTrack2 == false) {
            track2.play()
            document.getElementById("songPlaying").innerHTML = "Current song playing - Swing Music";
        }
    }
}