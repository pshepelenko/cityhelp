<template>
  <div>

    <base-header class="pb-5  pt-3 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row class="active-tasks-list">
            <div class="header-first"> Выбранные задания </div>
            <b-card-group deck>
                <b-col sm="12" md="4" v-for="item in tasks" :key="item.taskid">
                    <b-card  img-top>
                         <b-card-img  > 
                            <gmap-map :center="{lat: 1.38, lng: 103.8}" :zoom="12" style="width: 100%; height: 250px">
                              <gmap-polygon :paths="item.paths" :editable="false" >
                              </gmap-polygon>
                            </gmap-map>
                         </b-card-img>
                        <div class="mt-3"><router-link :to="'/tasks/'+item.taskid"><b-card-title>  {{item.title}} </b-card-title></router-link> </div>
                        <b-card-text> {{item.description}} </b-card-text>                        
                    </b-card>
                </b-col>
            </b-card-group>
        </b-row> 
    </base-header>
    
    <!--Tables-->

    <b-row class="mt--5 mb-3 ml-4">
        <b-col class="section-header"> Задания на карте </b-col>
        
      </b-row>
      
        
      
       <b-row id="map">
           <b-col>
           <gmap-map :center="{lat: 56.18, lng: 36.97}" :zoom="13" style="width: 100%; height: 500px">
              <gmap-polygon v-for="item in availableTasks" :key="item.id" :paths="item.paths" :editable="false" @paths_changed="updateEdited($event)" @click="selectTask(item.id)" />
              
            </gmap-map>
           </b-col>
        </b-row>
    
    <b-container fluid class="mt-7">
      <b-row class="mt-5">
        <light-table :tasks="availableTasks" />
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
        tasks: [
                
        ],
        availableTasks: [
                
        ]
      };
    },
    computed: {
        
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
      },
      getActiveTasks() {
              var userInfo = JSON.parse(localStorage.getItem('user'));
              console.log('the user id is ' + userInfo.login);
              this.$http.get('api/tasks/active/users/' + userInfo.login,null,
              {
                headers: {
                  // remove headers
                }
              })
              .then(response => {
                this.tasks = response.data;
                console.log(response.data);
              })
      },
      getAvailableTasks() {
              var userInfo = JSON.parse(localStorage.getItem('user'));
              console.log('the user id is ' + userInfo.login);
              this.$http.get('api/tasks/available/users/' + userInfo.login,null,
              {
                headers: {
                  // remove headers
                }
              })
              .then(response => {
                this.availableTasks = response.data;
                console.log(response.data);
              })
      },
    },
    mounted() {
      this.getActiveTasks();
      this.getAvailableTasks();
    }
  };
</script>
<style>
.el-table .cell{
  padding-left: 0px;
  padding-right: 0px;

}
.active-tasks-list {
  display: flex;
  flex-direction: column;
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
