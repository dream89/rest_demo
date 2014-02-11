var AppRouter = Backbone.Router.extend({
    routes: {
        "": "list",
        "favorites/new": "itemForm",
        "favorites/:item": "itemDetails"
    },

    initialize: function  () {
        this.favorites = new Favorites();

        this.favoriteItemModel = new FavoriteItem();
        this.favoriteItemView = new FavoriteItemDetails(
            {
                model: this.favoriteItemModel
            }
        );

        this.favoritesView = new FavoritesView({collection: this.favorites});
        this.favoriteItemForm = new FavoriteItemForm({model: new FavoriteItem()});
        this.manual_init();
    },

    // Fetch items
    manual_init : function () {

        this.favorites.fetch();
        $('#app').html(this.favoritesView.render().el);
    },

    list: function () {
        $('#app').html(this.favoritesView.render().el);
    },

    itemDetails: function (item) {
        this.favoriteItemView.model = this.favorites.get(item);
        $('#app').html(this.favoriteItemView.render().el);
    },

    itemForm: function () {
        $('#app').html(this.favoriteItemForm.render().el);
    }
});

var app = new AppRouter();

$(function() {
    Backbone.history.start();
});