<template>
  <b-card img-top>
    <b-card-title class="mt-3">Отчет по выполнению задания</b-card-title>
    <b-form @submit.prevent="submitReport">
      <b-form-group label="Задание" label-class="form-control-label" class="mb-0" label-for="task-select">
        <b-form-select v-model="reportInfo.taskId" id="task-select" label="Задание" :options="tasksList"></b-form-select>
      </b-form-group>
      <div class="mt-3 mb-3">
        <b-form-group label="Текст отчета" label-class="form-control-label" class="mb-0" label-for="about-form-textaria">
         <!--  <label class="form-control-label">About Me</label> -->
          <b-form-textarea rows="4" v-model="reportInfo.description" value="" id="about-form-textaria" placeholder=""></b-form-textarea>
        </b-form-group>
      </div>
      <div class=" mt-3 mb-3">
        <UploadImages uploadMsg="Загрузите изображения, подтверждающие выполнение задания" clearAll="Удалить все" :max="15" @changed="handleImages"/>
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
  props: ['taskId'],
  data() {
    return {
      reportInfo: {
        task: 'Уберите мусор на улице Московской',
        taskId: 12321,
        description: '',
        userId: '',        
        uploads: [],
      },
      tasksList: [
        
      ]
    };
  },
  methods: {
    updateProfile() {
      alert('Your data: ' + JSON.stringify(this.reportInfo));
    },
    getCurrentUserId() {
      let user = JSON.parse(localStorage.getItem('user'))
      this.reportInfo.userId = user.login;
    },
    handleImages(files){
      this.reportInfo.uploads=files;
                console.log(files);
    },
    getActiveTasks() {
              var userInfo = JSON.parse(localStorage.getItem('user'));
              console.log('the user id is ' + userInfo.login);
              this.$http.get('http://127.0.0.1:3000/tasks/active/users/' + userInfo.login,null,
              {
                headers: {
                  // remove headers
                }
              })
              .then(response => {
                  
                for ( let item of response.data) {
                  this.tasksList.push({value: item.taskid, text: item.title});
                }
                console.log(response.data);
              })
      },
    submitReport() {
        let data = new FormData();
        data.append('taskId', this.reportInfo.taskId);
        data.append('description', this.reportInfo.description);
        data.append('userid', this.reportInfo.userId);
        
        var ins = this.reportInfo.uploads.length;
        for (var x = 0; x < ins; x++) {
          data.append("uploads", this.reportInfo.uploads[x]);
          console.log(' ',this.reportInfo.uploads[x]);
        }
        for (var pair of data.entries()) {
          console.log(pair[0]+ ', ' + pair[1]); 
        }

        this.$http.post('http://127.0.0.1:3000/reports/create', data,
            {
              headers: {
               'Content-Type': 'multipart/form-data',
            }
            })
            .then(response => {
              console.log(response.data);
              console.log('success');
              this.$router.push('/reports/');
                  
            })
            .catch (error => {
              console.log(error.message);              
            })
      },
  },
  mounted() {
    this.getCurrentUserId();
    this.getActiveTasks();
  }
};
</script>
<style></style>
