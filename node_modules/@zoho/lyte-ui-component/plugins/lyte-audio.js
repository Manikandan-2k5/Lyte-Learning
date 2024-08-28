( function() {
    var audioContext, intervalId, config, microphone, inputNode, wavProcessingNode, worker;

    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    $L.media = {};

    var sendBlobToUser = function( event ) {
        var blob = event.data;

        if( config.onStop ) {
            config.onStop( blob );
        }

        // var a = document.createElement( 'a' );
        // a.setAttribute( 'download', 'testing' );
        // var url = window.URL.createObjectURL( blob );
        // a.setAttribute( 'href', url );
        // document.body.appendChild( a );
        // a.click();
        // a.remove();
    }

    

    $L.media.record = async function( options ) {
        config = options || {};

        var audioContextConstructor =  window.AudioContext || window.webkitAudioContext,
        basePath = config.workletBasePath || '';

        audioContext = new audioContextConstructor();

        microphone = await navigator.mediaDevices.getUserMedia( {
            audio: true
        } );

        registerWorker();

        inputNode = audioContext.createMediaStreamSource( microphone );

        if( isSafari ) {
            useScriptNodeProccessor( inputNode.context, inputNode );
        }
        else {
            useAudioWorklet( audioContext, basePath, inputNode );
        }
        
    }

    function useScriptNodeProccessor( context, inputNode ) {
        var bufferSize = 4096,
        inputChannel = 1,
        outputChannel = 1, 
        node = ( context.createScriptProcessor || context.createJavascriptProcessor ).call( context, bufferSize, inputChannel, outputChannel );

        inputNode.connect( node );
        node.connect( context.destination );

        node.onaudioprocess = ( audioProcessingEvent ) => {
            for( var i = 0; i < inputChannel; i++ ) {
                worker.postMessage( { type: 'data', data: audioProcessingEvent.inputBuffer.getChannelData( i ) } );
            }
        };
    }

    async function useAudioWorklet( audioContext, basePath, inputNode ) {
        await audioContext.audioWorklet.addModule( basePath + 'audioSampleSender.js' );

        wavProcessingNode = new AudioWorkletNode( audioContext, 'audio-sample-processor' );

        inputNode.connect( wavProcessingNode );

        wavProcessingNode.connect( audioContext.destination );

        wavProcessingNode.port.onmessage = function ( e ) {
            worker.postMessage( { type: 'data', data: e.data } );
        }

        enableChunking();
    }

    function registerWorker() {
        var basePath = config.workerBasePath || '';

        worker = new Worker( basePath + 'wavProcessor.js' );

        worker.onmessage = sendBlobToUser;
    }

    function enableChunking() {
        var timeslice = config.timeslice;

        if( !isNaN( timeslice ) ) {
            intervalId = setInterval( function() {
                worker.postMessage( { type: 'process' } );
            }, timeslice );
        }
    }

    $L.media.pause = function() {
        audioContext.suspend();
        window.clearTimeout( intervalId );
    }

    $L.media.resume = function() {
        /* pause, resume only works with this line. 
           Sometimes resuming(resuming after pausing it for a while) is not sending any data to audioWorkletProcessor(input is empty array)
        */ 
        inputNode.connect( wavProcessingNode );
        enableChunking();
        audioContext.resume();        
    }

    $L.media.stop = function() {
        stopMediaStream();
        
        window.clearTimeout( intervalId );

        worker.postMessage( { type: 'process' } );
    }

    function stopMediaStream() {
        var tracks = microphone.getAudioTracks();

        for( var i = 0; i < tracks.length; i++ ) {
            tracks[ i ].stop();
        }

        audioContext.close();
    }
} )();

