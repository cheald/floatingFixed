/*
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
*/

(function($) {
  var $window, triggers, windowScroll;
  triggers = [];
  $.fn.floatingFixed = function(options) {
    var r;
    options = $.extend({}, $.floatingFixed.defaults, options);
    r = $(this).each(function() {
      var $this, pos;
      $this = $(this);
      pos = $this.position();
      pos.position = $this.css("position");
      $this.data("floatingFixedOrig", pos);
      $this.data("floatingFixedOptions", options);
      return triggers.push($this);
    });
    windowScroll();
    return r;
  };
  $.floatingFixed = $.fn.floatingFixed;
  $.floatingFixed.defaults = {
    padding: 0
  };
  $window = $(window);
  windowScroll = function() {
    var i, off_, opt, pos, scrollY, t, top, _results;
    try {
      if (triggers.length === 0) {
        return;
      }
      scrollY = $window.scrollTop();
      i = 0;
      _results = [];
      while (i < triggers.length) {
        t = triggers[i];
        opt = t.data("floatingFixedOptions");
        if (!t.data("isFloating")) {
          off_ = t.offset();
          t.data("floatingFixedTop", off_.top);
          t.data("floatingFixedLeft", off_.left);
        }
        top = top = t.data("floatingFixedTop");
        if (top < scrollY + opt.padding && !t.data("isFloating")) {
          t.css({
            position: "fixed",
            top: opt.padding + "px",
            left: t.data("floatingFixedLeft"),
            width: t.width()
          }).data("isFloating", true);
        } else if (top >= scrollY + opt.padding && t.data("isFloating")) {
          pos = t.data("floatingFixedOrig");
          t.css(pos).data("isFloating", false);
        }
        _results.push(i++);
      }
      return _results;
    } catch (error) {
      return $window.unbind("scroll", windowScroll).unbind("resize", windowScroll);
    }
  };
  return $window.bind("scroll", windowScroll).bind("resize", windowScroll);
})(jQuery);