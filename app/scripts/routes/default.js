/*global sphero, Backbone*/

sphero.Routers = sphero.Routers || {};

(function () {
  'use strict';

  sphero.Routers.DefaultRouter = Backbone.Router.extend({

    initialize: function() {
      sphero.views = sphero.views || {};

      sphero.views.appView = new sphero.Views.AppView();
      sphero.views.appView.render();

      sphero.views.recentCollectionView = new sphero.Views.RecentCollectionView();
      sphero.views.popularCollectionView = new sphero.Views.PopularCollectionView();
    },

    routes: {
      '': 'recent',
      'recent' : 'recent',
      'popular' : 'popular'
    },

    recent: function() {
      sphero.views.recentCollectionView.fetchCollectionAndRender();
    },

    popular: function() {
      sphero.views.popularCollectionView.fetchCollectionAndRender();
    }
  });

  sphero.router = new sphero.Routers.DefaultRouter();

  Backbone.history.start();
})();
