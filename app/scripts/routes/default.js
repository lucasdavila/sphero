/*global sphero, Backbone*/

sphero.Routers = sphero.Routers || {};

(function () {
  'use strict';

  sphero.Routers.DefaultRouter = Backbone.Router.extend({

    initialize: function() {
      this.appView = new sphero.Views.AppView();
      this.appView.render();

      this.recentCollectionView = new sphero.Views.RecentCollectionView();
    },

    routes: {
      '': 'recent'
    },

    recent: function() {
      if (!this.recentCollectionView.rendered)
        this.recentCollectionView.render();
    }
  });

  sphero.router = new sphero.Routers.DefaultRouter();

  Backbone.history.start();
})();
