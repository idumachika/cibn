import {
    ApiService
} from "./api.service";

const ViewRequestservice = {
    ViewRequest: async () => {
        return await ApiService.get("/invites/me/invitee").then((res) => {
            window.console.log("view request",res);
            return Promise.resolve(res.data.invite);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    },
    
};

export {
    ViewRequestservice
};