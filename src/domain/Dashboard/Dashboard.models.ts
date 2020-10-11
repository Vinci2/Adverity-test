export interface DashboardState {
    availableCampaigns: string[];
    availableDataSources: string[];
    advertisingRecords: AdvertisingRecord[]
}

export interface AdvertisingRecord {
    all: AdvertisingMetrics,
    dataSources: DataSources;
    date: string;
}

export interface AdvertisingMetrics {
    clicks: number;
    impressions: number;
}

export interface DataSources {
    [key: string]: Campaigns
}

export interface Campaigns {
    campaigns: { [key: string]: AdvertisingMetrics }
}

export interface ChartPoint {
    date: string,
    clicks: number,
    impressions: number
}