import { computeDashboardModel, parseCSV } from '../DashboardDataParserService';

const ADVERTISING_DATA_URL = 'files/data.csv';

export async function getAdvertisingData() {
    const fileData = await fetchCsv();
    const parsedCsv = await parseCSV(fileData);
    return computeDashboardModel(parsedCsv);
}

async function fetchCsv() {
    const response = await fetch(ADVERTISING_DATA_URL);
    const arrayBuffer = await response.arrayBuffer()
    var byteArray = new Uint8Array(arrayBuffer);
    const csv = new TextDecoder('utf-8').decode(byteArray);
    return csv || '';
}