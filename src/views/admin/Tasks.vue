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
              <gmap-polygon v-for="item in tasks" :key="item.id" :paths="item.paths" :editable="false" @paths_changed="updateEdited($event)" @click="selectTask(item.taskid)" @mouseover="showinfo(item.taskid)"/>
              
            </gmap-map>

        </b-row>
      
      
      <b-row class="mt-5">
        <light-table :tasks="tasks"/>
      </b-row>
      
      <!--End tables-->
    </b-container>

  </div>
</template>
<script>
  // Components
  import BaseProgress from '@/components/BaseProgress';
  import StatsCard from '@/components/Cards/StatsCard';

  // Tables
  import LightTable from "./Tasks/TaskList"; 



  export default {
    components: {
      BaseProgress,
      LightTable          
    },
    data() {
      return {
        edited: null,
        tasks: [
          
          {
            id: 1,
            paths:  [  ],
          },
          {
            id: 2,
            paths: [ ]
          }
        ],    
        
      };
    },
    mounted() {
        this.$http.get('http://127.0.0.1:3000/tasks/',null,
         {
            headers: {
              // remove headers
            }
          })
          .then(response => {
            this.tasks = response.data;
          })
        
    },
    methods: {
      
      selectTask(taskId) {
              console.log('Task is selected, id=' + taskId);
              this.$router.push('/admin/tasks/' + taskId);
      },
      showInfo(taskId) {
        console.log('it works' + taskId);
      }
    },
    
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
