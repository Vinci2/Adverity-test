import Papa from 'papaparse';

export const computeDashboardModel = (parsedData: any) => {
    console.log('Parsed Data', parsedData);

    const availableSources = new Set();
    const availableCampaigns = new Set();
    const chartData = parsedData.data.reduce((acc: any[], [date, dataSource, campaign, clicks, impressions]: any, currIndex: number) => {
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
                dataSource: {
                    [dataSource]: {
                        campaign: {
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
        const prevDataSource = prevRecord.dataSource;
        const prevCampaign = prevRecord.dataSource[dataSource] ? prevRecord.dataSource[dataSource].campaign : {}

        acc[acc.length - 1] = {
            ...prevRecord,
            all: {
                clicks: prevAll.clicks + currentClicks,
                impressions: prevAll.impressions + (currentImpressions || 0)
            },
            dataSource: {
                ...prevDataSource,
                [dataSource]: {
                    campaign: {
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
        availableSources: Array.from(availableSources),
        chartData
    }
}

export const parseCSV = (csv: string | undefined) => {
    if (!csv) { return }
    return Papa.parse(csv);
}

export const getChartData = (dataSources: string[], campaigns: string[], chartData: any[]) => {
    const getAllDataSources = !dataSources.length;
    const getAllCampaigns = !campaigns.length;
    return chartData.map((record) => {
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
        dataSources = getAllDataSources ? Object.keys(record.dataSource) : dataSources;
        dataSources.forEach((dataSource) => {
            if (!record.dataSource[dataSource]) {
                return seriesPoint;
            }

            campaigns = getAllCampaigns ? campaigns = Object.keys(record.dataSource[dataSource].campaign) : campaigns
            campaigns.forEach((campaign) => {
                if (!record.dataSource[dataSource].campaign[campaign]) {
                    return seriesPoint;
                }
                seriesPoint.clicks += record.dataSource[dataSource].campaign[campaign].clicks;
                seriesPoint.impressions += record.dataSource[dataSource].campaign[campaign].impressions;
            })
        })
        return seriesPoint;
    })
}

