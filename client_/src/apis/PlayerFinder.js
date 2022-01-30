import axios from "axios";
export default axios.create({
    baseURL: "http://localhost:3006/players"
    // baseURL: "http://localhost:3006/"
});