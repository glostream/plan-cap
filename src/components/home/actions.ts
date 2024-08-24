'use server';

import { GoogleAdsApi, ResourceNames, enums, services } from 'google-ads-api';
import { MicrosToUSD } from './constants';
import { TermSearchResult } from '@/src/types/TermSearchResult';

export async function getSearch(terms: string[]) {
  const client = new GoogleAdsApi({
    client_id:
      '79934131824-ki9bpkagkncuvo97t8885nkrdd9hs4ii.apps.googleusercontent.com',
    client_secret: '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',
    developer_token: '0Ge1CwiDAEg6TBM6V6sf_A'
  });

  const customer = client.Customer({
    customer_id: '3790493486',
    refresh_token:
      '1//04oPvEmaU05S9CgYIARAAGAQSNwF-L9Ir5rv6I4ZQU3aleqYP15wUvHoMVWjh4qcKkcebEkV--DyoNbgEXcrjsumEpqhbVMZaAQU'
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
