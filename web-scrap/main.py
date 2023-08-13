import requests
from bs4 import BeautifulSoup
import csv

headers = {
    'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'
}

s = requests.Session()
# hmURL = "https://www2.hm.com/en_in/women/shop-by-product/skirts.html?sort=stock&image-size=small&image=model&offset=0&page-size=252"
# hmURL = "https://www2.hm.com/en_in/women/shop-by-product/shorts.html?sort=stock&image-size=small&image=model&offset=0&page-size=252"
# hmURL = "https://www2.hm.com/en_in/women/shop-by-product/tops.html?sort=stock&image-size=small&image=model&offset=0&page-size=936"
hmURL = "https://www2.hm.com/en_in/women/shop-by-product/shirts-blouses.html?sort=stock&image-size=small&image=model&offset=0&page-size=324"
res = s.get(hmURL, headers=headers)
product_card_soup = BeautifulSoup(res.text, "lxml")
product_links = product_card_soup.find_all("a", class_="item-link")
domain = 'https://www2.hm.com'
href_list = [domain + anchor.get('href') for anchor in product_links]

smaller_list = href_list
def flatten_and_remove_empty(lst):
    flattened = []
    for item in lst:
        if isinstance(item, list):
            flattened.extend(flatten_and_remove_empty(item))
        elif item:  # Check if item is not empty
            flattened.append(item)
    return flattened

header = ['Material', 'Full Description']

csv_filename = "shirts-blouses.csv"
with open(csv_filename, mode='w', newline='', encoding='utf-8') as csv_file:
    csv_writer = csv.writer(csv_file)

    for link in smaller_list:
        product_page_response = s.get(link, headers=headers)
        product_page_soup = BeautifulSoup(product_page_response.text, "lxml")
        product_desc = product_page_soup.find("div", {"id": "section-descriptionAccordion"})
        
        material_desc = product_page_soup.find("div", {"id": "section-materialsAndSuppliersAccordion"}).find_all("dl")[0]
        material_type = [type.get_text(strip=True) for type in material_desc.find_all("dd")]
        cleaned_material_type = [type[:-1] if type.endswith(",") else type for type in material_type] 
       
        data_dict = {}
        data_dict['material'] = cleaned_material_type
        
        key = "Full " + product_desc.h2.text
        value = product_desc.p.text
        data_dict[key] = value

        datas = product_desc.find_all("div")

        for data in datas:
            keys = data.find_all("dt")
            values = data.find_all("dd")

            for i in range(len(keys)):
                key = keys[i].get_text(strip=True)
                if key[0] == '>':
                    key = key[1:]

                if key not in header:
                    header.append(key)

            if not header:  # Write headers only once
                header.insert(0, "Product Link")
                csv_writer.writerow(header)

            for i in range(len(keys)):
                key = keys[i].get_text(strip=True)
                if key[0] == '>':
                    key = key[1:]

                get_values = values[i].find_all('li')
                if get_values:
                    text_value = [value.get_text(strip=True) for value in get_values]
                    if len(text_value) == 1:
                        text_value = text_value[0]
                else:
                    text_value = values[i].get_text(strip=True)

                data_dict[key] = text_value
                
        
        
        # Write data to the CSV file

        row_data = [link, data_dict['material']] + [data_dict.get(key, '') for key in header[1:]]
        csv_writer.writerow(row_data)

print("Data writing complete.")
