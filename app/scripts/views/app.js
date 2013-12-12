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
            album: 'arOOyzse'
          });

          chooser.on('complete', function(data){
            chooser.close();
          });

          chooser.show();

        },

        handleUpload: function(urls) {
          console.log(urls);
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
