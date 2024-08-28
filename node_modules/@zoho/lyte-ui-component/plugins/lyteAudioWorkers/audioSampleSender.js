class AudioSampleSender extends AudioWorkletProcessor {

	constructor() {
		super();
		this.buffer = [];
	}

	process( inputs, outputs, parameters ) {
		if( inputs[ 0 ][ 0 ] ) {
			this.pushData( inputs[ 0 ][ 0 ] );
			this.port.postMessage( this.buffer );
			this.buffer = [];
		}
		

    	return true;
	}

	pushData( samples ) {		
		for( var i = 0; i < samples.length; i++ ) {
			this.buffer.push( samples[ i ] );
		}
	}

}

registerProcessor('audio-sample-processor', AudioSampleSender );