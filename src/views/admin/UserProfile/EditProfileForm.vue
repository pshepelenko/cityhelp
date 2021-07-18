<template>
  <card>
    <b-row align-v="center" slot="header" >
      <b-col cols="8">
        <h3 class="mb-0">Введите информацию о задании </h3>
      </b-col>     
    </b-row>

    <b-form @submit.prevent="updateProfile">
      <div class="pl-lg-4">
        <b-row>
          <b-col lg="6">
            <base-input
              type="text"
              label="Название"
              placeholder=""
              v-model="user.username"
            >
            </base-input>
          </b-col>
          
        </b-row>
        <b-row >
          <b-col lg="6">
            <div class="">
        <b-form-group label="Категория" label-class="form-control-label" class="mb-0" label-for="about-form-textaria">
         <!--  <label class="form-control-label">About Me</label> -->
          <b-form-select v-model="category" label="Категория" :options="options"></b-form-select>
          </b-form-group>
      </div>
                    </b-col>
     
        </b-row>
      </div>
      

      <div class="pl-lg-4 mt-3">
        <b-form-group label="Описание" label-class="form-control-label" class="mb-0" label-for="about-form-textaria">
         <!--  <label class="form-control-label">About Me</label> -->
          <b-form-textarea rows="4" value="" id="about-form-textaria" placeholder=""></b-form-textarea>
        </b-form-group>
      </div>
      <b-row class="pl-lg-4">
      <b-col lg="6"> 
      <base-input
              type="text"
              label="Вознаграждение"
              placeholder=""
              v-model="user.username"
            >
      </base-input>
      </b-col>
      </b-row>
      <div class="pl-lg-4"> <b-button variant="primary" type="submit"> Создать </b-button> </div>
    </b-form>
  </card>
</template>
<script>
export default {
  data() {
    return {
      user: {
        company: 'Creative Code Inc.',
        username: '',
        email: '',
        firstName: 'Mike',
        lastName: 'Andrew',
        address: 'Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09',
        city: 'New York',
        country: 'USA',
        postalCode: '',
        aboutMe: `Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.`
      }
    };
  },
  methods: {
    updateProfile() {
      alert('Your data: ' + JSON.stringify(this.user));
    }
  }
};
</script>
<style></style>
