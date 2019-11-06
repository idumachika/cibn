import {
    ApiService
} from "./api.service";

const Reportservice = {
    listReport: async () => {
        return await ApiService.get("/reports/me/invitee").then((res) => {
            window.console.log("view schedule", res);
            return Promise.resolve(res.data);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    },
    Report: async ({
                id,
                objectives,
                goals,
                summary,
                outcome
            }) => {
        return await ApiService.post('/reports', {
            id: id,
            objectives: objectives,
            goals: goals,
            summary: summary,
            outcome: outcome
        }).then((res) => {
            return Promise.resolve(res.data);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        })
    }

};

export {
    Reportservice
};