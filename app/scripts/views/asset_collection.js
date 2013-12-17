/*global sphero, Backbone, JST*/

sphero.Views = sphero.Views || {};

(function () {
  'use strict';

  sphero.Views.AssetCollectionView = Chute.Display.extend({

    _initialize: function() {
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
      this.collection.fetch();
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

  sphero.Views.WinnersCollectionView = sphero.Views.AssetCollectionView.extend({

    _initialize: function() {
      this.listenTo(this.collection, 'load', this.handleCollectionLoad);
      this.listenTo(this.collection, 'load', this.appendEmptyAssets);
      this.listenTo(this, 'render', this.hideLoadMoreButton);
    },

    container: '#winners_container',

    collection: sphero.collections.winners,

    itemTemplate : JST['app/scripts/templates/winner.ejs'],

    hideLoadMoreButton: function() {
      this.$el.find('a.load-more').hide();
    },

    appendEmptyAssets: function() {
      for (var i = this.$el.find('.item').length; i < 6; i++) {
        var emptyAssetTemplate = JST['app/scripts/templates/empty_asset.ejs']({ week: i+1 });
        $(emptyAssetTemplate).appendTo(this.$el);
      };

      this.$el.masonry('appended', $('.item:not([style])'));
    }

  });

  sphero.Views.PopularCollectionView = sphero.Views.AssetCollectionView.extend({

    container: '#popular_container',

    collection: sphero.collections.popular,

    append: true

  });

  sphero.Views.OrbotixView = sphero.Views.AssetCollectionView.extend({

    container: '#orbotix_container',

    template: JST['app/scripts/templates/orbotix.ejs']

  });
})();
