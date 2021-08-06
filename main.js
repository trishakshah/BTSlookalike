Webcam.set({
    width:400,
    height:300,
    image_format:'png',
    png_quality:100
});

var camera=document.getElementById("camera");
Webcam.attach('#camera');

function clickImage(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="clickedImg" src="'+data_uri+'">';
    });
}

var classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ZKUGeOoWM/",modelLoaded);
console.log("ML5 Version: ",ml5.version);

function modelLoaded(){
    console.log("Model loaded.")
}

function identify(){
    img=document.getElementById("clickedImg");
    classifier.classify(img,getResults);
}

function getResults(error,result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("objectName").innerHTML=result[0].label;
        document.getElementById("objectAccuracy").innerHTML=result[0].confidence.toFixed(3);
    }
}