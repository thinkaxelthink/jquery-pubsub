/*

    Refinery29 pub/sub
    Based on Zepto publish/subscribe

    Original is (c) Dojo Foundation 2004-2010. Released under either AFL or new BSD, see:
http://dojofoundation.org/license for more information.

*/

(function ($) {

  // the topic/subscription hash
  var cache = {};

  $.publish = function(/* String */topic, /* Array? */args){
    // summary:
    //    Publish some data on a named topic.
    // topic: String
    //    The channel to publish on
    // args: Array?
    //    The data to publish. Each array item is converted into an ordered
    //    arguments on the subscribed functions.
    //
    // example:
    //    Publish stuff on '/some/topic'. Anything subscribed will be called
    //    with a function signature like: function(a,b,c){ ... }
    //
    //  |   $.publish("/some/topic", ["a","b","c"]);
    if(typeof cache[topic] === 'object') {
      cache[topic].forEach(function(property){
        property.apply($, args || []);
      });
    }
  };

  $.subscribe = function(/* String */topic, /* Function */callback){
    // summary:
    //    Register a callback on a named topic.
    // topic: String
    //    The channel to subscribe to
    // callback: Function
    //    The handler event. Anytime something is $.publish'ed on a
    //    subscribed channel, the callback will be called with the
    //    published array as ordered arguments.
    //
    // returns: Array
    //    A handle which can be used to unsubscribe this particular subscription.
    //
    // example:
    //  | $.subscribe("/some/topic", function(a, b, c){ /* handle data */ });
    //
    if(!cache[topic]){
      cache[topic] = [];
    }
    cache[topic].push(callback);
    return [topic, callback]; // Array
  };

  $.unsubscribe = function(/* Array */handle){
    // summary:
    //    Disconnect a subscribed function for a topic.
    // handle: Array
    //    The return value from a $.subscribe call.
    // example:
    //  | var handle = $.subscribe("/something", function(){});
    //  | $.unsubscribe(handle);

    var t = handle[0];
    cache[t] && $.each(cache[t], function(idx){
      if(this == handle[1]){
        cache[t].splice(idx, 1);
      }
    });
  };

})(jQuery);
