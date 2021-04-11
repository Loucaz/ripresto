<template>
  <!-- App.vue -->

  <v-app>
    <v-app-bar app>
      <v-btn icon @click="$router.push('/resto').catch(() => {})">
        <v-icon>mdi-magnify </v-icon>
      </v-btn>

      <v-spacer></v-spacer>
      <v-btn icon @click="$router.push('/reservations').catch(() => {})">
        <v-icon> mdi-book-open</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
