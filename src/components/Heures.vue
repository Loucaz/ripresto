<template>
    <v-flex>
        <h3>Heures d'ouverture :  <br><br></h3>
        <div v-for="(item,i) in tabHeures" :key="i">
          <h4>{{tabJours[item.day]}}</h4>
          {{item.text}}
        </div>
    </v-flex>
</template>
<script>

  export default {
    name: "HeuresOuverture",
    props: {
      heures: {
        type: Array
      }
    },
    data () {
        return {
        tabJours: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
        tabHeures: []
        }
    },
    methods: {
        splitHeures () {
            console.log(this.heures);
            this.heures.forEach(heure => {
                heure.start = heure.start.substring(0, 2) + "h" + heure.start.substring(2, 4);
                heure.end = heure.end.substring(0, 2) + "h" + heure.end.substring(2, 4);
                var horaire = Object.create(null);
                horaire.day = heure.day;
                if (this.tabHeures[heure.day]) {
                  horaire.text = this.tabHeures[heure.day] + " | " + heure.start + " - " + heure.end + "  ";
                  this.tabHeures = horaire;
                } else {
                  horaire.text = heure.start + " - " + heure.end + " ";
                  this.tabHeures.push(horaire);
                }
            });
            console.log(this.tabHeures);
        }
    },
    mounted () {
        this.splitHeures();
    }
  }
</script>