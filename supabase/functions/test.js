const { GoogleAdsApi, ResourceNames, enums, services } = require("google-ads-api");

const client = new GoogleAdsApi({
    client_id: '79934131824-ki9bpkagkncuvo97t8885nkrdd9hs4ii.apps.googleusercontent.com',
    client_secret: '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',
    developer_token: '0Ge1CwiDAEg6TBM6V6sf_A'
});

const customer = client.Customer({
    customer_id: "3790493486",
    refresh_token: "1//04oPvEmaU05S9CgYIARAAGAQSNwF-L9Ir5rv6I4ZQU3aleqYP15wUvHoMVWjh4qcKkcebEkV--DyoNbgEXcrjsumEpqhbVMZaAQU",

});

async function getKeywords() {
    const request = {
        customer_id: customer.credentials.customer_id,
        keywords: ['postgres', 'postgresql'],
        // USA
        geo_target_constants: [ResourceNames.geoTargetConstant('2840')],
        keyword_plan_network: enums.KeywordPlanNetwork.GOOGLE_SEARCH,
        // English
        language: ResourceNames.languageConstant('1000'),
        include_average_cpc: true,
    };

    try {
        const response = await customer.keywordPlanIdeas.generateKeywordHistoricalMetrics(request);

        let results = []
        response.forEach((keyword) => {
            results.push({
                keyword: keyword.text,
                avg_monthly_searches: keyword.keyword_idea_metrics.avg_monthly_searches,
                competition: keyword.keyword_idea_metrics.competition,
                cpc: keyword.keyword_idea_metrics.cpc,
            })
        })
    } catch (error) {
        console.error(error);
    }
}

getKeywords()
