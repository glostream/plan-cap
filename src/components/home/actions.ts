'use server';

import { GoogleAdsApi, ResourceNames, enums, services } from 'google-ads-api';
import { MicrosToUSD } from './constants';
import { TermSearchResult } from '@/src/types/TermSearchResult';

export async function getSearch(terms: string[]) {
  const client = new GoogleAdsApi({
    client_id: process.env.G_CLIENT_ID,
    client_secret: process.env.G_CLIENT_SECRET,
    developer_token: process.env.G_DEVELOPER_TOKEN
  });

  const customer = client.Customer({
    customer_id: '3790493486',
    refresh_token: process.env.G_REFERSH_TOKEN
  });

  const request = services.GenerateKeywordHistoricalMetricsRequest.create({
    customer_id: customer.credentials.customer_id,
    keywords: terms,
    // USA
    geo_target_constants: [ResourceNames.geoTargetConstant('2840')],
    keyword_plan_network: enums.KeywordPlanNetwork.GOOGLE_SEARCH,
    // English
    language: ResourceNames.languageConstant('1000'),
    historical_metrics_options: {
      include_average_cpc: true
    }
  });

  const response =
    await customer.keywordPlanIdeas.generateKeywordHistoricalMetrics(request);

  return response.results.map((term) => {
    return {
      term: term.text,
      monthlySearchVolume: term.keyword_metrics?.avg_monthly_searches,
      cpc: term.keyword_metrics?.average_cpc_micros
        ? term.keyword_metrics.average_cpc_micros * MicrosToUSD
        : null,
      // The competition index for the query in the range [0, 100]. Shows how competitive ad placement is for a keyword. The level of competition from 0-100 is determined by the number of ad slots filled divided by the total number of ad slots available. If not enough data is available, null is returned.
      competitionIndex: term.keyword_metrics?.competition_index
    };
  });
}
