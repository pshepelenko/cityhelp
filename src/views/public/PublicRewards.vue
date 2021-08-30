<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row class="rewards-list">
            <div class="header-first"> Заработанные награды </div>
            <b-card-group deck>
                <b-col sm="12" md="4" v-for="item in rewardsReceived" :key="item.id">
                    <b-card :img-src="item.picturelink" img-top>
                        <router-link :to="'/rewards/'+item.rewardid"><b-card-title>  {{item.title}} </b-card-title></router-link>
                        <b-card-text> {{item.description}}</b-card-text>
                        <b-card-text class="card-text"> <div class="topic"> Стоимость </div> {{item.price}} баллов</b-card-text>
                        <b-button class="mx-auto" :to="'/rewards/'+item.rewardid">Посмотреть </b-button>
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
                    <b-card :img-src="item.picturelink" img-top>
                        <router-link :to="'/rewards/'+item.rewardid"><b-card-title>  {{item.title}} </b-card-title></router-link>
                        <b-card-text> {{item.description}}</b-card-text>
                        <b-card-text class="card-text"> <div class="topic"> Стоимость </div> {{item.price}} баллов</b-card-text>
                        <b-button class="mx-auto" :to="'/rewards/'+item.rewardid">Посмотреть </b-button>
                    </b-card>
                </b-col>
            </b-card-group>
      
      <!--End tables-->
    </b-container>

  </div>
</template>
<script>



  export default {
    components: {
    },
    data() {
      return {
          rewardsReceived: [],
          rewardsAvailable: [],
      };
    },
    
    methods: {
        getActiveRewards() {
              var userInfo = JSON.parse(localStorage.getItem('user'));
              console.log('the user id is ' + userInfo.login);
              this.$http.get('api/rewards/active/users/' + userInfo.login,null,
              {
                headers: {
                  // remove headers
                }
              })
              .then(response => {
                this.rewardsReceived = response.data;
                console.log(response.data);
              })
      },
      getAvailableRewards() {
              var userInfo = JSON.parse(localStorage.getItem('user'));
              console.log('the user id is ' + userInfo.login);
              this.$http.get('api/rewards/available/users/' + userInfo.login,null,
              {
                headers: {
                  // remove headers
                }
              })
              .then(response => {
                this.rewardsAvailable = response.data;
                console.log(response.data);
              })
      },
    },
    mounted() {
        this.getActiveRewards();
        this.getAvailableRewards();
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
