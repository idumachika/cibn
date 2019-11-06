import {
    ApiService
} from "./api.service";

const Scheduleservice = {
    Schedule:async () => {
        return await ApiService.get("/schedules/me/invitee").then((res) => {
            window.console.log("view schedule", res);
            return Promise.resolve(res.data);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    },
    RequestSchedule: async ({id,time,date,topic,notes}) => {
        return await ApiService.post('/schedules', {id:id,time:time,date:date,topic:topic,notes:notes}).then((res) => {
            return Promise.resolve(res.data);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        })
    }

};

export {Scheduleservice};