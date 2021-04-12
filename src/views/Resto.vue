<template>
  <div class="resto">
    <h1>Recherche:</h1>
    <br />
    <v-toolbar dense floating>
      <v-text-field
        hide-details
        prepend-icon="mdi-magnify"
        @keyup="searchTimeOut"
        v-model="search"
        label="Ville"
      ></v-text-field>
    </v-toolbar>
    <div v-if="loading">
      <v-progress-circular indeterminate color="purple"></v-progress-circular>
    </div>
    <div v-else>
      <br />
      <v-row>
        <v-col cols="12" sm="1"> </v-col>

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
        <v-col cols="12" sm="4">
          <v-text-field
            outlined
            label="Nom du resto"
            type="text"
            v-model="searchResto"
          />
        </v-col>

        <v-col cols="12" sm="3">
          <v-switch outlined v-model="singleExpand" label="Ouvert ?"></v-switch>
        </v-col>
      </v-row>
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
      singleExpand: true,
      items: [],
      categori: [],
      search: "Lyon",
      searchResto: "",
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
    getResto() {
      var url = this.$adresse + "search?location=" + this.search + "&limit=9";
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

          this.items.forEach((item) => {
            item.categories.forEach((catego) => {
              this.categori.push(catego.title);
            });
          });
        })
        .catch(function (error) {
          console.log("Request failed", error);
        });
    },
    searchTimeOut() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.getResto();
      }, 500);
    },
  },
};
</script>