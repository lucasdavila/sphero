/*global sphero, Backbone, JST*/

sphero.Views = sphero.Views || {};

(function () {
    'use strict';

    sphero.Views.AssetView = Chute.View.extend({

        template: function(data) {
          if (typeof this.parent.itemTemplate == 'function')
            return this.parent.itemTemplate(data);

          return JST['app/scripts/templates/asset.ejs'](data);
        }

    });

})();
