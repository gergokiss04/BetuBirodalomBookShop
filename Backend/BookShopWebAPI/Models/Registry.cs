using System;
using System.Collections.Generic;

namespace BookShopWebAPI.Models
{
    public partial class Registry
    {
        public int Id { get; set; }
        public string Username { get; set; } = null!;
        public string Fullname { get; set; } = null!;
        public string Salt { get; set; } = null!;
        public string Hash { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Key { get; set; } = null!;
    }
}
