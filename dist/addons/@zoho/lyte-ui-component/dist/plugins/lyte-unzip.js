function strFromU8(dat) {
  return textDecoder.decode(dat);
}

// text decoder
var textDecoder = typeof TextDecoder != "undefined" && new TextDecoder();
// empty
var emptyBuffer = new Uint8Array(0);

// read 4 bytes
var read4Bytes = function (byte, byteIndex) {
  return (
    (byte[byteIndex] |
      (byte[byteIndex + 1] << 8) |
      (byte[byteIndex + 2] << 16) |
      (byte[byteIndex + 3] << 24)) >>>
    0
  );
};

// read 2 bytes
var read2Bytes = function (byte, byteIndex) {
  return byte[byteIndex] | (byte[byteIndex + 1] << 8);
};

//class
var UnZip = (function () {
  function UnZip() {
    this.stream = emptyBuffer;
  }

  UnZip.prototype.push = function (block, final) {
    var old_this = this;
    if (!this.onfile) {
      throw "No Stream Handler";
    } //No Stream Handler
    if (!this.stream) {
      throw "Stream Finished";
    } //Stream Finished

    var flag = 0,
      i = 0,
      buf = void 0;

    if (!this.stream.length) {
      buf = block;
    } else if (!block.length) {
      buf = this.stream;
    } else {
      buf = new Uint8Array(this.stream.length + block.length);
      buf.set(this.stream), buf.set(block, this.stream.length);
    }

    var bufferLength = buf.length;
    var loopThroughZip = function () {
      var header = read4Bytes(buf, i);
      //Entry Header
      if (header == 0x4034b50) {
        flag = 1;
        var fileNameLength = read2Bytes(buf, i + 26);
        var extraFieldLength = read2Bytes(buf, i + 28);
        if (bufferLength > i + 30 + fileNameLength + extraFieldLength) {
          flag = 2;
          var fileName = strFromU8(
            buf.subarray(i + 30, (i += 30 + fileNameLength))
          );
          i += extraFieldLength;
          var file_1 = {
            name: fileName
          };
          this_1.onfile(file_1);
        }
        return "break";
      }
    };

    var this_1 = this;
    for (; i < bufferLength - 4; ++i) {
      var state_1 = loopThroughZip();
      if (state_1 === "break") {
        break;
      }
    }
    this.stream = emptyBuffer;
    if (flag & 2) {
      return this.push(buf.subarray(i), final);
    }
    this.stream = buf.subarray(i);
    if (final) {
      if (this.c) {
        throw "Invalid Zip";
      } //Invalid Zip
      this.stream = null;
    }
  };
  return UnZip;
})();

//Unzipping the uploaded file
function UnzipFolder(filePath) {
  let fileNames = [];
  //Every file has to be accepted!
  var prom = new Promise(async function (resolve, reject) {
    const uz = new UnZip();
    let file = await fetch(filePath);
    file = file.body;
    uz.onfile = (f) => {
      fileNames.push(f.name);
    };
    const reader = file.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        uz.push(new Uint8Array(0), true);
        break;
      }
      uz.push(value);
    }
    resolve(fileNames);
  });
  return prom;
}

//Called when a user changes the selected file
function uploadZipFile(zipfiles) {
  //var zipfiles = zipfiles.target.files;
  var arrayOfPromises = [];
  for (let i = 0; i < zipfiles.length; i++) {
    let file = zipfiles[i];
    var tmppath = URL.createObjectURL(file);
    //The file names will be returned once the whole unzipping is completed.
    arrayOfPromises.push(UnzipFolder(tmppath));
  }
  return Promise.allSettled(arrayOfPromises);
}

$L.unzip = function (files) {
  return uploadZipFile(files);
};
