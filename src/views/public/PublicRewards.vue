<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row class="rewards-list">
            <div class="header-first"> Заработанные награды </div>
            <b-card-group deck>
                <b-col sm="12" md="4" v-for="item in rewardsReceived" :key="item.id">
                    <b-card img-src="https://picsum.photos/300/300/?image=41" img-top>
                        <router-link :to="'/rewards/'+item.id"><b-card-title>  {{item.title}} </b-card-title></router-link>
                        <b-card-text> {{item.description}}</b-card-text>
                        <b-card-text class="card-text"> <div class="topic"> Стоимость </div> {{item.price}} баллов</b-card-text>
                        <b-button class="mx-auto" :to="'/rewards/'+item.id">Посмотреть </b-button>
                    </b-card>
                </b-col>
            </b-card-group>
        </b-row> 
        <div class="pt-5 header-first"> Доступные награды </div>
    </base-header>
    
    <!--Tables-->
    
    <b-container fluid class="mt--7">
      
        <b-card-group deck>
                <b-col sm="12" md="4" v-for="item in rewardsAvailable" :key="item.id">
                    <b-card img-src="https://picsum.photos/300/300/?image=41" img-top>
                        <router-link :to="'/rewards/'+item.id"><b-card-title>  {{item.title}} </b-card-title></router-link>
                        <b-card-text> {{item.description}}</b-card-text>
                        <b-card-text class="card-text"> <div class="topic"> Стоимость </div> {{item.price}} баллов</b-card-text>
                        <b-button class="mx-auto" :to="'/rewards/'+item.id">Посмотреть </b-button>
                    </b-card>
                </b-col>
            </b-card-group>
      
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
      };
    },
    computed: {
        rewardsReceived() {
            let array = [
                {
                    id: '12321',
                    title: 'Билет в театр имени Станиславского',
                    description: 'Билет на любой спектакль театра имени Станиславского в июне 2022 года'
                },
                {
                    id: '12321',
                    title: 'Бесплатная аренда земли',
                    description: 'Возможность бесплатной аренды 4 соток земли в Солнечногорском районе на срок до 3 лет'
                },
                {
                    id: '12321',
                    title: 'Скидка в магазинах сети "Магнит"',
                    description: 'Купон на скидку в сети "Магнит" дает скидку до 10% и дейставует в течение 3 месяцев'
                }
                 
            ];
            return array;
        },
        rewardsAvailable() {
            let array = [
                {
                    id: '12321',
                    title: 'Билет в театр имени Станиславского',
                    description: 'Билет на любой спектакль театра имени Станиславского в июне 2022 года'
                },
                {
                    id: '12321',
                    title: 'Бесплатная аренда земли',
                    description: 'Возможность бесплатной аренды 4 соток земли в Солнечногорском районе на срок до 3 лет'
                },
                {
                    id: '12321',
                    title: 'Скидка в магазинах сети "Магнит"',
                    description: 'Купон на скидку в сети "Магнит" дает скидку до 10% и дейставует в течение 3 месяцев'
                },
                {
                    id: '12321',
                    title: 'Скидка в магазинах сети "Магнит"',
                    description: 'Купон на скидку в сети "Магнит" дает скидку до 10% и дейставует в течение 3 месяцев'
                },
                {
                    id: '12321',
                    title: 'Скидка в магазинах сети "Магнит"',
                    description: 'Купон на скидку в сети "Магнит" дает скидку до 10% и дейставует в течение 3 месяцев'
                },
                 
            ];
            return array;
        }
    },
    methods: {
    },
    mounted() {
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

</style>
