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
using System.Printing;
using System.Windows.Markup;
using System.Drawing.Printing;
using System.Windows.Xps;
using BB_Admins.Models;
using Microsoft.Win32;
using System.IO;

namespace BB_Admins.Windows
{
    /// <summary>
    /// Interaction logic for OrderDatas.xaml
    /// </summary>
    public partial class OrderDatas : Window
    {
        bool beolvasva = false;
        int ID = 0;
        string konyvCím = "";
        static List<Models.Book> konyv = new List<Models.Book>();
        private void AdatBeolvasas()
        {
            //Adatok lekérése
            List<Models.Order> list = new List<Models.Order>();
            WebClient client = new WebClient();
            client.Headers[HttpRequestHeader.ContentType] = "application/json";
            client.Encoding = Encoding.UTF8;
            string url = $"https://localhost:7280/Orders/GetOrders";
            try
            {
                string result = client.DownloadString(url);
                list = JsonConvert.DeserializeObject<List<Models.Order>>(result);
            }
            catch (Exception) { }
            DataG.ItemsSource = list;
            beolvasva = true;
        }

        private void KonyvCim()
        {      
            //Könyv adatainak lekérése
            WebClient client = new WebClient();
            client.Headers[HttpRequestHeader.ContentType] = "application/json";
            client.Encoding = Encoding.UTF8;
            string url = $"https://localhost:7280/Book/All_books";
            try
            {
                string result = client.DownloadString(url);
                konyv = JsonConvert.DeserializeObject<List<Models.Book>>(result);
            }
            catch (Exception )
            {
            }
        }
        public OrderDatas()
        {
            //Adatok betöltése
            InitializeComponent();
            if (!beolvasva)
            {
                AdatBeolvasas();
                KonyvCim();
            }
        }
        //Rendelés kiválasztása
        Models.Order order = new Models.Order();
        private void OrderSelection(object sender, SelectionChangedEventArgs e)
        {
            try
            {
                order = DataG.SelectedItems[0] as Models.Order;
                b1.Content = order.Id + ". rendelés mentése";
                b2.Content = order.Id + ". rendelés nyomtatása";
            }
            catch (Exception ex)
            {

                MessageBox.Show(ex.ToString());
            }
        }
        //Megrendelés kiírása txt fájlba
        private void Button_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                string save = $"\t\t\t\t\t\t\t\t\t\tMEGRENDELÉS\n\nTeljes név: {order.Username}\nEmail: {order.Email}\nTelefonszám: {order.Phonenumber}\nCím: {order.Zipcode} {order.Location} {order.Street} {order.Number}\n_____________________________________\nDátum: {order.OrderDate}\n_____________________________________\nKönyv:\n\n   KönyvId: {order.BookId}\n   Könyvcím: {konyvCím}\n   Darab szám:{order.StockNumber} db\n   Teljesár: {order.TotalAmount} Ft\n_____________________________________\nSzállítás:\n       {order.OrderType}\n_____________________________________\nMegjegyzés:\n        {order.PersonalRequest}";
                SaveFileDialog saveFileDialog = new SaveFileDialog();
                saveFileDialog.Filter = "Text file (*.txt)|*.txt";
                if (saveFileDialog.ShowDialog() == true)
                    File.WriteAllText(saveFileDialog.FileName, save);
                MessageBox.Show("Sikeres mentés");
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
        //Megrendelés nyomtatása
        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            try
            {
                foreach (var item in konyv)
                {
                    if (item.BookId == order.BookId)
                    {
                        konyvCím = item.Title;
                    }
                }
                var selectedItem = $"\t\t\t\t\t\t\t\t\t\tMEGRENDELÉS\n\nTeljes név: {order.Username}\nEmail: {order.Email}\nTelefonszám: {order.Phonenumber}\nCím: {order.Zipcode} {order.Location} {order.Street} {order.Number}\n_____________________________________\nDátum: {order.OrderDate}\n_____________________________________\nKönyv:\n\n   KönyvId: {order.BookId}\n   Könyvcím: {konyvCím}\n   Darab szám:{order.StockNumber} db\n   Teljesár: {order.TotalAmount} Ft\n_____________________________________\nSzállítás:\n       {order.OrderType}\n_____________________________________\nMegjegyzés:\n        {order.PersonalRequest}";

                FlowDocument doc = new FlowDocument(new Paragraph(new Run(selectedItem.ToString())));

                PrintDialog printDlg = new PrintDialog();

                if (printDlg.ShowDialog() == true)
                {
                    IDocumentPaginatorSource idpSource = doc;

                    printDlg.PrintDocument(idpSource.DocumentPaginator, "Print job description");
                }
                MessageBox.Show("Sikeres nyomtatás!");
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
    }
}