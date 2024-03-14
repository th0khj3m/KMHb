import express from 'express';
const router = express.Router();

export default (app) => {
    app.use('/api/watchlist', router);

    router.get('/', async (req, res, next) => {

    });

    router.post('/', async (req, res, next) => {

    });

    router.delete('/', async (req, res, next) => {

    });
    
}