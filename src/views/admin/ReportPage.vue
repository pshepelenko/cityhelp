<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success" />
    
    <b-container fluid class="mt--7">
        <b-row class="task-card">
           <b-card img-top class="w-75">
                <b-card-image > 
                     <gmap-map :center="{lat: 1.38, lng: 103.8}" :zoom="12" style="width: 100%; height: 500px">
                        <gmap-polygon :paths="paths" :editable="false" >
                        </gmap-polygon>
                      </gmap-map>
                </b-card-image>
                <b-card-title class="mt-3">Отчет по выполнению задания</b-card-title>
                <b-card-text class="card-text"> <div class="topic"> Задание </div> <router-link :to="'/admin/tasks/'+reportInfo.taskId">{{reportInfo.task}}</router-link></b-card-text>
                <b-card-text class="card-text"> <div class="topic"> ID отчета </div> {{reportInfo.id}}</b-card-text>
                <b-card-text class="card-text"> <div class="topic"> Текст отчета </div> {{reportInfo.text}}</b-card-text>
                <b-card-text class="card-text"> <div class="topic"> Награда </div> {{reportInfo.reward}} баллов</b-card-text>
                <b-card-text class="card-text"> <div class="topic"> Дата отправления </div> {{reportInfo.date}}</b-card-text>
                <b-button variant="primary"> Подтвердить </b-button> <b-button variant="warning"> Отклонить </b-button>
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
  import LightTable from "./Reports/ReportsList"; 

  export default {
    components: {
        LightTable
    },
    data() {
      return {
        paths: [ {lat: 1.380, lng: 103.800}, {lat:1.380, lng: 103.810}, {lat: 1.390, lng: 103.810}, {lat: 1.390, lng: 103.800} ]
      }
    },
    computed: {
        reportInfo() {
            let info = {
                    id: '12321',
                    task: 'Убрать мусор на улице Московской',
                    category: 'Экология',
                    text: 'Собрали мусор на улице Московской. Фотографии во вложении.',
                    reward: 10,
                    date: '10/09/2021',
                    taskId: 1,
                    userName: 'Anna Ivanova',
                    userId: 21321,
                };
            return info;
        },
        uploadedPhotos() {
            return ['https://picsum.photos/1024/480/?image=54', 'https://picsum.photos/1024/480/?image=54', 'https://picsum.photos/1024/480/?image=54']
        }
    },
    methods: {
    },
    mounted() {
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
