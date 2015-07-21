'use strict';



module.exports = function (sails) {
 	return { 
 		defaults: {
      
    },

		configure: function () {
      
      if (!_.isObject(sails.config.humpback)){
      	sails.config.humpback = { };
      }

      //this.models = models;
     
    },
		initialize: function (next) {
			var err, eventsToWaitFor = [];

    	// It's very important to trigger this callback method when you are finished
  		// with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  		next();
          
		}

};

