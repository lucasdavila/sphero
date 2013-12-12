/*global sphero, Backbone, JST*/

sphero.Views = sphero.Views || {};

(function () {
    'use strict';

    //fake collection view, once Chute.CollectionView isn't available
    sphero.Views.CollectionView = Chute.Display.extend({

        initialize: function() {
          this.listenTo(this, 'render', this.fetch_assets);
          this.listenTo(this.data, 'fetch:success', this.render_assets);
        },

        itemView: sphero.Views.AssetView,

        // optional
        // itemTemplate : JST['app/scripts/templates/foo.ejs'],

        fetch_assets: function() {
            this.data.fetch({
                success: function(that) { that.trigger('fetch:success') }
            });
        },

        render_assets: function() {
          var that = this;

          _.each(this.data.models, function(model) {
            (new that.itemView({ model: model, data: model, auto: ['template', 'dependencies'], parent: that })).render();
          });

          this.$el.masonry({ itemSelector: '.item', gutter: 10 });
        }
    });

    sphero.Views.RecentCollectionView = sphero.Views.CollectionView.extend({

      container: '#recent_container',

      data: sphero.collections.recent

    });

    sphero.Views.PopularCollectionView = sphero.Views.CollectionView.extend({

      container: '#popular_container',

      data: sphero.collections.popular

    });

})();
