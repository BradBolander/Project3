var galaxy = galaxy || {};
galaxy.active = galaxy.active || {};
galaxy.blueprints = galaxy.blueprints || {};

galaxy.blueprints.model = Backbone.Model.extend({
  initialize: function() {
    console.log('Model has been instantiated.');
    this.fetch();
  }
});

galaxy.blueprints.collection = Backbone.Collection.extend({
  model: galaxy.blueprints.model,
  url: '/api/galaxy',
  initialize: function() {
    console.log('Collection has been instantiated.');
    this.on('change', function() {
      this.fetch();
    });
  }
});

galaxy.blueprints.modelView = Backbone.View.extend({
  initialize: function() {
    console.log('modelView has been instantiated.');
  },
  render: function() {

  }
});

galaxy.blueprints.collectionView = Backbone.View.extend({
  events: {
    'click': 'logIt'
  },
  initialize: function() {
    console.log('collectionView has been instantiated.');
    this.render();
  },
  render: function() {
    this.$el.html('test');
  },
  logIt: function() {
    console.log('the collectionView has been clicked!');
  }
});

$(document).ready(function() {
  galaxy.active.galaxyCollection = new galaxy.blueprints.collection();
  galaxy.active.galaxyCollection.fetch();
  galaxy.active.galaxyCollectionView = new galaxy.blueprints.collectionView({
    el: $('#table-container'),
    collection: galaxy.active.galaxyCollection
  });
});

//insta.active.photosCollection.create({ username: 'bruce wayne', post: 'dead_parents.gif', description: ' :( ', hashtags: 'YOLO' });
