<template>
  <div id="new-employee">
    <h3>New Employee</h3>
    <div class="row">
      <form @submit.prevent="saveEmployee" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="employee_ID" required />
            <label>Employee ID#</label>
          </div>
        </div>
      </form>
    </div>
    <div class="row">
      <form @submit.prevent="saveEmployee" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required />
            <label>Name</label>
          </div>
        </div>
      </form>
    </div>
    <div class="row">
      <form @submit.prevent="saveEmployee" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="dept" required />
            <label>Department</label>
          </div>
        </div>
      </form>
    </div>
    <div class="row">
      <form @submit.prevent="saveEmployee" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="position" required />
            <label>Position</label>
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
  name: "new-employee",
  data() {
    return {
      employee_ID: null,
      name: null,
      dept: null,
      position: null
    };
  },
  methods: {
    saveEmployee() {
      db.collection("employees")
        .add({
          employee_ID: this.employee_ID,
          name: this.name,
          dept: this.dept,
          position: this.Position
        })
        .then(docRef => {
          //  console.log("Client added: ", docRef.ID);
          this.$router.push("/");
        })
        .catch(error => {
          console.error("Error adding employee: ", error);
        });
    }
  }
};
</script>

<style scoped>
</style>
