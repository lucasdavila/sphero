/*global sphero, Backbone, JST*/

sphero.Views = sphero.Views || {};

(function () {
  'use strict';

  sphero.Views.AssetCollectionView = Chute.Display.extend({

    initialize: function() {
      this.listenTo(this.collection, 'load', this.handleCollectionLoad);
    },

    events: {
      'click a.load-more': 'nextCollectionPage'
    },

    template: JST['app/scripts/templates/asset_collection.ejs'],

    itemView: sphero.Views.AssetView,

    // optional
    // itemTemplate : JST['app/scripts/templates/foo.ejs'],

    fetchCollectionAndRender: function() {
      this.collection.fetch();//{ success: function(collection) { collection.trigger('fetch:success') } });
      this.render();
    },

    handleCollectionLoad: function() {
      if (this.$el.find('.item').length > this.collection.perPage())
        this.$el.masonry('appended', $('.item:not([style])'));
      else
        this.$el.masonry({ itemSelector: '.item', gutter: 10 });

      this.$el.find('a.load-more').html('Load more');
    },

    nextCollectionPage: function (e) {
      e.preventDefault();

      $(e.target).html('Loading...');

      this.collection.nextPage();
    }
  });

  sphero.Views.RecentCollectionView = sphero.Views.AssetCollectionView.extend({

    container: '#recent_container',

    collection: sphero.collections.recent

  });

  sphero.Views.PopularCollectionView = sphero.Views.AssetCollectionView.extend({

    container: '#popular_container',

    collection: sphero.collections.popular

  });

  sphero.Views.OrbotixView = sphero.Views.AssetCollectionView.extend({

    container: '#orbotix_container',

    template: JST['app/scripts/templates/orbotix.ejs'],

    render: function(){
      $(this.container).html(this.template);
    }
  });
})();
