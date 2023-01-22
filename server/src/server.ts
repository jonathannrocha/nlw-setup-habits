import Fastify from "fastify";
import cors from "@fastify/cors";
import { apppRoutes } from "./routes";

const app = Fastify();
        

app.register(cors);
app.register(apppRoutes)


app.setErrorHandler(function (error, req, res) {
    console.error(error)
    res.status(500).send(error.message)
})
  

app.listen({
    port: 3333,
}).then(()=> {
    console.log('server run port:http://localhost:3333')
})


