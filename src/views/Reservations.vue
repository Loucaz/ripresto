<template>
  <div class="Reservations">
        <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
  </div>
</template>


<script>
import store from "@/store";
import firebase from "@/firebaseInit";
const db = firebase.database();
export default {
  name: "Reservations",
  data: function data() {
    return {
      loading: true,
      items: [],
      headers: [
          {
            text: 'Nom',
            align: 'start',
            sortable: false,
            value: 'val.name',
          },
          { text: 'Date', value: 'val.date' ,
            sortable: false},
          { text: 'Heure', value: 'val.heure' ,
            sortable: false},
          { text: 'Restaurant', value: 'val.resto' ,
            sortable: false},
          { text: 'Payer?', value: 'val.is_checkout' ,
            sortable: false},
        ],
    };
  },
  created() {
    store.state.list = [];
        console.log(store.state.list);
    var leadsRef = db.ref("users");
    leadsRef.on("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        console.log("Data: ", childSnapshot.val());
          store.commit("addList",{val:childSnapshot.val()});
      }
      );
    });
        console.log(store.state.list);
        console.log(this.items);
  },
  watch: {
    "$store.state.list": function () {
      this.items=store.state.list;
        console.log(store.state.list);
        console.log(this.items);
    },
  },
};
</script>