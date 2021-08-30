<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success" />
    
    <b-container fluid class="mt--7">
        <b-row class="task-card">
           <b-card img-top class="w-75">
                <gmap-map :center="{lat: 56.18, lng: 36.97}" :zoom="13" style="width: 100%; height: 500px">
                    <gmap-polygon :paths="reportInfo.paths" :editable="false" />
                </gmap-map>
                <b-card-title class="mt-3">Отчет по выполнению задания</b-card-title>
                <b-card-text class="card-text"> <div class="topic"> Задание </div> <router-link :to="'/admin/tasks/'+reportInfo.taskid">{{reportInfo.taskTitle}}</router-link></b-card-text>
                <b-card-text class="card-text"> <div class="topic"> ID отчета </div> {{reportInfo.reportid}}</b-card-text>
                <b-card-text class="card-text"> <div class="topic"> Текст отчета </div> {{reportInfo.description}}</b-card-text>
                <b-card-text class="card-text"> <div class="topic"> Награда </div> {{reportInfo.reward}} баллов</b-card-text>
                <b-card-text class="card-text"> <div class="topic"> Дата отправления </div> {{moment(reportInfo.creationdate).format('DD/MM/YYYY')}}</b-card-text>
                <b-card-text class="card-text"> <div class="topic"> Статус </div> <StatusText :status="reportInfo.status" /></b-card-text>
                <b-button v-if="reportInfo.status === 'На обработке'" variant="primary" @click="approveReport(reportInfo.reportid)"> Подтвердить </b-button> 
                <b-button v-if="reportInfo.status === 'На обработке'" variant="warning" @click="rejectReport(reportInfo.reportid)"> Отклонить </b-button>
            </b-card> 
               
        </b-row>
        <b-row>
          <div class="mt-3"> Подтверждающие данные </div>
        </b-row>
        <b-row class="mt-2">
          
                 <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide v-for="item in uploadedPhotos" :key="item"
        :img-src="item"
      ></b-carousel-slide>

      
    </b-carousel>
        </b-row>
    </b-container>

  </div>
</template>
<script>
  import StatusText from '@/components/StatusText.vue';
  
  export default {
    components: {
      StatusText,
    },
    data() {
      return {
        reportInfo: {},
        
      }
    },
    computed: {
        
        uploadedPhotos() {
            return ['https://picsum.photos/1024/480/?image=54', 'https://picsum.photos/1024/480/?image=54', 'https://picsum.photos/1024/480/?image=54']
        }
    },
    methods: {
      approveReport(reportId) {
        this.$http.post('api/reports/approve', {reportId: reportId},
          {
            headers: {
            // remove headers
          }
          })
          .then(response => {
            this.reportInfo.status='Подтвержден';        
          })
          .catch (error => {
            console.log('aaa');
          })  
      },
      rejectReport(reportId) {
        this.$http.post('api/reports/reject', {reportId: reportId},
          {
            headers: {
            // remove headers
          }
          })
          .then(response => {
            this.reportInfo.status='Отклонен';        
          })
          .catch (error => {
            console.log('aaa');
          })              
      }
    },
    mounted() {
      this.$http.get('api/reports/' + this.$route.params.id,null,
         {
            headers: {
              // remove headers
            }
          })
          .then(response => {
            this.reportInfo = response.data;
            console.log(response.data);
          })
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
