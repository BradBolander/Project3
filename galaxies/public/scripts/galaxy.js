// Namespacing
var galaxies = galaxies || {};
galaxies.blueprints = galaxies.blueprints || {};
galaxies.active = galaxies.active || {};

// Blueprints for models & collections
galaxies.blueprints.model = Backbone.Model.extend({
  initialize: function() {
    console.log('a model is ready');
  }
});

galaxies.blueprints.collection = Backbone.Collection.extend({
  url: '/api/galaxy',
  model: galaxies.blueprints.model,
  initialize: function() {
    console.log('a collection is ready');
    // first fetch once this is loaded!
    this.fetch();

    this.on('change', function() {
      // keeping my collection up to date with the server
      this.fetch();
    });
  }
});

// New Galaxy method
galaxies.create = function(name, radius, color, stars, brightness) {

  if (!name || !radius || !color || !stars || !brightness) {
    console.log('you are missing a parameter! oopsie');
    return false;
  }

  galaxies.active.galaxyCollection.create({
      name: name,
      radius: radius,
      color: color,
      stars: stars,
      brightness: brightness
  });

  return true;

};

//Create blueprints for views
galaxies.blueprints.collectionView = Backbone.View.extend({
  initialize: function() {

    this.$el = $('.galaxies');
    this.render();
    var that = this;
    this.collection.on('sync', function() {
      that.render();
    });
  },
  render: function() {

    this.$el.html('');

    var models = this.collection.models;
    for (var m in models) {
      var data = models[m];
      new galaxies.blueprints.modelView({
          model: data
      });
    }
  }
});

galaxies.blueprints.modelView = Backbone.View.extend({
  initialize: function() {
    this.$el = $('.galaxies');
    this.template = _.template($('#table-row-template').html());
    this.render();
  },
  render: function() {
    var data = this.model.attributes;
    this.$el.append(this.template(data));
  }
});

$(document).ready(function() {
  galaxies.active.galaxyCollection = new galaxies.blueprints.collection();
  galaxies.active.galaxyCollectionView = new galaxies.blueprints.collectionView({
    collection: galaxies.active.galaxyCollection
  });

  $('#add-galaxy').on('click', function(event) {

    event.preventDefault();
    var name = $('#name').val();
    var radius = $('#radius').val();
    var color = $('#color').val();
    var stars = $('#stars').val();
    var brightness = $('#brightness').val();

    galaxies.create(name, radius, color, stars, brightness);

  });



});
