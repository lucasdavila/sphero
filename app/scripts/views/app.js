/*global sphero, Backbone, JST*/

sphero.Views = sphero.Views || {};

(function () {
    'use strict';

    sphero.Views.AppView = Chute.View.extend({

        template: JST['app/scripts/templates/app.ejs'],

        container: '#app_container',

        events: {
            'click #upload': 'upload'
        },

        upload: function(e) {
            e.preventDefault();

            console.log('todo upload');
        },

    });

})();
