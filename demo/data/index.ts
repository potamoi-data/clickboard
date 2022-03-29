import { ChartType, ClickhouseColumnType, PanelConfig, PanelData } from '~/.';

export interface DemoPanelConfig extends Omit<PanelConfig, 'data'> {
    query: string;
}

export interface DemoConfig {
    columns: number;
    data: PanelData[];
    gap: number;
    horizontalPadding: number;
    initialPanelHeight: number;
    initialPanelWidth: number;
    maxPanelHeight: number;
    maxPanelWidth?: number;
    minPanelHeight?: number;
    minPanelWidth?: number;
    panels: DemoPanelConfig[];
    rowHeight: number;
    verticalPadding: number;
}

const defaultData: PanelData[] = [
    {
        query: 'candlestick query',
        columnNames: ['date', 'open', 'close', 'lowest', 'highest'],
        columnTypes: [
            ClickhouseColumnType.date,
            ClickhouseColumnType.float,
            ClickhouseColumnType.float,
            ClickhouseColumnType.float,
            ClickhouseColumnType.float,
        ],
        rows: (
            [
                ['2013-4-3', 2232.69, 2225.29, 2217.25, 2241.34],
                ['2013-4-8', 2196.24, 2211.59, 2180.67, 2212.59],
                ['2013-4-9', 2215.47, 2225.77, 2215.47, 2234.73],
                ['2013-4-10', 2224.93, 2226.13, 2212.56, 2233.04],
                ['2013-4-11', 2236.98, 2219.55, 2217.26, 2242.48],
                ['2013-4-12', 2218.09, 2206.78, 2204.44, 2226.26],
                ['2013-4-15', 2199.91, 2181.94, 2177.39, 2204.99],
                ['2013-4-16', 2169.63, 2194.85, 2165.78, 2196.43],
                ['2013-4-17', 2195.03, 2193.8, 2178.47, 2197.51],
                ['2013-4-18', 2181.82, 2197.6, 2175.44, 2206.03],
                ['2013-4-19', 2201.12, 2244.64, 2200.58, 2250.11],
                ['2013-4-22', 2236.4, 2242.17, 2232.26, 2245.12],
                ['2013-4-23', 2242.62, 2184.54, 2182.81, 2242.62],
                ['2013-4-24', 2187.35, 2218.32, 2184.11, 2226.12],
                ['2013-4-25', 2213.19, 2199.31, 2191.85, 2224.63],
                ['2013-4-26', 2203.89, 2177.91, 2173.86, 2210.58],
                ['2013-5-2', 2170.78, 2174.12, 2161.14, 2179.65],
                ['2013-5-3', 2179.05, 2205.5, 2179.05, 2222.81],
                ['2013-5-6', 2212.5, 2231.17, 2212.5, 2236.07],
                ['2013-5-7', 2227.86, 2235.57, 2219.44, 2240.26],
                ['2013-5-8', 2242.39, 2246.3, 2235.42, 2255.21],
                ['2013-5-9', 2246.96, 2232.97, 2221.38, 2247.86],
                ['2013-5-10', 2228.82, 2246.83, 2225.81, 2247.67],
                ['2013-5-13', 2247.68, 2241.92, 2231.36, 2250.85],
                ['2013-5-14', 2238.9, 2217.01, 2205.87, 2239.93],
                ['2013-5-15', 2217.09, 2224.8, 2213.58, 2225.19],
                ['2013-5-16', 2221.34, 2251.81, 2210.77, 2252.87],
                ['2013-5-17', 2249.81, 2282.87, 2248.41, 2288.09],
                ['2013-5-20', 2286.33, 2299.99, 2281.9, 2309.39],
                ['2013-5-21', 2297.11, 2305.11, 2290.12, 2305.3],
                ['2013-5-22', 2303.75, 2302.4, 2292.43, 2314.18],
                ['2013-5-23', 2293.81, 2275.67, 2274.1, 2304.95],
                ['2013-5-24', 2281.45, 2288.53, 2270.25, 2292.59],
                ['2013-5-27', 2286.66, 2293.08, 2283.94, 2301.7],
                ['2013-5-28', 2293.4, 2321.32, 2281.47, 2322.1],
                ['2013-5-29', 2323.54, 2324.02, 2321.17, 2334.33],
                ['2013-5-30', 2316.25, 2317.75, 2310.49, 2325.72],
                ['2013-5-31', 2320.74, 2300.59, 2299.37, 2325.53],
                ['2013-6-3', 2300.21, 2299.25, 2294.11, 2313.43],
                ['2013-6-4', 2297.1, 2272.42, 2264.76, 2297.1],
                ['2013-6-5', 2270.71, 2270.93, 2260.87, 2276.86],
                ['2013-6-6', 2264.43, 2242.11, 2240.07, 2266.69],
                ['2013-6-7', 2242.26, 2210.9, 2205.07, 2250.63],
            ] as const
        ).map(([date, ...otherData]) => [new Date(date), ...otherData]),
    },
    {
        query: 'line query',
        columnNames: ['group', 'x', 'y'],
        columnTypes: [
            ClickhouseColumnType.string,
            ClickhouseColumnType.float,
            ClickhouseColumnType.float,
        ],
        rows: [
            ['Line 1', 0, 0],
            ['Line 1', 1, 2],
            ['Line 1', 2, 3],
            ['Line 1', 3, 3.5],
            ['Line 1', 4, 4],
            ['Line 2', 0, 0],
            ['Line 2', 1, 0.5],
            ['Line 2', 2, 1],
            ['Line 2', 3, 1.5],
            ['Line 2', 4, 4],
        ],
    },
    {
        query: 'bar query',
        columnNames: ['stack', 'x', 'y'],
        columnTypes: [
            ClickhouseColumnType.string,
            ClickhouseColumnType.float,
            ClickhouseColumnType.float,
        ],
        rows: [
            ['Bar 1', 0, 1],
            ['Bar 1', 1, 2],
            ['Bar 1', 2, 4],
            ['Bar 1', 3, 3],
            ['Bar 1', 4, 2],
            ['Bar 2', 0, 0],
            ['Bar 2', 1, 3],
            ['Bar 2', 2, 1],
            ['Bar 2', 3, 8],
            ['Bar 2', 4, 6],
        ],
    },
];

