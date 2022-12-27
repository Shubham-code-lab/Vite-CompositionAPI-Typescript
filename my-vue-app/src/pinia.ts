import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
    state: () => ({ count: 45, name: 'Eduardo', userId:null, email: null, token:null,tokenExpiration: null }),
    getters: {
      doubleCount: (state) => state.count * 2,
      getUserDetail:(state)=>{
        return {
            userId: state.userId,

        }
      }
    },
    actions: {
      increment() {
        console.log("pinia increment");
        this.count++
      },
      async signUp(email, password){
        console.log(email, password);
         const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAcD3jja7amZT-iBgDn3tNu5WYN18H6erU`,
         {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
         })
         const responseData = await response.json();
         if(!response.ok){
            console.log(responseData);
            const error = new Error(responseData.message || 'Failed to authenticate');
            throw error;
         }
         console.log(responseData);
        //  this.userId = responseData.localId;
        //  this.token = responseData.idToken;
        //  this.email = responseData.email;
        //  this.tokenExpiration = responseData.expiresIn;
        //  console.log(this.userId, this.token, this.email, this.tokenExpiration);
      }
    },
})