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
                
                <b-card-title class="mt-3" >{{taskInfo.title}}</b-card-title>
                <b-card-text class="card-text"> <div class="topic"> Категория </div> {{taskInfo.category}}</b-card-text>
                <b-card-text class="card-text"> <div class="topic"> Описание </div> {{taskInfo.description}}</b-card-text>
                <b-card-text class="card-text"> <div class="topic"> Награда </div> {{taskInfo.reward}} баллов</b-card-text>
                <b-card-text class="card-text"> <div class="topic"> Статус </div> <StatusText :status="taskInfo.status" /> </b-card-text>
                <div class="action-buttons" :key="flag">
                  <b-button variant="success" v-if="taskInfo.status==='Не запущено' || taskInfo.status==='Приостановлено'" class="mr-5" @click="startTask(taskInfo.taskid)"> Запустить </b-button>
                  <b-button variant="danger" v-if="taskInfo.status==='В работе'" class="mr-5" @click="stopTask(taskInfo.taskid)"> Остановить </b-button>
                  
                </div>
            </b-card> 
               
        </b-row>
        <b-row class="mt-5">
            <light-table :taskId="$route.params.id" />
        </b-row>
    </b-container>

  </div>
</template>
<script>
  import LightTable from "./Reports/ReportsList.vue"; 
  import StatusText from '@/components/StatusText.vue';

  export default {
    components: {
        LightTable,
        StatusText
    },
    data() {
      return {
            flag: '',
            taskInfo: {
                    id: '12321',
                    title: 'Убрать мусор на улице Московской',
                    category: 'Экология',
                    description: 'Соберите мусор на улице Московской. Процесс можно заснять на видео либо сфотографировать пакеты с мусором.',
                    reward: 10,
                    statusType: 'warning',
                    status: 'В работе'        
            },
            edited: null,
            paths: [ {lat: 1.380, lng: 103.800}, {lat:1.380, lng: 103.810}, {lat: 1.390, lng: 103.810}, {lat: 1.390, lng: 103.800} ]
        }
      
    },
    mounted() {
        this.$http.get('api/tasks/' + this.$route.params.id,null,
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
    methods: {
      startTask(taskID) {
        console.log('taskid=' + taskID);
        this.$http.post('api/tasks/start', {taskID: taskID},
          {
            headers: {
            // remove headers
          }
          })
          .then(response => {
            console.log('success ');
            this.taskInfo.status='В работе';        
          })
          .catch (error => {
            console.log('aaa');
          })  
      },
      stopTask(taskID) {
        console.log('taskid=' + taskID);
        this.$http.post('api/tasks/stop', {taskID: taskID},
          {
            headers: {
            // remove headers
          }
          })
          .then(response => {
            console.log('success ');
            this.taskInfo.status='Не запущено';        
          })
          .catch (error => {
            console.log('aaa');
          })  
      },
    }
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
