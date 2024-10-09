import http from "./http.js"
const apiUrl=`https://nestoria-server.vercel.app/api/v1/fur`;
const createUser= data => http.post(`${apiUrl}/auth/login`,data)
const userloginApi={createUser}
export default userloginApi