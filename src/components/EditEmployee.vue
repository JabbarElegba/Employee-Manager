<template>
  <div id="new-employee">
    <h3>Edit Employee</h3>
    <div class="row">
      <form @submit.prevent="updateEmployee" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="employee_ID" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="dept" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="Position" required />
          </div>
        </div>
        <button type="submit" class="btn">Submit</button>
        <router-link to="/" class="btn red">Cancel</router-link>
      </form>
    </div>
  </div>
</template>
<script>
import db from "./firebaseinit";
export default {
  name: "edit-employee",
  data() {
    return {
      employee_ID: null,
      name: null,
      dept: null,
      position: null
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("employees")
      .where("employee_ID", "==", to.params.employee_ID)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.employee_ID = doc.data().employee_ID;
            vm.name = doc.data().name;
            vm.dept = doc.data().dept;
            vm.Position = doc.data().Position;
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      db.collection("employees")
        .where("employee_ID", "==", this.$route.params.employee_ID)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.employee_ID = doc.data().employee_ID;
            this.name = doc.data().name;
            this.dept = doc.data().dept;
            this.position = doc.data().position;
          });
        });
    },
    updateEmployee() {
      db.collection("employees")
        .where("employee_ID", "==", this.$route.params.employee_ID)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref
              .update({
                employee_ID: this.employee_ID,
                name: this.name,
                dept: this.dept,
                position: this.Position
              })
              .then(() => {
                this.$router.push({
                  name: "view-employee",
                  params: { employee_ID: this.employee_ID }
                });
              });
          });
        });
    }
  }
};
</script>
