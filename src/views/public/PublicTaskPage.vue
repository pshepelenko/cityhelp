<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success" />
    
    <b-container fluid class="mt--7">
        <b-row class="task-card">
           <b-card img-top class="w-75">
                 
                     <gmap-map :center="{lat: 56.18, lng: 36.97}" :zoom="13" style="width: 100%; height: 500px">
                        <gmap-polygon :paths="taskInfo.paths" :editable="false" >
                        </gmap-polygon>
                      </gmap-map>
                <b-card-title class="mt-3">{{taskInfo.title}}</b-card-title>
                <b-card-text class="card-text"> <div class="topic"> Категория </div> {{taskInfo.category}}</b-card-text>
                <b-card-text class="card-text"> <div class="topic"> Описание </div> {{taskInfo.description}}</b-card-text>
                <b-card-text class="card-text"> <div class="topic"> Награда </div> {{taskInfo.reward}} баллов</b-card-text>
                <b-button v-if="!isSubscribed" class="mx-auto" variant="primary"  @click="subscribe(user.login, $route.params.id)"> Взять задание </b-button>
                <b-button v-if="isSubscribed" class="mx-auto" variant="warning"  @click="unSubscribe(user.login, $route.params.id)"> Отказаться </b-button>
            </b-card> 
               
        </b-row>
        
    </b-container>

  </div>
</template>
<script>
  export default {
    components: {
    },
    data() {
      return {
        taskInfo: {},
        isSubscribed: false,
        user: {},
      }
    },
    
    methods: {
      getTaskInfo () {
        this.$http.get('http://127.0.0.1:3000/tasks/' + this.$route.params.id,null,
         {
            headers: {
              // remove headers
            }
          })
          .then(response => {
            this.taskInfo = response.data[0];
            console.log(response.data[0]);
          })
      },
      getTaskStatus (userId, taskId) {
        this.$http.get('http://127.0.0.1:3000/users/' + userId + '/tasks/' + taskId,null,
         {
            headers: {
              // remove headers
            }
          })
          .then(response => {
            this.isSubscribed = response.data.status;
            console.log('isSubscribed = ' + response.data.status);
          })
      },
      subscribe(userId, taskId) {
        this.$http.post('http://127.0.0.1:3000/tasks/subscribe', {taskId: taskId, userId: userId},
          {
            headers: {
            // remove headers
          }
          })
          .then(response => {
            console.log('success ');
            this.isSubscribed=true;        
          })
          .catch (error => {
            console.log('subscription error');
          })
      },
      unSubscribe(userId, taskId) {
          this.$http.post('http://127.0.0.1:3000/tasks/unsubscribe', {taskId: taskId, userId: userId},
          {
            headers: {
            // remove headers
          }
          })
          .then(response => {
            console.log('success ');
            this.isSubscribed=false;        
          })
          .catch (error => {
            console.log('unsubscription error');
          })
      },
      
    
    },
    mounted() {
    this.getTaskInfo();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getTaskStatus(this.user.login, this.$route.params.id);
    },  
  };
</script>
<style>
.task-card {
    display: flex;
    justify-content: center;
}
.topic {
    font-weight: 600;
    margin-right: 8px;
}
.card-text {
    display: flex;
}
</style>
