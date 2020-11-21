import axios from 'axios';
import cheerio from 'cheerio';

export const getTable = async ( URL ) => {
    const { data } = await axios( URL );

    const $ = cheerio.load(data, { ignoreWhitespace: false });

    return $('.bg-color');
}

export const getPetrolPrices = async ( URL ) => {
    const petrolTable = await getTable( URL );

    const PB95 = petrolTable.find('td:nth-child(2) > a:nth-child(1)').text().replace(/\s+/g, '');
    const PB98 = petrolTable.find('td:nth-child(3) > a:nth-child(1)').text().replace(/\s+/g, '');
    const ON = petrolTable.find('td:nth-child(4) > a:nth-child(1)').text().replace(/\s+/g, '');
    const ONP = petrolTable.find('td:nth-child(5) > a:nth-child(1)').text().replace(/\s+/g, '');
    const LPG = petrolTable.find('td:nth-child(6) > a:nth-child(1)').text().replace(/\s+/g, '');

    return [{ PB95, PB98, ON, ONP, LPG }];
}

