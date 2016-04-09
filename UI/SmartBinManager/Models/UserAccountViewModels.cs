using SmartBinManager.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace SmartBinManager.Models
{
    public class RegisterViewModel
    {
        public int CustomerID { get; set; }

        [Required]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Required]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }

    public class LoginViewModel
    {
        

        [Required]
        [Display(Name = "Email")]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }

    public class SmartBinViewModel
    {
        [Display(Name = "SmartBin Id")]
        public string Id { get; set; }
        [Display(Name = "Product")]
        public int ProductId { get; set; }
        [Display(Name = "Customer")]
        public int CustomerId { get; set; }
        [Display(Name = "Order Quantity")]
        public int OrderQuantity { get; set; }
        [Display(Name = "Trigger Action")]
        public int TriggerActionId { get; set; }
        [Display(Name = "Re Order Level")]
        public int ReOrderLevel { get; set; }

        [Display(Name = "Product Name")]
        public string ProductName { get; set; }

        [Display(Name = "Trigger")]
        public string TriggerActionName { get; set; }
    }

    public class BasketLineViewModel
    {
        [Display(Name = "Product")]
        public int ProductId { get; set; }

        [Display(Name = "Quantity")]
        public int Quantity { get; set; }

        [Display(Name = "Product Name")]
        public string ProductName { get; set; }
    }

    
}