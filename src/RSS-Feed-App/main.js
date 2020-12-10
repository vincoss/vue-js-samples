Vue.component("add-item", {
    template: `
          <form class="mb-2" v-on:submit.prevent="add">
              <input class="form-control" placeholder="Feed title" v-model="feedTitle" />
              <input class="form-control" placeholder="Feed url" v-model="feedUrl" />
              <button type="submit">Add</button>
          </form>
            `,
    data() {
      return {
        feedTitle: undefined,
        feedUrl: undefined
      };
    },
    methods: {
      add() {
        var data = 
        {
            title: this.feedTitle, 
            url: this.feedUrl
        };
        this.$emit("submitted", data);
        this.newFeed = undefined;
        this.feedUrl = undefined;
      }
    }
  });

Vue.filter("friendly-date", date => {
    var diff = new Date() - date;
    if (diff < 1000) return "Just now";
    if (diff < 60000) return `${Math.floor(diff / 1000)} seconds ago`;
    if (diff < 60000 * 60) return `${Math.floor(diff / 60000)} minutes ago`;
    return "Too long ago";
  });

var app = new Vue({
    el: "#app",
    data: {
      title: "RSS Feed Collector!",
      newFeedTitle: null,
      newFeedUrl: null,
      feeds: [],
    },
    methods: {
        addFeed(data) {
            this.feeds.push({
              id: this.feeds.length + 1,
              title: data.title,
              url: data.url,
              created: new Date(),
              active: false
            });
          }
      },
      computed: {
        filteredFeeds() {
            return this.feeds;
        }
      },
      created(){
        this.feeds = []
    }
  });