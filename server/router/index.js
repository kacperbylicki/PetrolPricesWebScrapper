import express from 'express';
import redis from 'redis';

import { 
    getPetrolPrices 
} from '../middleware';

import { 
    petrol_url,
    redis_port
} from '../env';

export const route = express.Router();

const client = redis.createClient(redis_port);

route.get('/', async (req, res) => {
    try {

        res.status(200).send({ message: `Petrol API's Online!`});

    } catch (error) {

        res.status(500).send({ error: error });

    }
});

route.get('/petrol', async (req, res) => {
    try {
        const petrolItem = req.originalUrl;
        
        client.get(petrolItem, async (error, petrolArray) => {
            if (petrolArray) {

                return res.status(200).send({  
                    data: JSON.parse(petrolArray)
                });

            } else {

                const petrolPrices = await getPetrolPrices( petrol_url );

                if (petrolPrices !== [] && petrolPrices !== undefined) {
                    client.setex(petrolItem, 86400, JSON.stringify(petrolPrices));

                    return res.status(200).send({  
                        data: petrolPrices 
                    });
                }

            }
        });

    } catch (error) {

        res.status(500).send(error);

    }
});
