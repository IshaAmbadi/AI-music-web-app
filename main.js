track1 = "";
track2 = "";

function preload() {
    track1 = loadSound("funkmusicTrack1.mp3");
    track2 = loadSound("swingmusicTrack2.mp3")
}

function setup() {
    canvas = createCanvas(1279, 720);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 1279, 720)

}