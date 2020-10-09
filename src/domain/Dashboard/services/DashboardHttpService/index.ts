import { computeDashboardModel, parseCSV } from '../DashboardDataParserService';

const ADVERTISING_DATA_URL = 'files/data.csv';

export function getAdvertisingData() {
    return fetchCsv()
        .then(parseCSV)
        .then(computeDashboardModel)
}

async function fetchCsv() {
    const response = await fetch(ADVERTISING_DATA_URL);
    const arrayBuffer = await response.arrayBuffer()
    var byteArray = new Uint8Array(arrayBuffer);
    const csv = new TextDecoder('utf-8').decode(byteArray);
    return csv || '';
}