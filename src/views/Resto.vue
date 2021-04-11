<template>
  <div class="resto">
      <h1>Recherche</h1>
    <v-toolbar dense floating>
        <v-text-field
          hide-details
          prepend-icon="mdi-magnify"
          single-line
          @keyup="searchTimeOut"
          v-model="search"
        ></v-text-field>

      </v-toolbar>
    <div v-if="loading">
      <v-progress-circular indeterminate color="purple"></v-progress-circular>
    </div>
    <div v-else>
      
      <input type="text" v-model="searchResto" placeholder="search resto" />
<v-col cols="12" sm="4">
          <v-autocomplete
            :items="categori"
            outlined
            dense
            chips
            small-chips
            label="Catégories"
            multiple
          ></v-autocomplete>
        </v-col>

      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs4 v-for="item in filteredResto" :key="item.name">
            <CardResto :resto="item" />
          </v-flex>
        </v-layout>
      </v-container>



    </div>
  </div>
</template>



<script>
import CardResto from "@/components/CardResto.vue";

export default {
  name: "Resto",
  data: function data() {
    return {
      loading: true,
      items: [],
      categori: [],
      search: "Lyon",
      searchResto:"",
    };
  },
  components: {
    CardResto,
  },
  created() {
    this.searchTimeOut();
  },
  computed: {
    filteredResto: function () {
      return this.items.filter((items) => {
        return items.name.match(this.searchResto);
      });
    },
  },
  methods: {
    getResto () {
      var url = this.$adresse + "search?location="+this.search+"&limit=45";
      fetch(url, {
        headers: {
          Authorization: "Bearer " + this.$token,
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then((text) => {
          console.log("Request successful", text);
          this.items = text.businesses;
          this.loading = false;

          this.items.forEach(item => {
            item.categories.forEach(catego => {
            this.categori.push(catego.title);
          });
          });
        })
        .catch(function (error) {
          console.log("Request failed", error);
        });
    },
    searchTimeOut () {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.getResto();
      }, 1000);
    },
  },
};
</script>