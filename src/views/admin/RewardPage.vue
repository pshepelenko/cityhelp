<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success" />
    
    <b-container fluid class="mt--7">
        <b-row class="task-card">
           <b-form>
            <b-card img-top img-start class="w-75">
                <b-card-img class="mb-3" :top="true" :start="true" v-b-modal.modal-1 src="https://city-helper.herokuapp.com/static/media/img1.fe321597.jpg" />
                <div class="form-header"> Название </div>
                <b-form-input
                  class="mb-3 mt-1"
                  type="text"
                  label="Название"
                  placeholder=""
                  v-model="taskInfo.title"
                >
                </b-form-input>
                <div class="form-header"> Описание </div>
                
                  <!--  <label class="form-control-label">About Me</label> -->
                  <b-form-textarea rows="4" class="mb-3 mt-1" v-model="taskInfo.description" id="about-form-textaria" placeholder="A few words about you ..."></b-form-textarea>
                
                <div class="form-header"> Стоимость </div>
                <b-form-input
                  class="mb-3 mt-1"
                  type="text"
                  label="Стоимость"
                  placeholder=""
                  v-model="taskInfo.price"
                >
                </b-form-input>
                <div class="bottom-row">            
                  <b-button > Отмена </b-button> <b-button variant="primary" type="submit" >Сохранить </b-button> 
                </div>
              </b-card> 
           </b-form>   
        </b-row>
       
    </b-container>
     <b-modal id="modal-1" title="Пожалуйста загрузите изображение" ok-only>
                
                  <b-button class="mx-auto">Загрузите фото </b-button> 
                
    </b-modal>  
  </div>
</template>
<script>
  

  export default {
    components: {
        
    },
    data() {
      return {
      }
    },
    computed: {
        taskInfo() {
            let info = {
                    id: '12321',
                    title: 'Билет в театр имени Станиславского',
                    category: 'Экология',
                    description: 'Билет на любой спектакль театра имени Станиславского в июне 2022 года.',
                    price: 10
                };
            return info;
        }
    },
    methods: {
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
