<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success" />
    
    <b-container fluid class="mt--7">
        <b-row class="rewards-list">
            <b-card-group deck>
                <b-col sm="12" md="4" v-for="item in rewards" :key="item.id">
                    <b-card img-src="https://picsum.photos/300/300/?image=41" img-top>
                        <router-link :to="'/admin/rewards/'+item.id"><b-card-title>  {{item.title}} </b-card-title></router-link>
                        <b-card-text> {{item.description}}</b-card-text>
                        <b-card-text class="card-text"> <div class="topic"> Стоимость </div> {{item.price}} баллов</b-card-text>
               
                         <b-button class="mx-auto" :to="'/admin/rewards/'+item.id">Редактировать </b-button>
                    </b-card>
                </b-col>
            </b-card-group>
        </b-row>
    </b-container>

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
        rewards() {
            let array = [
                {
                    id: '12321',
                    title: 'Билет в театр имени Станиславского',
                    description: 'Билет на любой спектакль театра имени Станиславского в июне 2022 года',
                    price: 100,
                },
                {
                    id: '12321',
                    title: 'Бесплатная аренда земли',
                    description: 'Возможность бесплатной аренды 4 соток земли в Солнечногорском районе на срок до 3 лет',
                    price: 100,
                },
                {
                    id: '12321',
                    title: 'Скидка в магазинах сети "Магнит"',
                    description: 'Купон на скидку в сети "Магнит" дает скидку до 10% и дейставует в течение 3 месяцев',
                    price: 100,
                }
                 
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
.topic {
    font-weight: 600;
    margin-right: 8px;
}
.card-text {
    display: flex;
}
</style>
