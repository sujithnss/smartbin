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
        APIClient.IApiClient RestClient = new APIClient.APIClient();
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
                
                    if (await RestClient.RegisterCustomer(model))
                    {
                        LoginViewModel loginModel = new LoginViewModel();
                        loginModel.Email = model.Email;
                        loginModel.Password = model.Password;
                        var customer = await RestClient.Authenticate(loginModel);
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
                var customer = await RestClient.Authenticate(model);
                
                if (customer != null && customer.CustomerID >0)
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