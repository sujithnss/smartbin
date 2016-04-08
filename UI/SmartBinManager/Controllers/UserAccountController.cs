using Newtonsoft.Json;
using SmartBinManager.Entities;
using SmartBinManager.Models;
using SmartBinManager.Security;
using System;
using System.Configuration;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace SmartBinManager.Controllers
{
    public class UserAccountController : Controller
    {
        static readonly APIClient.IApiClient RestClient = new APIClient.APIClient();
        //
        // GET: /Account/Register
        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }

        //
        // POST: /Account/Register
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
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
                        var customer = new Customer();


                        url = url + "/authenticate";

                        using (System.Net.Http.HttpClient clientauth = new System.Net.Http.HttpClient())
                        {
                            clientauth.BaseAddress = new Uri(url);
                            clientauth.DefaultRequestHeaders.Accept.Clear();
                            clientauth.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                            string jsonauth = JsonConvert.SerializeObject(model);
                            System.Net.Http.HttpResponseMessage responseauth = await client.PostAsync(url, new StringContent(jsonauth));
                            if (responseauth.IsSuccessStatusCode)
                            {
                                var data = await responseauth.Content.ReadAsStringAsync();
                                var customerdata = Newtonsoft.Json.JsonConvert.DeserializeObject<Customer[]>(data);

                                customer.CustomerID = customerdata[0].CustomerID;
                                customer.FirstName = customerdata[0].FirstName;
                                customer.LastName = customerdata[0].LastName;
                                customer.Email = customerdata[0].Email;

                            }
                        }

                        if (customer != null)
                        {
                            CustomPrincipalSerializeModel serializeModel = new CustomPrincipalSerializeModel();
                            serializeModel.CustomerID = customer.CustomerID;
                            serializeModel.FirstName = customer.FirstName;
                            serializeModel.LastName = customer.LastName;
                            serializeModel.Email = customer.Email;

                            Response.Cookies.Add(Utility.Utility.EncryptAndSet(serializeModel));
                            return RedirectToAction("Index", "Home");

                        }

                    }
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // GET: /Account/Login
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                var customer = new Customer();
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

                        customer.CustomerID = customerdata[0].CustomerID;
                        customer.FirstName = customerdata[0].FirstName;
                        customer.LastName = customerdata[0].LastName;
                        customer.Email = customerdata[0].Email;


                    }
                }
                
                if (customer != null)
                {
                    CustomPrincipalSerializeModel serializeModel = new CustomPrincipalSerializeModel();
                    serializeModel.CustomerID = customer.CustomerID;
                    serializeModel.FirstName = customer.FirstName;
                    serializeModel.LastName = customer.LastName;
                    serializeModel.Email = customer.Email;
                    
                    Response.Cookies.Add(Utility.Utility.EncryptAndSet(serializeModel));
                    return RedirectToAction("Index", "Home");

                }

                ModelState.AddModelError("", "Incorrect username and/or password");
            }

            return View(model);
        }


        //
        // POST: /Account/LogOff
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogOff()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Home");
        }


    }
}