/*global sphero, Backbone*/

sphero.collections = sphero.collections || {};

(function () {
  'use strict';

  sphero.collections.recent = new Chute.API.Assets(null, { album: 'arOOyzse', per_page: 20 });
  sphero.collections.winners = new Chute.API.Assets(null, { album: 'arOOyzse', per_page: 2 });
  sphero.collections.popular = new Chute.API.Assets(null, { album: 'arOOyzse', per_page: 20, sort: 'hearts' });
})();
