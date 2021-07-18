<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
     
    </base-header>
    
    <!--Tables-->
    
    <b-container fluid class="mt--8">
      <b-row class="mb-4">
        <b-col class="header"> Задания на карте </b-col>
        <b-button to="/admin/task/create"> Создать задание </b-button>
      </b-row>
      
        
      
       <b-row id="map">
           <gmap-map :center="{lat: 56.18, lng: 36.97}" :zoom="13" style="width: 100%; height: 500px">
              <gmap-polygon v-for="item in tasks" :key="item.id" :paths="item.paths" :editable="false" @paths_changed="updateEdited($event)" @click="selectTask(item.id)" />
              
            </gmap-map>

        </b-row>
      
      
      <b-row class="mt-5">
        <light-table />
      </b-row>
      
      <!--End tables-->
    </b-container>

  </div>
</template>
<script>
  // Charts
  import * as chartConfigs from '@/components/Charts/config';
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';

  // Components
  import BaseProgress from '@/components/BaseProgress';
  import StatsCard from '@/components/Cards/StatsCard';

  // Tables
  import LightTable from "./Tasks/TaskList"; 



  export default {
    components: {
      LineChart,
      BarChart,
      BaseProgress,
      StatsCard,
      LightTable          
    },
    data() {
      return {
        edited: null,
        tasks: [
          
          {
            id: 1,
            paths:  [ {lat: 56.18, lng: 36.97},  {lat: 56.18, lng: 36.98}, {lat:56.187, lng: 36.98}, {lat: 56.187, lng: 36.97} ],
          },
          {
            id: 2,
            paths: [ {lat: 56.17, lng: 36.96}, {lat: 56.17, lng: 36.95}, {lat: 56.16, lng: 36.95}, {lat: 56.16, lng: 36.96} ]
          }
        ],    
        
        bigLineChart: {
          allData: [
            [0, 20, 10, 30, 15, 40, 20, 60, 60],
            [0, 20, 5, 25, 10, 30, 15, 40, 40]
          ],
          activeIndex: 0,
          chartData: {
            datasets: [
              {
                label: 'Performance',
                data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
              }
            ],
            labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          },
          extraOptions: chartConfigs.blueChartOptions,
        },
        redBarChart: {
          chartData: {
            labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Sales',
              data: [25, 20, 30, 22, 17, 29]
            }]
          },
          extraOptions: chartConfigs.blueChartOptions
        }
      };
    },
    methods: {
      initBigChart(index) {
        let chartData = {
          datasets: [
            {
              label: 'Performance',
              data: this.bigLineChart.allData[index]
            }
          ],
          labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        };
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
      },
      selectTask(taskId) {
              console.log('Task is selected, id=' + taskId);
              this.$router.push('/admin/tasks/' + taskId);
      }
    },
    mounted() {
      this.initBigChart(0);
    }
  };
</script>
<style>
.el-table .cell{
  padding-left: 0px;
  padding-right: 0px;
}
.header {
  color: white;
  font-weight: 600;
}
</style>
