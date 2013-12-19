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
      sphero.views.winnersCollectionView = new sphero.Views.WinnersCollectionView();
      sphero.views.orbotixView = new sphero.Views.OrbotixView();
    },

    routes: {
      '': 'recent',
      'recent' : 'recent',
      'popular' : 'popular',
      'orbotix' : 'orbotix',
      'assets/:album/:shortcut' : 'asset'
    },

    recent: function() {
      sphero.views.recentCollectionView.fetchCollectionAndRender();
    },

    popular: function() {
      sphero.views.popularCollectionView.fetchCollectionAndRender();
      sphero.views.winnersCollectionView.fetchCollectionAndRender();
    },

    orbotix: function() {
      sphero.views.orbotixView.render();
    },

    asset: function(album, shortcut) {
      var model = new Chute.Models.Asset(null, { album: album, asset: shortcut });

      // inject album on model, because this attribute is used on modal template.
      model.attributes.album = location.hash.replace('#', '').split('/')[1];

      model.fetch({ success: function(){
        var assetView = new sphero.Views.AssetView({ model: model });
        var modalView = new sphero.Views.ModalView({ model: model, parent: assetView });

        modalView.render();
      }});
    }
  });

  sphero.router = new sphero.Routers.DefaultRouter();

  Backbone.history.start();
})();
