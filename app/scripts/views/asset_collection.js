/*global sphero, Backbone, JST*/

sphero.Views = sphero.Views || {};

(function () {
    'use strict';

    //sphero.Views.RecentCollectionView = Chute.CollectionView.extend({
    sphero.Views.RecentCollectionView = Chute.Display.extend({

        initialize: function() {
          this.listenTo(this, 'render', this.fetch_assets);
          this.listenTo(this.data, 'fetch:success', this.render_assets);
        },

        template: JST['app/scripts/templates/asset_collection.ejs'],

        container: '#recent_container',

        itemView: sphero.Views.AssetView,

        data: sphero.collections.recent,


        // listeners handlers
        fetch_assets: function() {
            this.data.fetch({
                success: function(self) { self.trigger('fetch:success') }
            });
        },

        // rendering assets by hand, once Chute.CollectionView isn't available :/
        render_assets: function() {
          var that = this;

          _.each(this.data.models, function(model) {
            (new that.itemView({ model: model, data: model, auto: ['template', 'dependencies'], parent: that })).render();
          });
        }
    });

})();
