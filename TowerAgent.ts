// Copyright (C), Jupiter Bakakeu
import { DataPointValue, MindConnectAgent, MindsphereStandardEvent, retry, TimeStampedDataPoint } from "@mindconnect/mindconnect-nodejs";

(async function () {

    const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));
    const configuration = require("../TowerAgentConfig.json");
    const agent = new MindConnectAgent(configuration);
    const log = (text: any) => { console.log(`[${new Date().toISOString()}] ${text.toString()}`); };
    const RETRYTIMES = 5; // retry the operation before giving up and throwing exception

    const ProducerNames = ["FATH","FATH","SIEMENS","SIEMENS","ZNT"];
    const ArticleNames = ["FATHProduct01","FATHProduct02","SiemensProduct01","SiemensProduct02","ZNTProduct01"];
    const TowerNames = ["Tower@Munchen","Tower@Augsburg","Tower@Regensburg","Tower@Erlangen","Tower@Stuttgart","Tower@Frankfurt","Tower@Fürth","Tower@Hamburg","Tower@Hannover","Tower@Köln"];
    const consumerNames = ["SiemensWerk01","SiemensWerk2","SiemensWerk03","FATHWerk01","FATHWerk02","FATHWerk03","ZNTWerk01","ZNTWerk02","ZNTWerk03","SiemensWerk03"];
    const Latitudes = [48.137154,48.37154,49.013432,49.59099,48.78232,50.110924,49.4954,53.551086,52.37052,50.93333];
    const Longitudes = [11.576124,10.89851,12.101624,11.00783,9.17702,8.682127,10.9444,9.993682,9.73322,6.95];
       

    for (let index = 0; index < 1000000; index++) {
        try {

            log(`Iteration : ${index}`);
            // onboarding the agent
            if (!agent.IsOnBoarded()) {
                // wrapping the call in the retry function makes the agent a bit more resilliant
                // if you don't want to retry the operations you can always just call await agent.OnBoard(); instaead.
                await retry(RETRYTIMES, () => agent.OnBoard());
                log("Agent onboarded");
            }

            if (!agent.HasDataSourceConfiguration()) {
                await retry(RETRYTIMES, () => agent.GetDataSourceConfiguration());
                log("Configuration aquired");
            }

           
                for (let i = 0; i < 9; i++) { // Iterator Cities 
                    const values: DataPointValue[] = [
                        // Tower Description
                        { "dataPointId": "1562865940567", "qualityCode": "0", "value": TowerNames[i].toString() },
                        { "dataPointId": "1562865959864", "qualityCode": "0", "value": consumerNames[i].toString() },
                        { "dataPointId": "1562865972587", "qualityCode": "0", "value": Latitudes[i].toString() },
                        { "dataPointId": "1562865985067", "qualityCode": "0", "value": Longitudes[i].toString() },
                        // Article Names
                        { "dataPointId": "1562866010556", "qualityCode": "0", "value": ArticleNames[0].toString() },
                        { "dataPointId": "1562866023819", "qualityCode": "0", "value": ArticleNames[1].toString() },
                        { "dataPointId": "1562866038103", "qualityCode": "0", "value": ArticleNames[2].toString() },

                        // ProducerNames
                        { "dataPointId": "1562866052870", "qualityCode": "0", "value": ProducerNames[0].toString() },
                        { "dataPointId": "1562866065342", "qualityCode": "0", "value": ProducerNames[1].toString() },
                        { "dataPointId": "1562866074642", "qualityCode": "0", "value": ProducerNames[2].toString() },

                        // ArticleQuantities
                        { "dataPointId": "1562866095876", "qualityCode": "0", "value": (Math.floor ( (Math.random() * 10) + 50)).toString() },
                        { "dataPointId": "1562866114679", "qualityCode": "0", "value": (Math.floor ( (Math.random() * 30) + 20)).toString() },
                        { "dataPointId": "1562866125742", "qualityCode": "0", "value": (Math.floor ( (Math.random() * 10) + 100)).toString() }
                    ];
                    
                    // same like above, you can also just call  await agent.PostData(values) if you don't want to retry the operation
                    // this is how to send the data with specific timestamp
                    // await agent.PostData(values, new Date(Date.now() - 86400 * 1000));
                    
                    await retry(RETRYTIMES, () => agent.PostData(values));
                    log("Data posted --> " + i);
                    await sleep(1000);
                }
            
            log("Data posted end.");
            await sleep(1000);

        } catch (err) {
            // add proper error handling (e.g. store data somewhere, retry later etc. )
            console.error(err);
        }
    }
})();