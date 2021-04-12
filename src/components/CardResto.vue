<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <div v-if="this.resto.image_url !== ''">
      <v-img height="250" :src="this.resto.image_url"></v-img>
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

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="detail">
        En détail
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>

export default {
  name: "CardResto",
  data: () => ({
    loading: false,
    selection: 1,
  }),

  props: {
    resto: Object,
  },
  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
    detail() {
      this.$router.push("/resto/" + this.resto.id);
    },
  },
  created() {
    console.log("Request ", this.resto);
  },
};
</script>