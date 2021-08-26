import axios from "axios";

const baseUrlApi = "http://localhost:3000/api/";

//Définition de l'instance
let instance = null
updateAxiosInstance()

/***
 * Gestion utilisateurs
 */
export async function loginUser (user) {
    try {
        const res = await instance.post('auth/login', user);
        return [res.data, null]
    } catch (error) {
        return [null, error.response.data.error]
    }
}

export async function signUp (user) {
    try {
        const res = await instance.post('auth/signup', user)
        return [res.data, null]
    } catch (error) {
        return [null, error.response.data.error]
    }
}

/***
 * Gestion publications
 */
export async function loadPost (token) {
    try {
        const res = await instance.get('post', {"headers": {"Authorization": token}})
        let posts = res.data
        
        for (const post of posts) {
            //formatage de l'heure de création;
            post["createdAt"] = formatedTime(post.createdAt);
            //formatage de l'heure de mise à jour;
            post["updatedAt"] = formatedTime(post.updatedAt);

            //recuperation donné utilisateur du post
            const userPost = await loadUserById(post.userId)
            post["user"] = userPost

            for (const comment of post.comments) {
                //formatage de l'heure de création;
                comment["createdAt"] = formatedTime(comment.createdAt);
                //formatage de l'heure de mise à jour;
                comment["updatedAt"] = formatedTime(comment.updatedAt);
    
                //recuperation donné utilisateur du post
                const userComment = await loadUserById(comment.userId)
                comment["user"] = userComment
            }
        }
        return [posts, null]
    } catch (error) {
        return [null, error.response.data.error]
    }
}

export async function sendPost ({data, token}) {
    try {
        const res = await instance.post('post', data,  {"headers": {"Authorization": token}} )
        return [res.data, null]
    } catch (error) {
        return [null, error.response.data.error]
    }
}


/***
 * Fonction
 */
 function formatedTime(time){
    let date = time.split("T")[0].split("-").reverse().join("/");
    let heure = time.split("T")[1].split(":")[0];
    let minute = time.split("T")[1].split(":")[1];
    return `${date} ${heure}:${minute}`;
}
//fonction non exportable utilisable dans ce scope
async function loadUserById (userID) {
    try {
        const res = await instance.get(`auth/${userID}`)
        return res.data
    } catch (error) {
        return error.response.data.error
    }
}

//initialisation de l'instance axios
export async function updateAxiosInstance () {
    
    instance = axios.create({
      baseURL: baseUrlApi
    })
  }