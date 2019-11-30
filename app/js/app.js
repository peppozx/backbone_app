(function() {
  const PostModel = Backbone.Model.extend({
    initialize: function() {
      console.log("initializing model ...");
    }
  });
  const PostCollection = Backbone.Collection.extend({
    model: PostModel,
    byId: function(content) {
      return this.filter(post => post.get("post") === content);
    }
  });

  const Posts = new PostCollection();

  const PostView = Backbone.View.extend({
    tagName: "li",
    template: _.template(
      "<div class='li-div'><span class='li-name' >Name: <%= model.get('name') %></span><br /><span class='li-post'>Post: <%= model.get('post') %></span><span class='delete-post' data-id=<%= model.get('post') %>>X</span></div>"
    ),
    initialize: function() {
      if (!this.model) {
        throw new Error("Forneça um model");
      }
    },
    render: function() {
      return this.template({ model: this.model });
    }
  });
  const AppView = Backbone.View.extend({
    el: $("#todos"),
    initialize: function() {
      this.$name = $("#input-name");
      this.$post = $("#input-post");
      this.$list = $("#post-list");
      this.listenTo(this.collection, "add", this.render);
      this.listenTo(this.collection, "remove", this.render);
    },
    collection: Posts,
    events: {
      "click #submit-btn": "addPost",
      "click .delete-post": "deletePost"
    },
    addPost: function() {
      console.log("adding post");
      const newPost = new PostModel({
        name: this.$name.val(),
        post: this.$post.val()
      });
      this.collection.add(newPost);
    },
    deletePost: function(e) {
      const idToRemove = e.target.dataset.id;
      const postsToRemove = this.collection.byId(idToRemove);
      postsToRemove.forEach(post => {
        this.collection.remove(post);
      });
    },
    render: function() {
      this.$list.empty();
      this.collection.forEach(post => {
        const postView = new PostView({ model: post });
        this.$list.append(postView.render());
      });
    }
  });

  const app = new AppView();
})();
