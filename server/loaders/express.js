import bodyParser from "body-parser";
import cors from 'cors';


export default async (app) => {
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());

    // Parse incoming request bodies as JSON
    app.use(bodyParser.json());

    // Parse URL-encoded bodies (HTML Forms) 
    //{ extended: true } parsing supports nested objects and arrays
    app.use(bodyParser.urlencoded({extended: true}));

    return app;
}