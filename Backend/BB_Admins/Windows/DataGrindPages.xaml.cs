using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using Microsoft.EntityFrameworkCore.Infrastructure;
using BB_Admins.Models;
using System.Security.Policy;
using System.Windows.Markup;

namespace BB_Admins.Windows
{
    /// <summary>
    /// Interaction logic for DataGrindPages.xaml
    /// </summary>
    public partial class DataGrindPages : Window
    {
        bool beolvasva = false;
        int ID = 0;

        private string Ellenorzes()
        {
            return "";
        }
        private void MezokTorlese()
        {
            id.Text = "";
            isbn.Text = "";
            title.Text = "";
            author.Text = "";
            publisher.Text = "";
            pnumber.Text = "";
            language.Text = "";
            pyear.Text = "";
            priece.Text = "";
            snumber.Text = "";
            cover.Text = "";
            genreid.Text = "";
            description.Text = "";
        }
        private void AdatBeolvasas()
        {
            //Lista az adatoknak
            List<Models.Book> list = new List<Models.Book>();
            //Adatok lekérése a szerverről
            WebClient client = new WebClient();
            client.Headers[HttpRequestHeader.ContentType] = "application/json";
            client.Encoding = Encoding.UTF8;
            string url = $"https://localhost:7280/Book/All_books";
            MezokTorlese();
            try
            {
                string result = client.DownloadString(url);
                list = JsonConvert.DeserializeObject<List<Models.Book>>(result);
            }
            catch (Exception ex) { }
            DataG.ItemsSource = list;
            beolvasva = true;
        }
        public DataGrindPages()
        {
            //Adatok betöltése
            InitializeComponent();
            if (!beolvasva)
            {
                AdatBeolvasas();
            }
        }

        private void BooksChanged(object sender, RoutedEventArgs e)
        {
            //Könyv kiválasztása, adatai textbox-ba kiíratása
            try
            {
                Models.Book book = DataG.SelectedItems[0] as Models.Book;
                id.Text = book.BookId.ToString();
                ID = book.BookId;
                isbn.Text = book.Isbn.ToString();
                title.Text = book.Title;
                author.Text = book.Author;
                publisher.Text = book.Publisher;
                pnumber.Text = book.PageNumber.ToString();
                language.Text = book.Language;
                pyear.Text = book.RelaseYear.ToString();
                priece.Text = book.Price.ToString();
                snumber.Text = book.StockNumber.ToString();
                cover.Text = book.Cover;
                genreid.Text = book.GenreId.ToString();
                description.Text = book.Description;
            }
            catch (Exception)
            {
                MezokTorlese();
            }
        }

        private void createBtn(object sender, RoutedEventArgs e)
        {
            //Új könyv felvitele
            string uzenet = Ellenorzes();
            if (uzenet == "")
            {
                Models.Book book = new Models.Book();
                try
                {
                    book.BookId = int.Parse(id.Text);
                    book.Isbn = Convert.ToInt64(isbn.Text);
                    book.Title = title.Text;
                    book.Author = author.Text;
                    book.Publisher = publisher.Text;
                    book.PageNumber = int.Parse(pnumber.Text);
                    book.Language = language.Text;
                    book.RelaseYear = int.Parse(pyear.Text);
                    book.Price = int.Parse(priece.Text);
                    book.StockNumber = int.Parse(snumber.Text);
                    book.Cover = cover.Text;
                    book.GenreId = int.Parse(genreid.Text);
                    book.Description = description.Text;
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Valamelyik adat nem megfelelő!\n" + ex.Message);
                }
                WebClient client = new WebClient();
                client.Headers[HttpRequestHeader.ContentType] = "application/json";
                client.Encoding = Encoding.UTF8;
                string url = "https://localhost:7280/Book/New_book_add";
                try
                {
                    string result = client.UploadString(url, "POST", JsonConvert.SerializeObject(book));
                    MessageBox.Show(result);
                    AdatBeolvasas();
                }
                catch (Exception ex)
                {
                    MessageBox.Show(ex.Message);
                }
            }
            else
            {
                MessageBox.Show(uzenet);
            }
        }

        private void updateBtn(object sender, RoutedEventArgs e)
        {
            //Könyv módosítása
            string uzenet = Ellenorzes();
            if (uzenet == "")
            {
                if (ID != 0)
                {
                    Models.Book book = new Models.Book();
                    try
                    {
                        book.BookId = int.Parse(id.Text);
                        book.Isbn = Convert.ToInt64(isbn.Text);
                        book.Title = title.Text;
                        book.Author = author.Text;
                        book.Publisher = publisher.Text;
                        book.PageNumber = int.Parse(pnumber.Text);
                        book.Language = language.Text;
                        book.RelaseYear = int.Parse(pyear.Text);
                        book.Price = int.Parse(priece.Text);
                        book.StockNumber = int.Parse(snumber.Text);
                        book.Cover = cover.Text;
                        book.GenreId = int.Parse(genreid.Text);
                        book.Description = description.Text;
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show("Valamelyik adat nem megfelelő!\n" + ex.Message);
                    }
                    WebClient client = new WebClient();
                    client.Headers[HttpRequestHeader.ContentType] = "application/json";
                    client.Encoding = Encoding.UTF8;
                    string url = "https://localhost:7280/Book/UpdateBook";
                    try
                    {
                        string result = client.UploadString(url, "PUT", JsonConvert.SerializeObject(book));
                        MessageBox.Show(result);
                        AdatBeolvasas();
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show(ex.Message);
                    }
                }
            }
            else
            {
                MessageBox.Show(uzenet);
            }
        }

        private void deleteBtn(object sender, RoutedEventArgs e)
        {
            //Könyv törlése
            if (MessageBox.Show($"Biztosan törli a(z) {title.Text} című könyvet?",
                   "Könyv törlése",
                   MessageBoxButton.YesNo,
                   MessageBoxImage.Warning) == MessageBoxResult.Yes)
            {
                Models.Book book = new Models.Book();
                book.BookId = int.Parse(id.Text);
                WebClient client = new WebClient();
                client.Headers[HttpRequestHeader.ContentType] = "application/json";
                client.Encoding = Encoding.UTF8;
                string url = $"https://localhost:7280/Book/id?id={book.BookId}";
                try
                {
                    string result = client.UploadString(url, "DELETE", "");
                    MessageBox.Show(result);
                    AdatBeolvasas();
                }
                catch (Exception ex)
                {
                    MessageBox.Show(ex.Message);
                }
            }
        }
    }
}
