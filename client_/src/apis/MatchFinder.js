import axios from "axios";
export default axios.create({
    baseURL: "http://localhost:3006/matches"
    // baseURL: "http://localhost:3006/"
});