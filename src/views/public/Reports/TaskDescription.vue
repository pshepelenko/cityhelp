<template>
    <div>
        <gmap-map :center="{lat: 56.18, lng: 36.97}" :zoom="12" style="width: 100%; height: 250px">
                              <gmap-polygon :paths="task.paths" :editable="false" >
                              </gmap-polygon>
                            </gmap-map>

        <router-link :to="'/tasks/'+taskId"> {{description}} </router-link>
    </div>
</template>
<script>
export default {
    props: ['taskId'],
    data() {
        return {
            description: '',
            task: {},            
        }        
    },
    methods:
    {
        getTaskInfo () {
        this.$http.get('api/tasks/' + this.taskId,null,
         {
            headers: {
              // remove headers
            }
          })
          .then(response => {
            this.task = response.data[0];
            this.description = this.task.description;
            console.log(response.data[0]);
          })
        },
    },
    mounted() {
        this.getTaskInfo();
        //console.log('taskId = ' + taskId);    
    }
}
</script>