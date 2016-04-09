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
using SmartBinManager.Entities;

namespace SmartBinManager.Controllers
{
    public class HomeController : Controller
    {
        APIClient.IApiClient RestClient = new APIClient.APIClient();

        public ActionResult Index()
        {
            return View();
        }

        [CustomAuthorize]
        public async System.Threading.Tasks.Task<ActionResult> ListSmartBin()
        {
            ViewBag.Message = "Lists the SmartBins";
            
            List<Product> products = await RestClient.GetProducts();
            List<TriggerAction> triggerActions = await RestClient.ListTriggerActions();

            List<SmartBinViewModel> smartBins = await RestClient.ListSmartBins(Utility.Utility.DecryptAndGetCustomPrincipal(Request.Cookies[FormsAuthentication.FormsCookieName]).CustomerID);
            foreach(SmartBinViewModel sbModel in smartBins)
            {
                sbModel.ProductName = products.Where(x => x.Id == sbModel.ProductId).FirstOrDefault() != null ? products.Where(x => x.Id == sbModel.ProductId).FirstOrDefault().Name : "";
                sbModel.TriggerActionName = triggerActions.Where(x => x.Id == sbModel.TriggerActionId).FirstOrDefault() != null ? triggerActions.Where(x => x.Id == sbModel.TriggerActionId).FirstOrDefault().Action : "";
            }
            return View(smartBins);
        }

        [CustomAuthorize]
        public async System.Threading.Tasks.Task<ActionResult> ViewBasket()
        {
            ViewBag.Message = "View your Basket";
            List<Product> products = await RestClient.GetProducts();

            List<BasketLineViewModel> basketLines = await RestClient.ListBasketItems(Utility.Utility.DecryptAndGetCustomPrincipal(Request.Cookies[FormsAuthentication.FormsCookieName]).CustomerID);
            foreach(BasketLineViewModel basket in basketLines)
            {
                basket.ProductName = products.Where(x => x.Id == basket.ProductId).FirstOrDefault().Name != null ? products.Where(x => x.Id == basket.ProductId).FirstOrDefault().Name : "";
            }
            return View(basketLines);
        }

        [CustomAuthorize]
        public async Task<ActionResult> RegisterSmartBin()
        {
            List<Product> products = await RestClient.GetProducts();
            List<TriggerAction> triggerActions = await RestClient.ListTriggerActions();

            ViewBag.ProductId = new SelectList(products, "Id", "Name");
            ViewBag.TriggerActionId = new SelectList(triggerActions,"Id","Action");
            return View();
        }

        [HttpPost]
        [CustomAuthorize]
        public async Task<ActionResult> RegisterSmartBin(SmartBinViewModel model)
        {
            if (ModelState.IsValid)
            {
                model.CustomerId = Utility.Utility.DecryptAndGetCustomPrincipal(Request.Cookies[FormsAuthentication.FormsCookieName]).CustomerID;
                if (await RestClient.RegisterSmartBin(model))
                {
                    return RedirectToAction("ListSmartBin", "Home");
                }
                else
                {
                    return RedirectToAction("Index", "Home");
                }
            }
            return View(model);
        }


    }
    
}