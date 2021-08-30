<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success" />
    
    <!--Charts-->
    <b-container fluid class="mt--7">
      <b-row>
        <b-col xl="8" class="mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <b-row align-v="center" slot="header">
              <b-col>
                <h6 class="text-light text-uppercase ls-1 mb-1">Статистика</h6>
                <h5 class="h3 text-white mb-0">Получение и обработка отчетов от исполнителей</h5>
              </b-col>
              
            </b-row>
            <line-chart
              :height="350"
              ref="bigChart"
              :chart-data="bigLineChart.chartData"          
              
            >
            </line-chart>
          

          
          </card>
        </b-col>

       
      </b-row>
      <!-- End charts-->
      
      <!--Tables-->
      <b-row class="mt-5">
        <light-table/>
      </b-row>
      
      <!--End tables-->
    </b-container>

  </div>
</template>
<script>
  // Charts
   import LineChart from '@/components/Charts/LineChart';
   // Tables
    import LightTable from "./Reports/ReportsList"; 
    import moment from 'moment';


  export default {
    components: {
      LineChart,
      LightTable          
    },
    data() {
      return {
        reports: [],
        bigLineChart: {
          chartData: {
                    
          },          
        },
        
      };
    },
    
    methods: {
      initBigChart(index) {
          let date = new Date();
          date.setDate(date.getDate() - 9);
          let chartData = {
          datasets: [
            {
              label: 'Получено',
              data: [],
            },
            {
              label: 'Проверено',
              data: [],
              borderColor: 'rgb(45, 232, 192)',
              backgroundColor: 'rgb(45, 232, 192)',
              fill: false,
            },

          ],
          labels: [],
            
        };
        this.$http.get('http://127.0.0.1:3000/statistics/',{},
         {
            headers: {
              // remove headers
            }
          })
          .then(response => {
            console.log(response.data);
            
            for (let i = 8; i >= 0; i--) {
              chartData.datasets[0].data.push(response.data[i].reportssubmitted);
              chartData.datasets[1].data.push(response.data[i].reportschecked);
              chartData.labels.push(moment(date.setDate(date.getDate() + 1)).format('DD.MM'));
            };
            this.bigLineChart.chartData = chartData;
          })
          .catch (error => {
              console.log('aaa');
          })


        
        
      },
      
    
    },
    mounted() {
      this.initBigChart();
      //this.initTable();
    }
  };
</script>
<style>
.el-table .cell{
  padding-left: 0px;
  padding-right: 0px;
}
</style>
