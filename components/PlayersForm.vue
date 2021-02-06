<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="800px" scrollable>
      <template v-slot:activator="{ on, attrs }">
        <v-btn elevation="0" color="primary" fab tile v-bind="attrs" v-on="on">
          <v-icon>mdi-file</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">
            Match Setting - {{ gender }}{{ isSingle ? "S" : "D" }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-radio-group row v-model="isSingle">
                  <template v-slot:label> Match type </template>
                  <v-radio label="Single" :value="true" />
                  <v-radio label="Double" :value="false" />
                </v-radio-group>
              </v-col>
              <v-col cols="12" md="6">
                <v-radio-group row v-model="gender">
                  <template v-slot:label> Gender </template>
                  <v-radio label="Man" value="M" />
                  <v-radio label="Woman" value="F" />
                  <v-radio label="Mixed" value="X" />
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-radio-group row v-model="limit">
                  <template v-slot:label> Score Limit </template>
                  <v-radio label="15" :value="15" />
                  <v-radio label="21" :value="21" />
                  <v-radio label="31" :value="31" />
                </v-radio-group>
              </v-col>
              <v-col cols="12" md="6">
                <v-radio-group row v-model="deuceLimit">
                  <template v-slot:label> Deuce Limit </template>
                  <v-radio label="30" :value="30" />
                  <v-radio label="35" :value="35" />
                  <v-radio label="40" :value="40" />
                </v-radio-group>
              </v-col>
            </v-row>

            <template v-for="(team, idx) in [first, second]">
              <v-row cols="12" class="mt-3" :key="`${idx}-title`">
                <h2 :class="`${idx ? 'orange' : 'green'} px-3 py-1 rounded`">
                  Team {{ idx + 1 }} ({{ team.team }})
                </h2>
              </v-row>
              <v-row :key="`${idx}-team`">
                <v-col cols="12">
                  <v-text-field label="Team Name" v-model="team.team" />
                </v-col>
              </v-row>
              <v-row :key="`${idx}-name`">
                <v-col cols="12" sm="6">
                  <span v-if="!isSingle">1st Player</span>
                  <v-text-field
                    label="1st Player name*"
                    v-model="team.name[0]"
                    required
                  />
                </v-col>
                <v-col cols="12" sm="6" v-if="!isSingle">
                  <span v-if="!isSingle">2nd Player</span>
                  <v-text-field
                    label="2nd Player name*"
                    v-model="team.name[1]"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </template>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="green" text @click="submitForm"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import { merge } from "lodash";
export default {
  data: () => ({
    dialog: true,
    isSingle: false,
    gender: "M",
    limit: 21,
    deuceLimit: 30,
    first: {
      name: ["fasf", "hahaeh"],
      subName: "Tai tsu in",
      team: "ehse, erh erh",
    },
    second: {
      name: ["帶姿尹", "2nd"],
      subName: "Tai tsu in",
      team: "台灣",
    },
  }),
  mounted() {
    this.fetchFromStore();
  },
  watch: {
    dialog() {
      if (this.dialog) {
        this.fetchFromStore();
      }
    },
    "first.serve": function () {
      if (this.first.serve && this.second.serve) {
        this.second.serve = false;
      }
    },
    "second.serve": function () {
      if (this.first.serve && this.second.serve) {
        this.first.serve = false;
      }
    },
  },
  methods: {
    fetchFromStore() {
      const current = this.$store.state.current;
      const { first, second, isSingle, gender, limit, deuceLimit } = current;
      merge(this.$data, {
        first,
        second,
        isSingle,
        gender,
        limit,
        deuceLimit,
      });
    },
    submitForm() {
      const { dialog, ...payload } = this.$data;
      this.$store.dispatch("current/submitMatch", payload);
      this.dialog = false;
    },
  },
};
</script>
