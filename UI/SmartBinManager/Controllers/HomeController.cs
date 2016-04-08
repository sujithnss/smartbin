using Newtonsoft.Json;
using SmartBinManager.Models;
using SmartBinManager.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using System.Web.Security;
using System.Data.Entity.Infrastructure;
using System.Threading.Tasks;
using System.Configuration;
using System.Net.Http;

namespace SmartBinManager.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [CustomAuthorize]
        public async System.Threading.Tasks.Task<ActionResult> ListSmartBin()
        {
            ViewBag.Message = "Lists the SmartBins";

            string url = ConfigurationManager.AppSettings["SmartBinAPI"].ToString()+"smartbin/all/";
            
            url = url + Utility.Utility.DecryptAndGetCustomPrincipal(Request.Cookies[FormsAuthentication.FormsCookieName]).CustomerID.ToString();

            using (System.Net.Http.HttpClient client = new System.Net.Http.HttpClient())
            {
                client.BaseAddress = new Uri(url);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                System.Net.Http.HttpResponseMessage response = await client.GetAsync(url);
                
                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadAsStringAsync();
                    var smartbins = Newtonsoft.Json.JsonConvert.DeserializeObject<IEnumerable<SmartBinViewModel>>(data);

                    return View(await smartbins.AsQueryable().ToListAsync());

                }
            }

            return View();
        }

        [CustomAuthorize]
        public async System.Threading.Tasks.Task<ActionResult> ViewBasket()
        {
            ViewBag.Message = "View your Basket";
            string url = ConfigurationManager.AppSettings["SmartBinAPI"].ToString() + "basketline/";

            url = url + Utility.Utility.DecryptAndGetCustomPrincipal(Request.Cookies[FormsAuthentication.FormsCookieName]).CustomerID.ToString();

            using (System.Net.Http.HttpClient client = new System.Net.Http.HttpClient())
            {
                client.BaseAddress = new Uri(url);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                System.Net.Http.HttpResponseMessage response = await client.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadAsStringAsync();
                    var basketlines = Newtonsoft.Json.JsonConvert.DeserializeObject<IEnumerable<BasketLineViewModel>>(data);

                    return View(await basketlines.AsQueryable().ToListAsync());

                }
            }
            return View();
        }

        [CustomAuthorize]
        public ActionResult RegisterSmartBin()
        {
            
            return View();
        }

        [HttpPost]
        [CustomAuthorize]
        public async Task<ActionResult> RegisterSmartBin(SmartBinViewModel model)
        {
            if (ModelState.IsValid)
            {
                string url = ConfigurationManager.AppSettings["SmartBinAPI"].ToString() + "smartbin";
                model.CustomerId = Utility.Utility.DecryptAndGetCustomPrincipal(Request.Cookies[FormsAuthentication.FormsCookieName]).CustomerID;
                using (System.Net.Http.HttpClient client = new System.Net.Http.HttpClient())
                {
                    client.BaseAddress = new Uri(url);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                    string json = JsonConvert.SerializeObject(model);
                    System.Net.Http.HttpResponseMessage response = await client.PostAsync(url, new StringContent(json));
                    if (response.IsSuccessStatusCode)
                    {
                        return RedirectToAction("ListSmartBin", "Home");
                    }
                }
            }
            return View(model);
        }
    }

    static class Utils
    {

        /// <summary>
        /// Async create of a System.Collections.Generic.List<T> from an 
        /// System.Collections.Generic.IQueryable<T>.
        /// </summary>
        /// <typeparam name="T">The type of the elements of source.</typeparam>
        /// <param name="list">The System.Collections.Generic.IEnumerable<T> 
        /// to create a System.Collections.Generic.List<T> from.</param>
        /// <returns> A System.Collections.Generic.List<T> that contains elements 
        /// from the input sequence.</returns>
        public static Task<List<T>> ToListAsync<T>(this IQueryable<T> list)
        {
            return Task.Run(() => list.ToList());
        }

    }
}