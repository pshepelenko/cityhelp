<template>
  <div>
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header">
      <b-container fluid>
        <span class="mask bg-gradient-success opacity-8"></span>
        
      </b-container>
    </div>

    <b-container fluid class="mt--8">
      
        <b-col xl="10" class="mx-auto ">
          <ReportCreateForm />
        </b-col>
      
    </b-container>
  </div>
</template>
<script>
  
  import ReportCreateForm from './Reports/ReportCreateForm.vue'

  export default {
    components: {
      ReportCreateForm
     
    },
    data() {
        return {
            edited: null,
            paths: [ {lat: 1.380, lng: 103.800}, {lat:1.380, lng: 103.810}, {lat: 1.390, lng: 103.810}, {lat: 1.390, lng: 103.800} ]
        }
    },
    methods: {
          updateEdited(mvcArray) {
            let paths = [];
            for (let i=0; i<mvcArray.getLength(); i++) {
              let path = [];
              for (let j=0; j<mvcArray.getAt(i).getLength(); j++) {
                let point = mvcArray.getAt(i).getAt(j);
                path.push({lat: point.lat(), lng: point.lng()});
              }
              paths.push(path);
            }
            this.edited = paths;
          },
          selectTask(taskId) {
              console.log('Task is selected, id=' + taskId);
              this.$router.push('/admin/tasks/1');
          }
        }
   
  };
</script>
<style>
</style>
