<template>
  <div>
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header">
      <b-container fluid>
        <span class="mask bg-gradient-success opacity-8"></span>
        
      </b-container>
    </div>

    <b-container fluid class="mt--8">
      
        <b-col xl="10" class="mx-auto ">
          <ReportCreateForm taskId="8"/>
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
          
        }
   
  };
</script>
<style>
</style>
