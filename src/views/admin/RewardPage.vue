<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success" />
    
    <b-container fluid class="mt--7">
        <b-row class="task-card">
           <b-col md="12" sm="12">
              <b-card img-top img-start class="w-75">
                <b-form @submit.prevent="saveEdits()">
                <b-row class="">
                  <div class="picture" v-b-modal.modal-1 :style="{ backgroundImage: 'url(' + rewardInfo.picturelink + ')' }"  >
                    <div class="opacity" >
                        <div class="header">Нажмите, чтобы поменять фото </div>
                    </div>
                  </div>
                </b-row>

                <b-modal id="modal-1" title="Пожалуйста загрузите изображение" ok-only>
                  
                   <input type="file" @change="onFileChange" />
                  
                  <div id="preview">
                    <img v-if="imageChanged" :src="rewardInfo.picturelink" />
                  </div>
                
                </b-modal>               
                
                <div class="form-header mt-5"> Название </div>
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
                  <b-button to="/admin/rewards/"> Отмена </b-button> <b-button variant="primary" type="submit" >Сохранить </b-button> 
                </div>
              </b-form>   
              </b-card> 
           
           </b-col>      
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
        imageChanged: false,
        rewardInfo: {},
      }
    },
    
    methods: {
      onFileChange(e) {
        const file = e.target.files[0];
        this.imageChanged = true;
        this.rewardInfo.picturelink = URL.createObjectURL(file);;
      },
      
      showCurrentData() { 
        this.$http.get('api/rewards/'+this.$route.params.id, this.task,
            {
              headers: {
              // remove headers
            }
            })
            .then(response => {
              console.log(response.data);
              this.rewardInfo = response.data[0];
              this.url = rewardInfo.picturelink;    
            })
            .catch (error => {
              console.log('aaa');              
            })
      },
      saveEdits() {
        this.$http.put('api/rewards/update', this.rewardInfo,
            {
              headers: {
              // remove headers
            }
            })
            .then(response => {
              console.log(response.data);
              this.$router.push('/admin/rewards/');
                  
            })
            .catch (error => {
              console.log('aaa');              
            })
      },
      
    },
    mounted() {
    this.showCurrentData();
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
.picture {
    
    width: 300px;
    height: 300px;
    border-radius: 5px;
    
    margin: 0 auto;
}
.opacity {
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.6;
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 5px;
}
.header {
    color: white;
    
}
</style>
