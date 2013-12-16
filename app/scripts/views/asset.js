/*global sphero, Backbone, JST*/

sphero.Views = sphero.Views || {};

(function () {
  'use strict';

  sphero.Views.AssetView = Chute.View.extend({

    initialize: function() {
      this.listenTo(this, 'render', this.fixElPosition);
      this.listenTo(this, 'render', this.checkHearted);
    },

    template: function(data) {
      if (typeof this.parent.itemTemplate == 'function')
        return this.parent.itemTemplate(data);

      return JST['app/scripts/templates/asset.ejs'](data);
    },

    events: {
      'mouseenter img': 'showCaption',
      'mouseleave img': 'hideCaption',
      'click a.vote': 'vote'
    },

    showCaption: function() {
      this.$el.find('.caption').slideDown();
    },

    hideCaption: function() {
      if (this.$el.find('.caption:hover').length > 0)
        return;

      this.$el.find('.caption').slideUp();
    },

    vote: function(e) {
      e.preventDefault();

      this.styleAttr = this.$el.attr('style');

      this.model.heart();

      this.$el.find('.caption').addClass('thanks').html('Thanks!');
    },

    fixElPosition: function() {
      $('.item:not([style])').attr('style', this.styleAttr);
    },

    checkHearted: function() {
      if (this.model.hearted())
        this.$el.find('.caption').addClass('thanks').html('Thanks!');
    }

  });

})();
