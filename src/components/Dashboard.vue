<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Employees</h4>
      </li>
      <li v-for="employee in employees" v-bind:key="employee.id" class="collection-item">
        <div class="chip">{{employee.dept}}</div>
        {{employee.employee_ID}}:{{employee.name}}
        <router-link
          class="secondary-content"
          v-bind:to="{name:'view-employee', params: {employee_ID: employee.employee_ID}}"
        >
          <I class="fa fa-eye"></I>
        </router-link>
      </li>
    </ul>
    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>
<script>
import db from "./firebaseinit";
export default {
  name: "dashboard",
  data() {
    return {
      employees: []
    };
  },
  created() {
    db.collection("employees")
      .orderBy("dept")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            employee_ID: doc.data().employee_ID,
            name: doc.data().name,
            dept: doc.data().dept,
            position: doc.data().position
          };
          this.employees.push(data);
        });
      });
  }
};
</script>

<style scoped>
</style>
