<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success" >
    
    </base-header>
    
    <b-container fluid class="mt--7">
        <b-row class="task-card">
           
            <b-card img-top img-start class="w-50">
                <b-card-img class="mb-3" :top="true" :start="true"  :src="rewardInfo.picturelink" />
                <b-card-text class="card-text"> <div class="topic"> Название </div> {{rewardInfo.title}}</b-card-text>
                <b-card-text class="card-text"> <div class="topic"> Описание </div> {{rewardInfo.description}}</b-card-text>
                <b-card-text class="card-text"> <div class="topic"> Стоимость </div> {{rewardInfo.price}}</b-card-text>
                
                <div class="bottom-row">            
                  <b-button v-if="isOwned == false"  @click="buyReward()" variant="primary" type="submit" >Купить </b-button> 
                </div>
              </b-card> 
            
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
        rewardInfo: {},
        isOwned: false,
        activeRewards: [],
        rewardsList: [],
      }
    },
   
    methods: {
      buyReward() {
         let user = JSON.parse(localStorage.getItem('user'));
         this.$http.post('api/rewards/buy', {rewardId: this.rewardInfo.rewardid, userId: user.login},
          {
            headers: {
            // remove headers
          }
          })
          .then(response => {
            console.log('success ');
            this.isOwned=true;        
            let user = JSON.parse(localStorage.getItem('user'));
            user.balance = user.balance - this.rewardInfo.price;
            console.log (user);
            localStorage.setItem('user',JSON.stringify(user));
          })
          .catch (error => {
            console.log(error);
          })

      },
      getRewardData() {
              var userInfo = JSON.parse(localStorage.getItem('user'));
              console.log('the user id is ' + userInfo.login);
              this.$http.get('api/rewards/active/users/' + userInfo.login,null,
              {
                headers: {
                  // remove headers
                }
              })
              .then(response => {
                this.activeRewards = response.data;
                //console.log(response.data);
                for (let item of this.activeRewards) {
                  this.rewardsList.push(item.rewardid)
                }
                console.log(this.rewardsList);
                this.$http.get('api/rewards/' + this.$route.params.id,null,
                  {
                      headers: {
                        // remove headers
                      }
                    })
                    .then(response => {
                      this.rewardInfo = response.data[0];
                      if (this.rewardsList.includes(this.rewardInfo.rewardid)) {
                        this.isOwned = true;
                      }
                    })
              })
      },
    },
    mounted() {
      this.getRewardData();
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
