using SmartBinManager.Entities;
using SmartBinManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartBinManager.APIClient
{
    public interface IApiClient
    {
        Task<List<Product>> GetProducts();
        Task<List<SmartBinViewModel>> ListSmartBins(int customerId);
        Task<List<BasketLineViewModel>> ListBasketItems(int customerId);
        Task<bool> RegisterSmartBin(SmartBinViewModel model);
        Task<Customer> Authenticate(LoginViewModel model);
        Task<bool> RegisterCustomer(RegisterViewModel model);
        Task<List<TriggerAction>> ListTriggerActions();
    }
}
