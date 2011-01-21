/***********************************************************************
This is a simple plugin to allow you to toggle an element between 
position: absolute and position: fixed based on the window scroll 
position. This lets you have an apparently inline element which floats 
to stay on the screen once it would otherwise scroll off the screen. 

Author: Chris Heald (cheald@mashable.com) 

Copyright (c) 2011, Chris Heald All rights reserved. 

Redistribution and use in source and binary forms, with or without 
modification, are permitted provided that the following conditions are 
met: 

Redistributions of source code must retain the above copyright notice, 
this list of conditions and the following disclaimer. Redistributions in 
binary form must reproduce the above copyright notice, this list of 
conditions and the following disclaimer in the documentation and/or 
other materials provided with the distribution. Neither the name of the 
project nor the names of its contributors may be used to endorse or 
promote products derived from this software without specific prior 
written permission. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS 
AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, 
INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY 
AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL 
THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, 
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT 
NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF 
USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON 
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT 
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF 
THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 

***********************************************************************/

(function($) {
  var triggers = [];
  $.fn.floatingFixed = function(options) {
    options = $.extend({}, $.floatingFixed.defaults, options);
    var r = $(this).each(function() {
      var $this = $(this), pos = $this.position();
      $this.data("floatingFixedTop", pos.top);
      $this.data("floatingFixedLeft", pos.left);
      $this.data("floatingFixedOptions", options);
      $this.data("floatingFixedTopOrigTop", $this.css("top"));
      triggers.push($this);
    });
    windowScroll();    
    return r;
  }
  
  $.floatingFixed = $.fn.floatingFixed;
  $.floatingFixed.defaults = {
    padding: 0
  }
  
  var $window = $(window);
  var windowScroll = function() {
    if(triggers.length === 0) { return; }
    var scrollY = $window.scrollTop();
    for(var i = 0; i < triggers.length; i++) {
      var t = triggers[i], opt = t.data("floatingFixedOptions"), top = t.data("floatingFixedTop");
      if(top < scrollY + opt.padding && !t.data("isFloating")) {        
        t.css({position: 'fixed', top: opt.padding, left: t.data("floatingFixedLeft") }).data("isFloating", true);
      } else if(top >= scrollY + opt.padding && t.data("isFloating")) {
        t.css({position: null, top: null, left: null}).data("isFloating", false);
      }
    }
  };
  
  $window.scroll(windowScroll).resize(windowScroll);
})(jQuery);