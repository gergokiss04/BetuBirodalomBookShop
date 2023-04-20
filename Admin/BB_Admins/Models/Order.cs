using System;
using System.Collections.Generic;

namespace BB_Admins.Models
{
    public partial class Order
    {
        public int Id { get; set; }
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public int BookId { get; set; }
        public int StockNumber { get; set; }
        public DateTime OrderDate { get; set; }
        public string Phonenumber { get; set; } = null!;
        public int Zipcode { get; set; }
        public string Location { get; set; } = null!;
        public string Street { get; set; } = null!;
        public string Number { get; set; } = null!;
        public string OrderType { get; set; } = null!;
        public string? PersonalRequest { get; set; }
        public int? TotalAmount { get; set; }

        public virtual Book Book { get; set; } = null!;
    }
}
