<template>
  <div class="resto">
    <div v-if="loading">
      <v-progress-circular indeterminate color="purple"></v-progress-circular>
    </div>
    <div v-else>
      <v-alert dismissible text type="success" :value="alerts.reserv">
        Resevation enregistré
      </v-alert>
      <v-alert dismissible text type="success" :value="alerts.pay">
        Payement effectué
      </v-alert>


      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="1200px">
          <template v-slot:activator="{ on, attrs }">
            
          <div v-if="paye">
            <v-btn color="primary" dark @click="pay()">
              Paye !
            </v-btn>
    </div>
    <div v-else>
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Réserver
            </v-btn>
    </div>
          </template>
          <v-card>
            <form id="form" v-on:submit.prevent="createEmployee">
              <v-card-title>
                <span class="headline">Réserver</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        label="Nom*"
                        hint="Il vous servira pour vous identifier au restaurant"
                        required
                        v-model="newUser.name"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4">
                      <v-text-field
                        label="Email*"
                        v-model="newUser.email"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <span>Nombre de personne(s) : </span>
                      <select required v-model="newUser.nbPers">
                        <option disabled value="">Nb pers</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                      </select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-date-picker v-model="newUser.date"></v-date-picker>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-time-picker
                        v-model="newUser.heure"
                        class="mt-4"
                        format="24hr"
                        :min="min"
                        :max="max"
                      ></v-time-picker>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        label="Message"
                        v-model="newUser.message"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*Champs obligatoires</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  Annuler
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  type="submit"
                  text
                >
                  Valider
                </v-btn>
              </v-card-actions>
            </form>
          </v-card>
        </v-dialog>
      </v-row>
      <CardRestoDetail :resto="item" />
    </div>
  </div>
</template>




<script>
import CardRestoDetail from "@/components/CardRestoDetail.vue";

import store from "@/store";
import { required, email } from "vuelidate/lib/validators";
import firebase from "@/firebaseInit";
const db = firebase.database();

export default {
  name: "Resto",
  data: function data() {
    return {
      request: "",
      loading: true,
      item: null,
      dialog: false,
      paye:false,
      alerts: {
        reserv: false,
        pay: store.state.alert,
      },
      min: "09",
      max: "18",
      userId: "",
      newUser: {
        name: "",
        email: "",
        date: "",
        heure: "",
        nbPers: "",
        message: "",
        resto: "",
        is_checkout: false,
      },
    };
  },
  components: {
    CardRestoDetail,
  },
  created() {
    this.searchTimeOut();
    this.request = new PaymentRequest(
      this.buildSupportedPaymentMethodData(),
      this.buildShoppingCartDetails()
    );
  },
  validations: {
    newUser: {
      name: { required },
      email: { required, email },
      date: { required },
      heure: { required },
      nbPers: { required },
    },
  },
  watch: {
    "$store.state.alert": function () {
      if (store.state.alert) {
        db.ref("users/" + this.userId).update({ is_checkout: true });
        this.notif("pay");
        store.commit("alert");
        this.paye=false;
      }
    },
  },
  methods: {
    addUser: function () {
      db.ref("reservation").push(this.newUser);
    },
    createEmployee() {
      if (this.$v.newUser.$invalid) return;
      this.userId = db.ref("users").push(this.newUser).getKey();
      this.dialog = false;
      this.notif("reserv");
      
        this.paye=true;
    },
    getResto() {
      var url = this.$adresse + this.$route.params.id;
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
          this.item = text;
          this.loading = false;
          this.newUser.resto = this.item.name;
          this.min = this.item.hours[0].open[0].start.substr(0, 2) + ":00";
          this.max = this.item.hours[0].open[0].end.substr(0, 2) - 1 + ":59";
          console.log("Request successful", this.max);
          console.log(this);
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
      }, 1000);
    },
    notif: function (indexNotif) {
      console.log(" ICI", this.alerts);
      this.alerts[indexNotif] = true;
      setTimeout(() => {
        this.alerts[indexNotif] = false;
      }, 10000);
    },

    pay() {
      this.request.show().then(function (paymentResponse) {
        // Here we would process the payment. For this demo, simulate immediate success:
        console.log(this);
        paymentResponse.complete("success").then(function () {
          // For demo purposes:
          console.log("Ca marche je crois ", store);
          console.log(this);
          store.commit("alert");
        });
      });
    },

    buildShoppingCartDetails() {
      // Hardcoded for demo purposes:
      return {
        id: "order-123",
        displayItems: [
          {
            label: this.newUser.resto,
            amount: { currency: "EUR", value: "20.00" },
          },
        ],
        total: {
          label: "Total",
          amount: { currency: "EUR", value: "20.00" },
        },
      };
    },

    buildSupportedPaymentMethodData() {
      // Example supported payment methods:
      return [
        {
          supportedMethods: "basic-card",
          data: {
            supportedNetworks: ["visa", "mastercard"],
            supportedTypes: ["debit", "credit"],
          },
        },
      ];
    },
  },
};
</script>