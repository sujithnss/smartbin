using Newtonsoft.Json;
using RestSharp;
using SmartBinManager.Entities;
using SmartBinManager.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;

namespace SmartBinManager.APIClient
{
    public class APIClient : IApiClient
    {
        private readonly RestClient client;
        private readonly string url = ConfigurationManager.AppSettings["SmartBinAPI"];

        public APIClient()
        {
            client = new RestClient(url);
        }

        public Customer AuthenticateCustomer(LoginViewModel model)
        {
            var request = new RestRequest("customer/authenticate", Method.POST) { RequestFormat = DataFormat.Json };
            request.AddBody(model);

            var response = client.Execute<Customer>(request);

            if (response != null && ((response.StatusCode == HttpStatusCode.OK)))
            {

            }
    

            return response.Data;
        }
    }
}