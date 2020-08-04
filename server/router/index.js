import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        await res.status(200).json({ message: 'Petrol Web-scrapper working correctly.' });
    } catch (error) {
        await res.status(500).json({ message: error });
    }
});

router.get('/petrol', async (req, res) => {
    try {
        const url = process.env.PETROL_URL;
        const response = await axios(url);
        const { data } = response;
        const $ = await cheerio.load(data, { ignoreWhitespace: false });
        const petrolTable = $('.bg-color');

        let Gas95 = petrolTable.find('td:nth-child(2) > a:nth-child(1)').text().replace(/\s+/g, '');
        let Gas98 = petrolTable.find('td:nth-child(3) > a:nth-child(1)').text().replace(/\s+/g, '');
        let ON = petrolTable.find('td:nth-child(4) > a:nth-child(1)').text().replace(/\s+/g, '');
        let ONP = petrolTable.find('td:nth-child(5) > a:nth-child(1)').text().replace(/\s+/g, '');
        let LPG = petrolTable.find('td:nth-child(6) > a:nth-child(1)').text().replace(/\s+/g, '');

        let petrolPrices = [{ PB95: Gas95, PB98: Gas98, ON: ON, ONP: ONP, LPG: LPG }];

        res.status(200).send(petrolPrices);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/mail', async (req, res) => {

});

module.exports = router;
