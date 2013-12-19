/*global sphero, Backbone*/

sphero.collections = sphero.collections || {};

sphero.albums = sphero.albums || {};

(function () {
  'use strict';

  sphero.albums.recent = 'arOOyzse';
  sphero.albums.winners = 'arOOyzse';
  sphero.albums.popular = 'arOOyzse';

  sphero.collections.recent = new Chute.API.Assets(null, { album: sphero.albums.recent, per_page: 20 });
  sphero.collections.winners = new Chute.API.Assets(null, { album: sphero.albums.winners, per_page: 2 });
  sphero.collections.popular = new Chute.API.Assets(null, { album: sphero.albums.popular, per_page: 20, sort: 'hearts' });
})();
