using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;

namespace AzureFunctionsVuejsSample.Function.search_indexer_run
{
    public static class AzureSearchIndexerRun
    {
        [FunctionName("AzureSearchIndexerRun")]
        public static async Task<HttpResponseMessage> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)]HttpRequestMessage req,
            TraceWriter log)
        {
            log.Info("C# HTTP trigger function processed a request.");

            // parse query parameter
            string indexer = req.GetQueryNameValuePairs()
                .FirstOrDefault(q => string.Compare(q.Key, "indexer", true) == 0)
                .Value;

            return req.CreateResponse(HttpStatusCode.OK, "Run Azure Search Indexer " + indexer);
        }
    }
}
