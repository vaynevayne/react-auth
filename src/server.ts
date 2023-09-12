// src/server.js
import { createServer, Model } from "miragejs"

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create("user", { name: "admin",role:['admin'],token:'admin-token' })
      server.create("user", { name: "Alice",role:[],token:'custom-token' })
    },

    routes() {
      this.namespace = "api"

      this.get("/user/:token", (schema, request) => {
        let id = request.params.token
        console.log('api:user');
        
        return schema.users.find(id);
      },{ timing: 4000 })
    },
  })

  return server
}