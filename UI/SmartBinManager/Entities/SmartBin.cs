using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SmartBinManager.Entities
{
    public class SmartBin
    {
        public string Id { get; set; }
        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public int OrderQuantity { get; set; }
        public int TriggerActionId { get; set; }
        public int ReOrderLevel { get; set; }
    }
}