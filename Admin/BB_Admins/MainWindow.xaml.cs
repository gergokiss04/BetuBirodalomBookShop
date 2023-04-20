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
using System.Windows.Navigation;
using System.Windows.Shapes;
using BB_Admins.Windows;
using System.Security.Cryptography;
using BB_Admins.Models;

namespace BB_Admins
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }
        private void Exit(object sender, RoutedEventArgs e)
        {
            Application.Current.Shutdown();
        }

        private void MainWindow_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            MessageBox.Show($"Viszlát!");
        }
        //A könyvek módosítására szolgáló ablak megnyitása
        private void Admin(object sender, RoutedEventArgs e)
        {
            Windows.DataGrindPages dataGrindPages = new Windows.DataGrindPages();
            dataGrindPages.ShowDialog();
        }
        //Megrendelések ablak megnyitása
        private void Order(object sender, RoutedEventArgs e)
        {
            Windows.OrderDatas order = new Windows.OrderDatas();
            order.ShowDialog();
        }
    }
}

