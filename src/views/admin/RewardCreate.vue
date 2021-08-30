<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success" />
    
    <b-container fluid class="mt--7">
        <b-row class="task-card">
           <b-form  @submit.prevent="createReward()">
            <b-card img-top img-start class="w-100">
                

                <image-uploader
                  class="mb-3"
                  :debug="1"
                  :autoRotate=true
                  outputFormat="file"
                  :preview=true
                  :className="['fileinput', { 'fileinput--loaded' : hasImage }]"
                  accept="image/*"
                  doNotResize="['gif', 'svg']"
                  @input="setImage"
                  
                >
                  
                </image-uploader>
                
                <div class="form-header"> Название </div>
                <b-form-input
                  class="mb-3 mt-1"
                  type="text"
                  label="Название"
                  placeholder=""
                  v-model="rewardInfo.title"
                >
                </b-form-input>
                <div class="form-header"> Описание </div>
                
                  <!--  <label class="form-control-label">About Me</label> -->
                  <b-form-textarea rows="4" class="mb-3 mt-1" v-model="rewardInfo.description" id="about-form-textaria" placeholder="A few words about you ..."></b-form-textarea>
                
                <div class="form-header"> Стоимость </div>
                <b-form-input
                  class="mb-3 mt-1"
                  type="text"
                  label="Стоимость"
                  placeholder=""
                  v-model="rewardInfo.price"
                >
                </b-form-input>
                <div class="bottom-row">            
                  <b-button variant="primary" type="submit" >Создать </b-button> 
                </div>
              </b-card> 
           </b-form>   
        </b-row>
       
    </b-container>
       
  </div>
</template>
<script>
  import ImageUploader from 'vue-image-upload-resize'

  export default {
    components: {
        ImageUploader
    },
    data() {
      return {
        file: null,
        hasImage: false,
        rewardInfo: {
            title: 'Билет в театр имени Станиславского',
            description: 'Билет на любой спектакль театра имени Станиславского в июне 2022 года.',
            reward: 10,
            pictureLink: 'https://city-helper.herokuapp.com/static/media/img1.fe321597.jpg',
        }

      }
    },
    
    methods: {
      createReward() {
        let data = new FormData();
        data.append('title', this.rewardInfo.title);
        data.append('description', this.rewardInfo.description);
        data.append('price', this.rewardInfo.price);
        data.append('picture', this.file);
        
        for (var pair of data.entries()) {
          console.log(pair[0]+ ', ' + pair[1]); 
        }

        this.$http.post('api/rewards/create', data,
            {
              headers: {
               'Content-Type': 'multipart/form-data',
            }
            })
            .then(response => {
              console.log(response.data);
              console.log('success');
              this.$router.push('/admin/rewards/');
                  
            })
            .catch (error => {
              console.log('aaa');              
            })
      },
      uploadImage(event) {
        this.file = event.target.files[0]; 

      },
      setImage(file) {
        this.file = file
      }
    },
    mounted() {
          }
  };
</script>
<style>
.task-card {
    display: flex;
    justify-content: center;
}
.topic {
    font-weight: 600;
    margin-right: 8px;
}
.card-text {
    display: flex;
}
.form-header {
    font-weight: 600;
}
.bottom-row{
  margin-top: 24px;
  display: flex;
  justify-content: space-around;
}
</style>
