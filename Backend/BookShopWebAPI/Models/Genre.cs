using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BookShopWebAPI.Models
{
    public partial class Genre
    {
        public Genre()
        {
            Books = new HashSet<Book>();
        }

        public int Id { get; set; }
        public string? Genre1 { get; set; }

        [JsonIgnore]
        public virtual ICollection<Book> Books { get; set; }
    }
}
