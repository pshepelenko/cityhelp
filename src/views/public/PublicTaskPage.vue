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
                <b-card-title class="mt-3">{{taskInfo.title}}</b-card-title>
                <b-card-text class="card-text"> <div class="topic"> Категория </div> {{taskInfo.category}}</b-card-text>
                <b-card-text class="card-text"> <div class="topic"> Описание </div> {{taskInfo.description}}</b-card-text>
                <b-card-text class="card-text"> <div class="topic"> Награда </div> {{taskInfo.reward}} баллов</b-card-text>
                <b-button v-if="taskInfo.status==='В работе'" class="mx-auto" variant="primary"> Взять задание </b-button>
                <b-button v-if="taskInfo.status==='Не запущен'" class="mx-auto" variant="warning"> Отказаться </b-button>
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
      }
    },
    computed: {
        taskInfo() {
            let info = {
                    id: '12321',
                    title: 'Убрать мусор на улице Московской',
                    category: 'Экология',
                    description: 'Соберите мусор на улице Московской. Процесс можно заснять на видео либо сфотографировать пакеты с мусором.',
                    reward: 10,
                    status: 'В работе'
                };
            return info;
        },
        paths() {
          return [ {lat: 1.380, lng: 103.800}, {lat:1.380, lng: 103.810}, {lat: 1.390, lng: 103.810}, {lat: 1.390, lng: 103.800} ]
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
