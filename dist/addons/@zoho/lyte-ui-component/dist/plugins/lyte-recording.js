
if($L)
{  
   $L.Recording = {}; 
   var afterStart ;
   var content =[];
   var resolveFunc;
   $L.Recording.start = function(recordingObj)
   {
     var device = navigator.mediaDevices.getUserMedia(recordingObj);
     device.then( function(stream)  
     {
       var recorder = new MediaRecorder(stream,recordingObj.options);
       recorder.ondataavailable = function(e)
       {  
         content.push(e.data);
        
         recordingObj.onDataAvailable(e.data);
         
         
        }
        recorder.onstop = function(e)
        {  resolveFunc(content);
          content =[];
        }
        afterStart = recorder;
        recorder.start(recordingObj.timeSlice);
       })
    } 
   
    
    $L.Recording.stop = function()
    {
     
      return(new Promise(function (resolve)
      {  afterStart.stop();
        resolveFunc = resolve;
      })); 
    }
}


