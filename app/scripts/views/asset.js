/*global sphero, Backbone, JST*/

sphero.Views = sphero.Views || {};

(function () {
  'use strict';

  sphero.Views.AssetView = Chute.View.extend({

    _initialize: function() {
      // we don't want to render this view each time the user votes,
      // or the new element will lose its masonry style and events.
      this.stopListening(this.model, 'change');

      this.listenTo(this, 'render', this.thanks);
      this.listenTo(this.model, 'change:hearts', this.thanks);
    },

    template: function(data) {
      if (typeof this.parent.itemTemplate == 'function')
        return this.parent.itemTemplate(data);

      return JST['app/scripts/templates/asset.ejs'](data);
    },

    events: {
      'mouseenter .subcontent': 'showCaption',
      'mouseleave .subcontent': 'hideCaption',
      'click a.vote': 'vote',
      'click a.modal-link': 'showModal'
    },

    showCaption: function() {
      this.$el.find('.caption').slideDown();
    },

    hideCaption: function() {
      this.$el.find('.caption').slideUp();
    },

    vote: function(e) {
      e.preventDefault();

      this.model.heart();

      this.$el.find('.hearts').html(this.model.get('hearts') + 1);
    },

    thanks: function() {
      if (this.model.hearted())
        this.$el.find('.caption').addClass('thanks').html('Thanks!');
    },

    showModal: function (e) {
      e.preventDefault();

      var modalView = new sphero.Views.ModalView({model: this.model, parent: this});
      modalView.render();
    }
  });

  sphero.Views.ModalView = Chute.View.extend({
    template: function(data) {
      var defaultData = {
        encoded_asset_url: encodeURIComponent(window.location.origin + '/#assets/' + data.album + '/' + data.shortcut),
        encoded_source_url: encodeURIComponent(data.source.source_url),
        encoded_caption: encodeURIComponent(data.caption || '')
      };

      data = _.extend(defaultData, data);

      return JST['app/scripts/templates/modal.ejs'](data);
    },

    _initialize: function() {
      // we don't want to render this view each time the user votes
      this.stopListening(this.model, 'change');

      this.listenTo(this, 'render', this.show);
      this.listenTo(this.model, 'change:hearts', this.thanks);
    },

    events: {
      'click a.vote': 'vote'
    },

    show: function() {
      $.colorbox({ html: this.$el, close: '<img src="/images/close.png"/>' });

      this.thanks();
    },

    vote: function(e) {
      this.parent.vote(e);
    },

    thanks: function() {
      this.parent.thanks.apply(this);
    }
  });

})();
