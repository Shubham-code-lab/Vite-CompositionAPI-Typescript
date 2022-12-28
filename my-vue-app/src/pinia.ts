import { defineStore } from 'pinia';

export const userAuthStore = defineStore('authentication', {
    state: () => ({userId:null, email: null, token:null,tokenExpiration: null }),
    getters: {
      getUserDetail:(state)=>{
        return {
            userId: state.userId,
            email: state.email,

        }
      }
    },
    actions: {
      async signUp(userDetail){
        // console.log(email, password);
         const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAcD3jja7amZT-iBgDn3tNu5WYN18H6erU`,
         {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email:userDetail.email,
                password:userDetail.password,
                returnSecureToken: true
            })
         })
         const responseData = await response.json();
         if(!response.ok){
            console.log(responseData);
            const error = new Error(responseData.error.message || 'Failed to authenticate');
            throw error;
         }
   
         const currentStore = userAuthStore();
         const signUpDetail = {
            userId : responseData.localId,
            token : responseData.idToken,
            email : responseData.email,
            tokenExpiration : responseData.expiresIn,
            name:userDetail.name
         }
         currentStore.addUser(signUpDetail);

         console.log(responseData);
        //  this.userId = responseData.localId;
        //  this.token = responseData.idToken;
        //  this.email = responseData.email;
        //  this.tokenExpiration = responseData.expiresIn;
        //  console.log(this.userId, this.token, this.email, this.tokenExpiration);
      },

      async addUser(signUpDetail){
        console.log("check signUpDetail", signUpDetail);
        const response = await fetch(`https://vue-http-demo-ac3b1-default-rtdb.asia-southeast1.firebasedatabase.app/user/${signUpDetail.userId}.json?auth=${signUpDetail.token}`, //?auth=
        {
           method: 'PUT',
           body: JSON.stringify({
               name:signUpDetail.name,
               email:signUpDetail.email,
           })
        })
        const responseData = await response.json();
        if(!response.ok){
           console.log(responseData);
           const error = new Error(responseData.message || 'Failed to authenticate');
           throw error;
        }
      },

      async signIn(signInDetail){
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAcD3jja7amZT-iBgDn3tNu5WYN18H6erU`,
        {
           method: 'POST',
           headers: {
               "Content-Type": "application/json",
           },
           body: JSON.stringify({
               email:signInDetail.email,
               password:signInDetail.password,
               returnSecureToken: true
           })
        })
        const responseData = await response.json();
        if(!response.ok){
           console.log(responseData);
           const error = new Error(responseData.message || 'Failed to authenticate');
           throw error;
        }
  
         this.userId = responseData.localId;
         this.token = responseData.idToken;
         this.email = responseData.email;
         this.tokenExpiration = responseData.expiresIn;
         console.log("login ",this.userId, this.token, this.email, this.tokenExpiration);

        console.log(responseData);
      }
    },
})