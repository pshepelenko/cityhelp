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
                <b-col sm="12" md="6" v-for="item in reports" :key="item.reportid">
                    <b-card  img-top>
                        <TaskDescription :taskId="item.taskid" />
                        <b-card-text> <StatusText :status="item.status" /></b-card-text>
                        
                        <b-button :to="'/reports/' + item.reportid"> Посмотреть отчет </b-button>
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
  import StatusText from '@/components/StatusText.vue'; 
  import TaskDescription from './Reports/TaskDescription.vue';



  export default {
    components: {
      StatusText,
      TaskDescription          
    },
    data() {
      return {
        taskDescription: '',
        reports: [
                
                 
            ],
        tasks: [
                
        ],
      };
    },
    computed: {
         
    },
    directives: {
      getTaskDescription(taskId) {
          var i = 0;
          while (this.tasks[i].taskid != taskId) {
            i++;
          }
          this.taskDescription = this.tasks[i].description;
          console.log ('this.taskDescription = ' + this.taskDescription)
      },
    
    },
    methods: {
      
      getTaskInfo (taskId) {
        this.$http.get('http://127.0.0.1:3000/tasks/' + taskId,null,
         {
            headers: {
              // remove headers
            }
          })
          .then(response => {
            this.tasks.push(response.data[0]);
            console.log(response.data[0]);
          })
      },
      getReports() {
              var userInfo = JSON.parse(localStorage.getItem('user'));
              console.log('the user id is ' + userInfo.login);
              this.$http.get('http://127.0.0.1:3000/reports/users/' + userInfo.login,null,
              {
                headers: {
                  // remove headers
                }
              })
              .then(response => {
                this.reports = response.data;
                console.log(response.data);
                var tasks = [];
                for (var report of response.data) {
                  tasks.push(report.taskid);
                  //this.getTaskInfo (report.taskid);                                 
                }
                console.log("tasks = " + tasks);
              })
      },
    },
    mounted() {
      this.getReports();
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
