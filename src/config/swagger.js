const swaggerJsDoc=require("swagger-jsdoc");

const servers = [
    { url: "/", description: "Same host as this docs page (use on Render or local)" },
];
if (process.env.PUBLIC_API_URL) {
    servers.push({
        url: String(process.env.PUBLIC_API_URL).replace(/\/$/, ""),
        description: "PUBLIC_API_URL from .env",
    });
}
servers.push(
    { url: "https://sitandlipapi.onrender.com", description: "Legacy example" },
    { url: "http://localhost:8080", description: "Local default" }
);

const option={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"API",
            version:"1.0.0",
            description:"API for the application"
        },
        servers,
        components:{
            securitySchemes:{
                BearerAuth:{
                    type:"http",
                    scheme:"bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis:["src/api/v1/routes/**/*.js"]  
};

const specs=swaggerJsDoc(option);
module.exports=specs;
