using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BookShopWebAPI.Models
{
    public partial class bookshopContext : DbContext
    {
        public bookshopContext()
        {
        }

        public bookshopContext(DbContextOptions<bookshopContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Book> Books { get; set; } = null!;
        public virtual DbSet<Genre> Genres { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<Registry> Registries { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySQL("server=localhost;database=bookshop;user=root;password=;ssl mode=none;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>(entity =>
            {
                entity.ToTable("books");

                entity.HasIndex(e => e.GenreId, "IX_Books_Genre_Id");

                entity.Property(e => e.BookId)
                    .HasColumnType("int(11)")
                    .HasColumnName("Book_id");

                entity.Property(e => e.Author).HasDefaultValueSql("'NULL'");

                entity.Property(e => e.Cover).HasDefaultValueSql("'NULL'");

                entity.Property(e => e.Description)
                    .HasColumnType("text")
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.GenreId)
                    .HasColumnType("int(11)")
                    .HasColumnName("Genre_Id");

                entity.Property(e => e.Isbn)
                    .HasColumnType("bigint(20)")
                    .HasColumnName("ISBN")
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.Language).HasDefaultValueSql("'NULL'");

                entity.Property(e => e.PageNumber)
                    .HasColumnType("int(11)")
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.Price)
                    .HasColumnType("int(11)")
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.Publisher).HasDefaultValueSql("'NULL'");

                entity.Property(e => e.RelaseYear)
                    .HasColumnType("int(11)")
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.StockNumber)
                    .HasColumnType("int(11)")
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.Title).HasDefaultValueSql("'NULL'");

                entity.HasOne(d => d.Genre)
                    .WithMany(p => p.Books)
                    .HasForeignKey(d => d.GenreId)
                    .HasConstraintName("FK_Books_Genres_Genre_Id");
            });

            modelBuilder.Entity<Genre>(entity =>
            {
                entity.ToTable("genres");

                entity.Property(e => e.Id).HasColumnType("int(11)");

                entity.Property(e => e.Genre1)
                    .HasColumnName("genre")
                    .HasDefaultValueSql("'NULL'");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("orders");

                entity.HasIndex(e => e.BookId, "Book_id");

                entity.Property(e => e.Id).HasColumnType("int(11)");

                entity.Property(e => e.BookId)
                    .HasColumnType("int(11)")
                    .HasColumnName("Book_id");

                entity.Property(e => e.Email).HasMaxLength(50);

                entity.Property(e => e.Location).HasMaxLength(40);

                entity.Property(e => e.Number).HasMaxLength(4);

                entity.Property(e => e.OrderDate).HasMaxLength(6);

                entity.Property(e => e.OrderType).HasMaxLength(60);

                entity.Property(e => e.PersonalRequest)
                    .HasMaxLength(255)
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.Phonenumber).HasMaxLength(20);

                entity.Property(e => e.StockNumber).HasColumnType("int(11)");

                entity.Property(e => e.Street).HasMaxLength(50);

                entity.Property(e => e.TotalAmount)
                    .HasColumnType("int(30)")
                    .HasColumnName("Total_amount")
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.Username).HasMaxLength(30);

                entity.Property(e => e.Zipcode).HasColumnType("int(4)");

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.BookId)
                    .HasConstraintName("orders_ibfk_1");
            });

            modelBuilder.Entity<Registry>(entity =>
            {
                entity.ToTable("registry");

                entity.HasIndex(e => e.Key, "Key")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnType("int(11)")
                    .HasColumnName("id");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .HasColumnName("email");

                entity.Property(e => e.Fullname)
                    .HasMaxLength(50)
                    .HasColumnName("fullname");

                entity.Property(e => e.Hash)
                    .HasMaxLength(64)
                    .HasColumnName("HASH");

                entity.Property(e => e.Key).HasMaxLength(64);

                entity.Property(e => e.Salt)
                    .HasMaxLength(64)
                    .HasColumnName("SALT");

                entity.Property(e => e.Username)
                    .HasMaxLength(30)
                    .HasColumnName("username");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.HasIndex(e => new { e.Username, e.Email }, "username");

                entity.Property(e => e.Id).HasColumnType("int(11)");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .HasColumnName("email");

                entity.Property(e => e.Fullname)
                    .HasMaxLength(50)
                    .HasColumnName("fullname");

                entity.Property(e => e.Hash)
                    .HasMaxLength(64)
                    .HasColumnName("HASH");

                entity.Property(e => e.Salt)
                    .HasMaxLength(64)
                    .HasColumnName("SALT");

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .HasColumnName("username");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
