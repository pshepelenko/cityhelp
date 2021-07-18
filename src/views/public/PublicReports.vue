<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row class="top-row">
        <div class="header-first">  </div>
        <b-button to="/report/create"> Отправить отчет </b-button>
      </b-row>

      <b-row class="rewards-list">
            
            <b-card-group deck>
                <b-col sm="12" md="4" v-for="item in rewards" :key="item.id">
                    <b-card  img-top>
                        <b-card-image  > 
                            <gmap-map :center="{lat: 1.38, lng: 103.8}" :zoom="12" style="width: 100%; height: 250px">
                              <gmap-polygon :paths="item.paths" :editable="false" >
                              </gmap-polygon>
                            </gmap-map>
                         </b-card-image>
                        <div class="mt-3" ><router-link  :to="'/tasks/'+item.id"><b-card-title>  {{item.title}} </b-card-title></router-link> </div>
                        <b-card-text> {{item.description}}</b-card-text>
                        <b-button :to="'/reports/' + item.id"> Посмотреть отчет </b-button>
                    </b-card>
                </b-col>
            </b-card-group>
        </b-row> 
    </base-header>
    
    <!--Tables-->
    
    <b-container fluid class="mt--7">
      
      
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
        rewards() {
            let array = [
                {
                    id: '12321',
                    title: 'Билет в театр имени Станиславского',
                    description: 'Билет на любой спектакль театра имени Станиславского в июне 2022 года',
                    paths: [ {lat: 1.380, lng: 103.800}, {lat:1.380, lng: 103.810}, {lat: 1.390, lng: 103.810}, {lat: 1.390, lng: 103.800} ]
        
                
                },
                {
                    id: '12321',
                    title: 'Бесплатная аренда земли',
                    description: 'Возможность бесплатной аренды 4 соток земли в Солнечногорском районе на срок до 3 лет',
                    paths: [ {lat: 1.380, lng: 103.800}, {lat:1.380, lng: 103.810}, {lat: 1.390, lng: 103.810}, {lat: 1.390, lng: 103.800} ]
                },
                {
                    id: '12321',
                    title: 'Скидка в магазинах сети "Магнит"',
                    description: 'Купон на скидку в сети "Магнит" дает скидку до 10% и дейставует в течение 3 месяцев',
                    paths: [ {lat: 1.380, lng: 103.800}, {lat:1.380, lng: 103.810}, {lat: 1.390, lng: 103.810}, {lat: 1.390, lng: 103.800} ]
                }
                 
            ];
            return array;
        }
    },
    methods: {
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
.top-row {
  display: flex;
  justify-content: space-between;
  padding-right: 15px;
  margin-bottom: 16px;
}
</style>
