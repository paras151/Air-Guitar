const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 1,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.85,    // confidence threshold for predictions.
  }
  
  navigator.getUserMedia = navigator.getUserMedia;

  const video = document.querySelector("#video");
  const audio = document.querySelector("#audio");

  let model;

  handTrack.startVideo(video).then(status =>{
        if(status){
            navigator.getUserMedia({video:{}},stream=>{
                video.srcObject = stream;
                setInterval(runDetection,100)
            },
            err=> console.log(err)
            )
        }
    })

    function runDetection(){
        model.detect(video).then(predictions=>{
            if(predictions.length!==0){
                let hand1 = predictions[0].bbox;
                let x = hand1[0];
                let y = hand1[1];
                console.log(x)

                if(y>300){
                    if(x<200){
                        audio.src = "A.wav";
                    }
                    else if(x>200){
                        audio.src = "B.wav";
                    }
                    else if(x>300){
                        audio.src = "C.mp3";
                    }
                    else if(x>400){
                        audio.src = "D.wav";
                    }
                }

                audio.play();
            }
        })
    }
  handTrack.load(modelParams).then(lmodel => {
    model = lmodel;
  });