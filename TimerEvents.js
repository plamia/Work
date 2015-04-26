function TimerEvents(){
    this._params = {
        timeOut : 3000,
        loopCount : 1
    };
    this._loops = 0;
    this._forceStop = false;
    
    /* Events resion */
    this.OnTimeEvent = null;
    this.OnLifeEnd = null;
    
    /* Execution region */
    this.Start = function(Parameters){
        this._params = $.extend( this._params, Parameters || {} );
        this._loops = 0;
        this._checkIncomeparams();
        this._startlife();
    };
    this.Stop = function(){
        this._forceStop = true;
    };
    this._startlife = function(){
        var that = this;
        setTimeout( function(){
            if( that._forceStop === true ) return;
            that._loops += 1;
            if( typeof that.OnTimeEvent === "function" ) {
                that.OnTimeEvent( that._loops );
            }
            if( that._loops === that._params.loopCount ) {
                if( typeof that.OnLifeEnd === "function" ) {
                    that.OnLifeEnd();
                }
                return;
            }
            that._startlife();
        }, this._params.timeOut );
    };
    this._checkIncomeparams = function(){
        if( typeof this._params.timeOut !== "number") {
               console.log('please enter number fo params timeOut');
               this.Stop();
            };
         if (this._params.timeOut < 0 || this._params.timeOut >100000) {
                console.log('please enter number between 0 and 100000');
                this.Stop();
        };
        
        if( typeof this._params.loopCount !== "number") {
               console.log('please enter number fo params loopCount');
               this.Stop();
            };    
       
        if (this._params.loopCount < 0 || this._params.loopCount >2000) {
               console.log('please enter number between 0 and 2000');
               this.Stop();
        };

    };
}