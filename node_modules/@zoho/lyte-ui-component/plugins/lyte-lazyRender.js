;(function(){
  if(lyteDomObj){
    lyteDomObj.prototype.lazyRender = function(arg){
      var _this = this[0];
      if(arg && !arg.onEnd){
        arg.onEnd = function(){}
      }
      if(arg && !arg.startLoader){
        arg.startLoader = function(){}
      }
      if(arg && !arg.endLoader){
        arg.endLoader = function(){}
      }
      if(!arg.dataToRender){
        arg.dataToRender = []
      }

      if(arg.dataToRender.length < 1){
        // initialRenderCount
        for (var i = 0; i < arg.renderConfig.initialRenderCount; i++) {
          Lyte.arrayUtils( arg.dataToRender , 'push' , arg.entireData[i]);
        }
      }

      function scrollEndFunction(){
        if(_this.offsetHeight+_this.scrollTop >= _this.scrollHeight){
          var animationConfig = arg.renderConfig.pushCount
          var initialConfigVal = 0;

          function pushData(){

            var arr = arg.entireData.slice(arg.dataToRender.length , arg.dataToRender.length+arg.renderConfig.renderCount)

            if(arg.renderConfig.loader !== 'undefined' && arg.renderConfig.loader === false){
              Lyte.objectUtils( arg.renderConfig , "add" , "loader" , true )
            }
            arg.startLoader()

            Lyte.arrayUtils( arg.dataToRender , 'push' , arr);

            if(arg.renderConfig.loader !== 'undefined' && arg.renderConfig.loader === true){
              Lyte.objectUtils( arg.renderConfig , "add" , "loader" , false )
            }
            arg.endLoader()

            // Lyte.arrayUtils( arg.dataToRender , 'push' , [arg.entireData[ arg.entireData.length+initialConfigVal ] , arg.entireData[ arg.entireData.length+initialConfigVal+1 ] ])

            initialConfigVal+=arg.renderConfig.renderCount

            if(initialConfigVal >= animationConfig){
                arr = []
                window.cancelAnimationFrame(pushData)
                return
            }

          }


          if(arg.entireData.length <= arg.dataToRender.length){
            var res = arg.onEnd();
            if(res){
              res.then(function(){
                window.requestAnimationFrame(pushData)
              })
            }
            if(arg.entireData.length >= arg.dataToRender.length){
                window.requestAnimationFrame(pushData)
            }
          } else {
            window.requestAnimationFrame(pushData)
          }

        }

      }
      $L(this).bindScroll(scrollEndFunction)
      // this[0].addEventListener('scroll' , scrollEndFunction)
    }
  }
}());
