<template>
  <b-card img-top>
     <b-card-image > 
                     <gmap-map :center="{lat: 1.38, lng: 103.8}" :zoom="12" style="width: 100%; height: 500px">
                        <gmap-polygon :paths="paths" :editable="false" >
                        </gmap-polygon>
                      </gmap-map>
                </b-card-image>
    
                <b-card-title class="mt-3">Отчет по выполнению задания</b-card-title>
                <b-card-text class="card-text"> <div class="topic"> Задание </div> <router-link :to="'/tasks/'+reportInfo.taskId">{{reportInfo.task}}</router-link></b-card-text>
    <b-form @submit.prevent="updateProfile">
      

      <div class="mt-3 mb-3">
        <b-form-group label="Текст отчета" label-class="form-control-label" class="mb-0" label-for="about-form-textaria">
         <!--  <label class="form-control-label">About Me</label> -->
          <b-form-textarea rows="4" value="" id="about-form-textaria" placeholder=""></b-form-textarea>
        </b-form-group>
      </div>
      <div class=" mt-3 mb-3">
        <UploadImages uploadMsg="Загрузите изображения, подтверждающие выполнение задания" clearAll="Удалить все" />
      </div>
      
      <div class="mx-auto"> <b-button variant="primary" type="submit"> Создать </b-button> </div>
    </b-form>
  </b-card>
</template>
<script>
import UploadImages from "vue-upload-drop-images"

export default {
  components: {
    UploadImages,
  },
  data() {
    return {
      reportInfo: {
        task: 'Уберите мусор на улице Московской',
        taskId: 12321,
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
      alert('Your data: ' + JSON.stringify(this.reportInfo));
    }
  }
};
</script>
<style></style>
