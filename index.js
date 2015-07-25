'use strict';

module.exports = function (sails) {
 	return { 
 		defaults: {
      routes: {
        '/gui': {
          view: 'gui'
        }
      }
    },

		configure: function () {
      
      if (!_.isObject(sails.config.humpback)){
      	sails.config.humpback = { };
      }
     
    },
		initialize: function (next) {
			var err, eventsToWaitFor = [];
      
      //wait for orm hook to be loaded
      if (sails.hooks.orm) {
        eventsToWaitFor.push('hook:orm:loaded');
      }else{
        err = new Error();
        err.code = 'E_HOOK_INITIALIZE';
        err.name = 'Humpback Hook Error';
        err.message = 'The "humpback" hook depends on the "orm" hook- cannot load the "humpback" hook without it!';
        return next(err);
      }

      //wait for pub sub hook to be loaded
      if (sails.hooks.pubsub) {
        eventsToWaitFor.push('hook:pubsub:loaded');
      }else{
        err = new Error();
        err.code = 'E_HOOK_INITIALIZE';
        err.name = 'Humpback Hook Error';
        err.message = 'The "humpback" hook depends on the "pubsub" hook- cannot load the "humpback" hook without it!';
        return next(err);
      }

      //apply validation hook
      sails.after(eventsToWaitFor, function() {
    	// It's very important to trigger this callback method when you are finished
  		// with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  		  next();
      });
          
		}
  };
};

