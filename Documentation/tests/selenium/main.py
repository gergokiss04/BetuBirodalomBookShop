from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# WebDriver inicializálása
driver = webdriver.Chrome()

# A böngészőablak méretének beállítása
driver.set_window_size(1366, 768)

# Weboldal betöltése
driver.get("http://localhost:3000/")

# Várakozás 3 másodpercig
time.sleep(3)

# Az elemek megkeresése
fooldal_button = driver.find_element(By.ID, "fooldal")
konyvajanlo_button = driver.find_element(By.ID, "konyvajanlo")
lenyilomenu_button = driver.find_element(By.ID, "lenyilomenu")
nyelvkonyvesszotar_button = driver.find_element(By.ID, "nyelvkonyvesszotar")
eletmod_button = driver.find_element(By.ID, "eletmod")
tortenelem_button = driver.find_element(By.ID, "tortenelem")
irodalom_button = driver.find_element(By.ID, "irodalom")
sport_button = driver.find_element(By.ID, "sport")
gyermek_button = driver.find_element(By.ID, "gyermek")
csalad_button = driver.find_element(By.ID, "csalad")
rendelesitudnivalok_button = driver.find_element(By.ID, "rendelesitudnivalok")
rolunk_button = driver.find_element(By.ID, "rolunk")
kapcsolat_button = driver.find_element(By.ID, "kapcsolat")
bejelentkezes_button = driver.find_element(By.ID, "bejelentkezes")
regisztracio_button = driver.find_element(By.ID, "regisztracio")

#Főoldal tesztelése
fooldal_button.click()
driver.save_screenshot("fooldal.png")
time.sleep(3)


#Könyvajánló tesztelése
konyvajanlo_button.click()
time.sleep(1)
driver.save_screenshot("konyvajanlo.png")
time.sleep(3)

#Lenyiló menüre kattintás
lenyilomenu_button.click()
time.sleep(3)

#Nyelvkönyv és szótár tesztelése
nyelvkonyvesszotar_button.click()
time.sleep(1)
driver.save_screenshot("nyelvkonyvesszotar.png")
time.sleep(3)

#Lenyiló menüre kattintás
lenyilomenu_button.click()
time.sleep(3)

#Életmód és egészség tesztelése
eletmod_button.click()
time.sleep(1)
driver.save_screenshot("eletmod.png")
time.sleep(3)

#Lenyiló menüre kattintás
lenyilomenu_button.click()
time.sleep(3)

#Történelem tesztelése
tortenelem_button.click()
time.sleep(1)
driver.save_screenshot("tortenelem.png")
time.sleep(3)

#Lenyiló menüre kattintás
lenyilomenu_button.click()
time.sleep(3)

#Irodalom tesztelése
irodalom_button.click()
time.sleep(1)
driver.save_screenshot("irodalom.png")
time.sleep(3)

#Lenyiló menüre kattintás
lenyilomenu_button.click()
time.sleep(3)

#Sport tesztelése
sport_button.click()
time.sleep(1)
driver.save_screenshot("sport.png")
time.sleep(3)

#Lenyiló menüre kattintás
lenyilomenu_button.click()
time.sleep(3)

#Sport tesztelése
gyermek_button.click()
time.sleep(1)
driver.save_screenshot("gyermek.png")
time.sleep(3)

#Lenyiló menüre kattintás
lenyilomenu_button.click()
time.sleep(3)

#Sport tesztelése
csalad_button.click()
time.sleep(1)
driver.save_screenshot("csalad.png")
time.sleep(3)

#Rendelési tudnivalók tesztelése
rendelesitudnivalok_button.click()
time.sleep(1)
driver.save_screenshot("rendelesitudnivalok.png")
time.sleep(3)

#Rólunk tesztelése
rolunk_button.click()
time.sleep(1)
driver.save_screenshot("rolunk.png")
time.sleep(3)

#Kapcsolat tesztelése
kapcsolat_button.click()
driver.save_screenshot("kapcsolat.png")
time.sleep(3)

#Regisztráció tesztelése
regisztracio_button.click()
driver.save_screenshot("regisztracio.png")
time.sleep(3)

#Bejelentkezés tesztelése
bejelentkezes_button.click()
driver.save_screenshot("bejelentkezes.png")
time.sleep(3)
username_input = driver.find_element(By.ID, "username")
password_input = driver.find_element(By.ID, "password")
submit_button = driver.find_element(By.ID, "submit")
username_input.send_keys("kissg2")
password_input.send_keys("123456")
time.sleep(2)
submit_button.click()
time.sleep(2)
driver.save_screenshot("bejelentkezve.png")
time.sleep(5)

# WebDriver leállítása
driver.quit()
