import axios from "axios";

const baseUrlApi = "http://localhost:3000/api/";

//Définition de l'instance
let instance = null
updateAxiosInstance()

//connection utilisateur
export async function loginUser (userInfo) {
    try {
        const res = await instance.post("auth/login", userInfo);
        return [res.data, null]
    } catch (error) {
        return [null, error.response.data.error]
    }
    
}
//initialisation de l'instance axios
export async function updateAxiosInstance () {
    
    instance = axios.create({
      baseURL: baseUrlApi
    })
  }