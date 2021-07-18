<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row class="rewards-list">
            <div class="header-first"> Выбранные задания </div>
            <b-card-group deck>
                <b-col sm="12" md="4" v-for="item in tasks" :key="item.id">
                    <b-card  img-top>
                         <b-card-image  > 
                            <gmap-map :center="{lat: 1.38, lng: 103.8}" :zoom="12" style="width: 100%; height: 250px">
                              <gmap-polygon :paths="item.paths" :editable="false" >
                              </gmap-polygon>
                            </gmap-map>
                         </b-card-image>
                        <div class="mt-3"><router-link :to="'/tasks/'+item.id"><b-card-title>  {{item.title}} </b-card-title></router-link> </div>
                        <b-card-text> {{item.description}} </b-card-text>                        
                    </b-card>
                </b-col>
            </b-card-group>
        </b-row> 
    </base-header>
    
    <!--Tables-->

    <b-row class="mt--6 mb-3 ml-4">
        <b-col class="section-header"> Задания на карте </b-col>
        
      </b-row>
      
        
      
       <b-row id="map">
           <b-col>
           <gmap-map :center="{lat: 56.18, lng: 36.97}" :zoom="13" style="width: 100%; height: 500px">
              <gmap-polygon v-for="item in tasksMap" :key="item.id" :paths="item.paths" :editable="false" @paths_changed="updateEdited($event)" @click="selectTask(item.id)" />
              
            </gmap-map>
           </b-col>
        </b-row>
    
    <b-container fluid class="mt-7">
      <b-row class="mt-5">
        <light-table />
      </b-row>
      
      <!--End tables-->
    </b-container>

  </div>
</template>
<script>
  // Tables
  import LightTable from "./Tasks/PublicTaskList"; 



  export default {
    components: {
      LightTable          
    },
    data() {
      return {
      };
    },
    computed: {
        tasks() {
            let array = [
                {
                    id: '12321',
                    title: 'Убрать мусор на улице Московской',
                    description: 'Билет на любой спектакль театра имени Станиславского в июне 2022 года',
                    paths: [ {lat: 1.380, lng: 103.800}, {lat:1.380, lng: 103.810}, {lat: 1.390, lng: 103.810}, {lat: 1.390, lng: 103.800} ]
                },
                {
                    id: '12321',
                    title: 'Опрос по поводу изменения транспортной развязки на ул. Кирова',
                    description: 'Возможность бесплатной аренды 4 соток земли в Солнечногорском районе на срок до 3 лет',
                    paths: [ {lat: 1.380, lng: 103.800}, {lat:1.380, lng: 103.810}, {lat: 1.390, lng: 103.810}, {lat: 1.390, lng: 103.800} ]
                },
                {
                    id: '12321',
                    title: 'Сфотографировать состояние дорожного полотна на ул. Мяснцикой',
                    description: 'Купон на скидку в сети "Магнит" дает скидку до 10% и дейставует в течение 3 месяцев',
                    paths: [ {lat: 1.380, lng: 103.800}, {lat:1.380, lng: 103.810}, {lat: 1.390, lng: 103.810}, {lat: 1.390, lng: 103.800} ]
                }
                 
            ];
            return array;
        },
        tasksMap() {

        
          return [
            
            {
              id: 1,
              paths:  [ {lat: 56.18, lng: 36.97},  {lat: 56.18, lng: 36.98}, {lat:56.187, lng: 36.98}, {lat: 56.187, lng: 36.97} ],
            },
            {
              id: 2,
              paths: [ {lat: 56.17, lng: 36.96}, {lat: 56.17, lng: 36.95}, {lat: 56.16, lng: 36.95}, {lat: 56.16, lng: 36.96} ]
            }
          ]
        }    
    },
    methods: {
      selectTask(taskId) {
              console.log('Task is selected, id=' + taskId);
              this.$router.push('/tasks/' + taskId);
      }
    },
    mounted() {
    }
  };
</script>
<style>
.el-table .cell{
  padding-left: 0px;
  padding-right: 0px;

}
.header-first {
  color: white;
  margin-left: 16px;
  margin-bottom: 16px; 
}
.section-header {
  color: white;
  font-weight: 600;
  
}
</style>
