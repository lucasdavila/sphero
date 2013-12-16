/*global sphero, Backbone, JST*/

sphero.Views = sphero.Views || {};

(function () {
  'use strict';

  sphero.Views.AppView = Chute.View.extend({

    template: JST['app/scripts/templates/app.ejs'],

    container: '#app_container',

    events: {
      'click a.submit': 'upload',
      'click #nav-links a': 'changeTab'
    },

    upload: function(e) {
      e.preventDefault();

      var chooser = new Chute.Chooser({
        client_id: '4f0b30a938ecef2020000003',
        album: 'arOOyzse',
        steps: ['profile', 'privacy', 'selector', 'thanks'],
        stepOptions: {
          profile: {
            title : 'Profile',
            next : 'Next',
            fields: [{
              type: 'text',
              name: 'name',
              label: 'Name',
              required: true
            }, {
              type: 'text',
              name: 'email',
              label: 'Email',
              required: true,
              match: '^([^@\\s]+)@((?:[-a-z0-9]+\\.)+[a-z]{2,})$'
            }, {
              type: 'text',
              name: 'Date of Birth',
              label: 'Date of Birth (MM-DD-YYYY)',
              required: true,
              match: '^([0-9]){1,2}-([0-9]){1,2}-([0-9]){4}$'
            }, {
              type: 'checkbox',
              name: 'newsletter',
              label: 'Yes! I\'d like to join the Sphero newsletter!',
              required: false
            }]
          },
          privacy: {
            title: 'Please read and agree to the privacy policy',
            next: 'I Agree',
            template: '<a href="http://www.gosphero.com/privacy/" target="_blank" style="color:black;text-decoration:underline;">Privacy Policy</a>'
          },
          selector: {
            title : 'Select Your Videos',
            next : 'Next',
            services : ['upload', 'facebook', 'instagram']
          },
          thanks : {
            title : 'Thank you',
            next : 'Done',
            text : 'Thank you! Your videos have been successfully uploaded.'
          }
        }
      });

      chooser.on('complete', function(data){
        chooser.close();
      });

      chooser.show();

    },

    changeTab: function(e) {
      var $target = $(e.target);

      this.$el.find('.tab').hide();
      $($target.attr('href') + '_container').show();

      $target.siblings().removeClass('selected');
      $target.addClass('selected');
    }

  });

})();
