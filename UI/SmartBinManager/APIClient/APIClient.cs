using Newtonsoft.Json;
using SmartBinManager.Entities;
using SmartBinManager.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Security;

namespace SmartBinManager.APIClient
{
    public class APIClient : IApiClient
    {
        public APIClient()
        {
            
        }

        public async Task<List<Product>> GetProducts()
        {
            string url = ConfigurationManager.AppSettings["SmartBinAPI"] + "product";
            var products = new List<Product>();
            using (System.Net.Http.HttpClient client = new System.Net.Http.HttpClient())
            {
                client.BaseAddress = new Uri(url);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                System.Net.Http.HttpResponseMessage response = await client.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadAsStringAsync();
                    products = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Product>>(data);
                }
            }
            return products;
        }

        public async Task<List<BasketLineViewModel>> ListBasketItems(int customerId)
        {
            string url = ConfigurationManager.AppSettings["SmartBinAPI"] + "basketline/"+customerId.ToString();
            var basketlines = new List<BasketLineViewModel>();

            using (System.Net.Http.HttpClient client = new System.Net.Http.HttpClient())
            {
                client.BaseAddress = new Uri(url);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                System.Net.Http.HttpResponseMessage response = await client.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadAsStringAsync();
                    basketlines = Newtonsoft.Json.JsonConvert.DeserializeObject<List<BasketLineViewModel>>(data);
                    
                }
                return basketlines;
            }
        }

        public async Task<List<SmartBinViewModel>> ListSmartBins(int customerId)
        {
            var smartbins = new List<SmartBinViewModel>();
            string url = ConfigurationManager.AppSettings["SmartBinAPI"] + "smartbin/all/" +customerId.ToString();
            using (System.Net.Http.HttpClient client = new System.Net.Http.HttpClient())
            {
                client.BaseAddress = new Uri(url);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                System.Net.Http.HttpResponseMessage response = await client.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadAsStringAsync();
                    smartbins = Newtonsoft.Json.JsonConvert.DeserializeObject<List<SmartBinViewModel>>(data);
                    
                }

                return smartbins;
            }
        }

        public async Task<bool> RegisterSmartBin(SmartBinViewModel model)
        {
            bool status = false;
            string url = ConfigurationManager.AppSettings["SmartBinAPI"].ToString() + "smartbin";
            
            using (System.Net.Http.HttpClient client = new System.Net.Http.HttpClient())
            {
                client.BaseAddress = new Uri(url);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                string json = JsonConvert.SerializeObject(model);
                System.Net.Http.HttpResponseMessage response = await client.PostAsync(url, new StringContent(json));
                if (response.IsSuccessStatusCode)
                {
                    status = true;
                }
            }
            return status;
        }

        public async Task<Customer> Authenticate(LoginViewModel model)
        {
            Customer customer = new Customer();
            string url = ConfigurationManager.AppSettings["SmartBinAPI"].ToString() + "customer/authenticate";

            using (System.Net.Http.HttpClient client = new System.Net.Http.HttpClient())
            {
                client.BaseAddress = new Uri(url);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                string json = JsonConvert.SerializeObject(model);
                System.Net.Http.HttpResponseMessage response = await client.PostAsync(url, new StringContent(json));
                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadAsStringAsync();
                    var customerdata = Newtonsoft.Json.JsonConvert.DeserializeObject<Customer[]>(data);
                    if (customerdata != null && customerdata.Length >0)
                    {
                        customer.CustomerID = customerdata[0].CustomerID;
                        customer.FirstName = customerdata[0].FirstName;
                        customer.LastName = customerdata[0].LastName;
                        customer.Email = customerdata[0].Email;
                    }
                }
            }

            return customer;
        }

        public async Task<bool> RegisterCustomer(RegisterViewModel model)
        {
            bool status = false;
            string url = ConfigurationManager.AppSettings["SmartBinAPI"].ToString() + "customer";

            using (System.Net.Http.HttpClient client = new System.Net.Http.HttpClient())
            {
                client.BaseAddress = new Uri(url);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                string json = JsonConvert.SerializeObject(model);
                System.Net.Http.HttpResponseMessage response = await client.PostAsync(url, new StringContent(json));
                if (response.IsSuccessStatusCode)
                {
                    status = true;
                }
            }
            return status;
        }

        public async Task<List<TriggerAction>> ListTriggerActions()
        {
            var triggeractions = new List<TriggerAction>();
            string url = ConfigurationManager.AppSettings["SmartBinAPI"] + "triggeraction";
            using (System.Net.Http.HttpClient client = new System.Net.Http.HttpClient())
            {
                client.BaseAddress = new Uri(url);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                System.Net.Http.HttpResponseMessage response = await client.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadAsStringAsync();
                    triggeractions = Newtonsoft.Json.JsonConvert.DeserializeObject<List<TriggerAction>>(data);

                }

                return triggeractions;
            }
        }
    }
}