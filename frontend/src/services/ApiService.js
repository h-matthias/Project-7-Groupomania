import axios from "axios";

const baseUrlApi = "http://localhost:3000/api/";

//Définition de l'instance
let instance = null
updateAxiosInstance()

//connection utilisateur
export async function loginUser (user) {
    try {
        const res = await instance.post("auth/login", user);
        return [res.data, null]
    } catch (error) {
        return [null, error.response.data.error]
    }
}

export async function signUp (user) {
    try {
        const res = await instance.post("auth/signup", user)
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