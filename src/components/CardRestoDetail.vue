<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="600">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <div v-if="this.resto.image_url !== ''">
      <v-carousel hide-delimiters>
        <v-carousel-item
          v-for="(item, i) in this.resto.photos"
          :key="i"
          :src="item"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
    </div>
    <div v-else>
      <v-img
        height="250"
        gradient="rgba(100,100,100,.33), rgba(100,100,100,.7)"
      ></v-img>
    </div>

      <v-card-title>{{ this.resto.name }}</v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0 ml-4">
          <v-rating
            :value="this.resto.rating"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div class="grey--text ml-4">
            {{ this.resto.rating }} ({{ this.resto.review_count }})
          </div>
        </v-row>
        <v-row>
          <div class="grey--text ml-4 float-right">
            {{ this.resto.price }} | {{ this.resto.location.city }} |
            {{ this.resto.location.address1 }}
          </div>
        </v-row>

        <div class="my-4 subtitle-1">
          <v-chip-group>
            <v-chip v-for="item in this.resto.categories" :key="item.title"
              >{{ item.title }}
            </v-chip></v-chip-group
          >
        </div>
      </v-card-text>
      <v-card-title>{{ this.resto.display_phone }}</v-card-title>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <HeuresOuverture :heures="this.resto.hours[0].open"></HeuresOuverture>
    </v-card-text>
  </v-card>
</template>

<script>
import HeuresOuverture from "@/components/Heures.vue";
export default {
  name: "CardRestoDetail",
  data: () => ({
    loading: false,
    selection: 1,
  }),

  components: {
    HeuresOuverture,
  },
  props: {
    resto: Object,
  },

  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
  },
  created() {
    console.log("Request ", this.resto);
    //this.resto.photos.push(this.resto.image_url);
  },
};
</script>