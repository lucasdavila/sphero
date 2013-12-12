/*global sphero, Backbone, JST*/

sphero.Views = sphero.Views || {};

(function () {
    'use strict';

    sphero.Views.AssetView = Chute.View.extend({

        template: JST['app/scripts/templates/asset.ejs']

    });

})();
