   M S B A M L   `   `   `  ����D  @BB_Admins, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null5clr-namespace:BB_Admins.WindowsBB_Admins.Windows  5   	   "    BB_Admins.Windows.OrderDatas   5   	   W SPresentationCore, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5   	   R NSystem.Xaml, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   1localclr-namespace:BB_Admins.Windows     5   	     � Title$  Rendelések��5   	   $	��600��6   $
��1095��6)   
������  � Icon$ /Windows/logo2 (1).png��6O   .��5	      � .+�5   
   &   System.Windows.Controls.DataGrid  -   5          Name$ DataG��5   D   $	��Top=�6   
������    AutoGenerateColumns$ False��6S   $��3��6�      Columns 5      0  *System.Windows.Controls.DataGridTextColumn  5      ,  &System.Windows.Controls.DataGridColumn   Header$ Id��6%      Width5  /System.Windows.Controls.DataGridLengthConverter$ 30 6H      
IsReadOnly$
 True��6S      
FontWeight$
 Bold"�6e   1  +System.Windows.Controls.DataGridBoundColumn	   Binding	 61   �� *Id+6e     5      $ Felhasználónév��6%   $	 100 6Z   $
 True��6f   $
 Bold"�6x   	 6=   �� *
Username+6x     5      $ Email��6%   $	 115 6N   $
 True��6Z   $
 Bold"�6l   	 64   �� *Email+6l     5      $ BookId��6%   $ 30 6P   $
 True��6[   $
 Bold"�6m   	 65   �� *BookId+6m     5      $ Db��6%   $ 30 6Q   $
 True��6\   $
 Bold"�6n   	 61   �� *StockNumber+6n     5      $ Dátum��6%   $	 135 6R   $
 True��6^   $
 Bold"�6p   	 64   �� *	OrderDate+6p     5      $ Telefonszám��6%   $	 100 6Z   $
 True��6f   $
 Bold"�6x   	 6:   �� *Phonenumber+6x     5      $ Város��6%   $	 100 6Q   $
 True��6]   $
 Bold"�6o   	 64   �� *
Location+6o     5      $	 Út��6%   $	 100 6L   $
 True��6X   $
 Bold"�6j   	 61   �� *Street+6j     5      $ Házszam��6%   $ 30 6Q   $
 True��6\   $
 Bold"�6n   	 66   �� *Number+6n     5      $ Szállítás��6%   $	 100 6V   $
 True��6b   $
 Bold"�6t   	 68   �� *	OrderType+6t     5      $ Megjegyzés��6%   $	 100 6]   $
 True��6i   $
 Bold"�6{   	 69   �� *PersonalRequest+6{     5      $ Végösszeg��6%   $	 100 6X   $
 True��6d   $
 Bold"�6v   	 68   �� *TotalAmount+6v   5      �� 5   
   -   5        
 ��Name$
 b1��5      
������ 
��� ���$��20q�6J   $��Bottom=�6W   $
��Left=�6r   $	��540��6�   .��6�   	Mentés6�   �� 5   
   -   5        $
 b2��5      
������ 
��� ���$��20q�6J   $��Bottom=�6W   $��Right=�6r   $	��540��6�   $��3��6�   .��6�   
Nyomtatás6�   5      5       