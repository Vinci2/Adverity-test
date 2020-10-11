import Papa from 'papaparse';
import { AdvertisingRecord, DashboardState } from '../../Dashboard.models';

export const computeDashboardModel = ({data}: {data: Array<string[]>}): DashboardState => {
    const availableSources = new Set<string>();
    const availableCampaigns = new Set<string>();
    const chartData = data.reduce((acc: AdvertisingRecord[], [date, dataSource, campaign, clicks, impressions]: string[], currIndex: number) => {
        if (currIndex < 2 || !date) { return acc; }
        availableCampaigns.add(campaign);
        availableSources.add(dataSource);
        const currentClicks = parseInt(clicks, 10);
        const currentImpressions = parseInt(impressions, 10);
        const prevRecord = acc[acc.length - 1];
        if (!prevRecord || prevRecord.date !== date) {
            const record = {
                date,
                all: {
                    clicks: currentClicks,
                    impressions: currentImpressions || 0
                },
                dataSources: {
                    [dataSource]: {
                        campaigns: {
                            [campaign]: {
                                clicks: currentClicks,
                                impressions: currentImpressions || 0
                            }
                        }
                    }
                }
            }

            acc.push(record);
            return acc;
        }
        const prevAll = prevRecord.all
        const prevDataSource = prevRecord.dataSources;
        const prevCampaign = prevRecord.dataSources[dataSource] ? prevRecord.dataSources[dataSource].campaigns : {}

        acc[acc.length - 1] = {
            ...prevRecord,
            all: {
                clicks: prevAll.clicks + currentClicks,
                impressions: prevAll.impressions + (currentImpressions || 0)
            },
            dataSources: {
                ...prevDataSource,
                [dataSource]: {
                    campaigns: {
                        ...prevCampaign,
                        [campaign]: {
                            clicks: currentClicks,
                            impressions: currentImpressions || 0
                        }
                    }
                }
            }
        }
        return acc;
    }, [])

    return {
        availableCampaigns: Array.from(availableCampaigns),
        availableDataSources: Array.from(availableSources),
        advertisingRecords: chartData
    }
}

export const parseCSV = (csv: string | undefined) => {
    if (!csv) { return }
    return Papa.parse(csv);
}

export const getChartData = (dataSources: string[], campaigns: string[], advertisingRecords: AdvertisingRecord[] | undefined) => {
    if (!advertisingRecords) {
        return []
    }
    const getAllDataSources = !dataSources.length;
    const getAllCampaigns = !campaigns.length;
    return advertisingRecords.map((record) => {
        const seriesPoint = {
            date: record.date,
            clicks: 0,
            impressions: 0
        }
        if (getAllDataSources && getAllCampaigns) {
            seriesPoint.clicks = record.all.clicks
            seriesPoint.impressions = record.all.impressions
            return seriesPoint;
        }
        dataSources = getAllDataSources ? Object.keys(record.dataSources) : dataSources;
        dataSources.forEach((dataSource) => {
            if (!record.dataSources[dataSource]) {
                return seriesPoint;
            }

            campaigns = getAllCampaigns ? campaigns = Object.keys(record.dataSources[dataSource].campaigns) : campaigns
            campaigns.forEach((campaign) => {
                if (!record.dataSources[dataSource].campaigns[campaign]) {
                    return seriesPoint;
                }
                seriesPoint.clicks += record.dataSources[dataSource].campaigns[campaign].clicks;
                seriesPoint.impressions += record.dataSources[dataSource].campaigns[campaign].impressions;
            })
        })
        return seriesPoint;
    })
}

