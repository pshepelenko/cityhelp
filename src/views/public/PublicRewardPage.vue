<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success" >
    
    </base-header>
    
    <b-container fluid class="mt--7">
        <b-row class="task-card">
           
            <b-card img-top img-start class="w-75">
                <b-card-img class="mb-3" :top="true" :start="true" v-b-modal.modal-1 src="https://city-helper.herokuapp.com/static/media/img1.fe321597.jpg" />
                <b-card-text class="card-text"> <div class="topic"> Название </div> {{taskInfo.title}}</b-card-text>
                <b-card-text class="card-text"> <div class="topic"> Описание </div> {{taskInfo.description}}</b-card-text>
                <b-card-text class="card-text"> <div class="topic"> Стоимость </div> {{taskInfo.price}}</b-card-text>
                
                <div class="bottom-row">            
                  <b-button variant="primary" type="submit" >Купить </b-button> 
                </div>
              </b-card> 
            
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
