using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BookShopWebAPI.Models
{
    public partial class Book
    {
        public Book()
        {
            Orders = new HashSet<Order>();
        }

        public int BookId { get; set; }
        public long? Isbn { get; set; }
        public string? Title { get; set; }
        public string? Author { get; set; }
        public string? Publisher { get; set; }
        public int? PageNumber { get; set; }
        public string? Language { get; set; }
        public int? RelaseYear { get; set; }
        public int? Price { get; set; }
        public int? StockNumber { get; set; }
        public string? Cover { get; set; }
        public int GenreId { get; set; }
        public string? Description { get; set; }

        [JsonIgnore]
        public virtual Genre? Genre { get; set; } = null!;

        [JsonIgnore]
        public virtual ICollection<Order> Orders { get; set; }
    }
}