const defaultPanels: DemoPanelConfig[] = [
    {
        id: 'candlestick',
        title: 'Candlestick',
        query: 'candlestick query',
        layout: {
            x: 0,
            y: 0,
            width: 6,
            height: 2,
        },
        chart: {
            type: ChartType.candlestick,
            xAxisColumn: 'date',
            openColumn: 'open',
            closeColumn: 'close',
            lowestColumn: 'lowest',
            highestColumn: 'highest',
        },
    },
    {
        id: 'line',
        title: 'Line',
        query: 'line query',
        layout: {
            x: 6,
            y: 0,
            width: 6,
            height: 1,
        },
        chart: {
            type: ChartType.line,
            xAxisColumn: 'x',
            yAxisColumn: 'y',
            groupColumn: 'group',
            legends: true,
        },
    },
    {
        id: 'bar',
        title: 'Bar',
        query: 'bar query',
        layout: {
            x: 6,
            y: 1,
            width: 6,
            height: 1,
        },
        chart: {
            type: ChartType.bar,
            xAxisColumn: 'x',
            yAxisColumn: 'y',
            stackColumn: 'stack',
            legends: true,
        },
    },
];

export const defaultDemoConfig: DemoConfig = {
    columns: 12,
    gap: 16,
    horizontalPadding: 16,
    initialPanelHeight: 1,
    initialPanelWidth: 6,
    maxPanelHeight: 2,
    maxPanelWidth: 12,
    minPanelHeight: 1,
    minPanelWidth: 3,
    rowHeight: 256,
    verticalPadding: 16,
    data: defaultData,
    panels: defaultPanels,
};
