<template>
  <div id="view-employee">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{name}}</h4>
      </li>
      <li class="collection-item">Employee ID#:{{employee_ID}}</li>
      <li class="collection-item">DEPARTMENT: {{dept}}</li>
      <li class="collection-item">POSITION:{{position}}</li>
    </ul>
    <router-link to="/" class="btn green accent-2">Back</router-link>
    <button @click="deleteEmployee" class="btn red">Delete</button>
    <div class="fixed-action-btn">
      '
      <router-link
        v-bind:to="{name: 'edit-employee', params:{employee_ID: employee_ID}}"
        class="btn-floating btn-large red"
      >
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>
<script>
import db from "./firebaseinit";
export default {
  name: "view-employee",
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
            vm.position = doc.data().position;
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
    deleteEmployee() {
      if (confirm("Are you sure?")) {
        db.collection("employees")
          .where("employee_ID", "==", this.$route.params.employee_ID)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete();
              this.$router.push("/");
            });
          });
      }
    }
  }
};
</script>

<style scoped>
</style>
