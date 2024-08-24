import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { corsHeaders } from '../_shared/cors.ts';
import {
  GoogleAdsApi,
  ResourceNames,
  enums,
  services
} from 'npm:google-ads-api';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const { terms } = await req.json();
  console.log('got', terms);

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

  console.log('created clients');

  const request = services.GenerateKeywordHistoricalMetricsRequest.create({
    customer_id: customer.credentials.customer_id,
    keywords: terms,
    // USA
    geo_target_constants: [ResourceNames.geoTargetConstant('2840')],
    keyword_plan_network: enums.KeywordPlanNetwork.GOOGLE_SEARCH,
    // English
    language: ResourceNames.languageConstant('1000')
  });

  const resultsData: {
    keyword: string | null | undefined;
    avgMonthlySearches: number | null | undefined;
    competitionIndex: number | null | undefined;
    averageCpcMicros: number | null | undefined;
  }[] = [];

  try {
    console.log('trying', request);
    const response =
      await customer.keywordPlanIdeas.generateKeywordHistoricalMetrics(request);

    console.log(response);

    response.results.forEach((term) => {
      resultsData.push({
        keyword: term.text,
        avgMonthlySearches: term.keyword_metrics?.avg_monthly_searches,
        // avgMonthlySearchesCalc: avgMonthlySearches ?? 0,
        // The competition index for the query in the range [0, 100]. Shows how competitive ad placement is for a keyword. The level of competition from 0-100 is determined by the number of ad slots filled divided by the total number of ad slots available. If not enough data is available, null is returned.
        competitionIndex: term.keyword_metrics?.competition_index,
        averageCpcMicros: term.keyword_metrics?.average_cpc_micros
      });
    });
  } catch (error) {
    console.error(error);
  }

  return new Response(JSON.stringify(resultsData), {
    headers: { ...corsHeaders },
    status: 200
  });
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/g-keyword-planner' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
