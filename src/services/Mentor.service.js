import { ApiService } from "./api.service";

const Mentorservice = {
    mentorCategory: async () => {
        return await ApiService.get("/users").then((res) => {
            window.console.log(res.data);
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
  
    viewProfile: async (userId) => {
        return await ApiService.get('/users/' + userId).then((res) => {
            return Promise.resolve(res.data);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    },

    RequestMentor: async (id)=>{
       window.console.log('=================',id)
        return await ApiService.post('/invites',{id:id}).then((res)=>{
            return Promise.resolve(res.data);
        }).catch((error)=>{
            return Promise.reject(error.response.data);
        })
    }
};

export { Mentorservice };