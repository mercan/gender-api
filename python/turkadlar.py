import requests
from bs4 import BeautifulSoup
import json

data = []
female_data = []
male_page_number = 1
female_page_number = 1

def male_names(URL):
  global male_page_number
  URL = f"https://turkadlar.com/?s=tum-adlar&kad=&ead=&sh=1&sh2={male_page_number}"

  response = requests.get(URL)
  soup = BeautifulSoup(response.text, "html.parser")
  names_html = soup.select_one("body > main > div > div:nth-child(3) > div:nth-child(2) > table > tbody")
  names = names_html.findAll("tr")
  
  for name in names:
    tr_find_all = name.findAll("td")
    data.append(tr_find_all[1].text)

  if male_page_number >= 83:
    with open('/Users/mercan/Desktop/Deneme/original_data/male.json', 'w') as outfile:
      json.dump(data, outfile, indent=2, ensure_ascii=False)
  else:
    male_page_number += 1
    male_names(URL)


def females_names(female_url):
  global female_page_number
  female_url = f"https://turkadlar.com/?s=tum-adlar&ead=&kad=&sh2=1&sh={female_page_number}"

  response = requests.get(female_url)
  soup = BeautifulSoup(response.text, "html.parser")
  names_html = soup.select_one("body > main > div > div:nth-child(3) > div:nth-child(1) > table > tbody")
  names = names_html.findAll("tr")
  
  for name in names:
    tr_find_all = name.findAll("td")
    female_data.append(tr_find_all[1].text)

  if female_page_number >= 83:
    with open('/Users/mercan/Desktop/Deneme/original_data/female.json', 'w') as outfile:
      json.dump(female_data, outfile, indent=2, ensure_ascii=False)
  else:
    female_page_number += 1
    females_names(female_url)


male_names("https://turkadlar.com/?s=tum-adlar&kad=&ead=&sh=1&sh2=1")
females_names("https://turkadlar.com/?s=tum-adlar&ead=&kad=&sh2=1&sh=1")
