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
        Customer AuthenticateCustomer(LoginViewModel model);
    }
}
