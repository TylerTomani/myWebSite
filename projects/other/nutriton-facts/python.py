import requests
from bs4 import BeautifulSoup

# URL of the USDA page
url = "https://fdc.nal.usda.gov/food-details/1999632"

# Fetch the page
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}

response = requests.get(url, headers=headers)

# Find the nutritional facts table
table = soup.find('table')  # Adjust the selector based on the table structure
print(response.status_code)
if response.status_code != 200:
    print("Failed to retrieve the page.")
else:
    print("Page fetched successfully.")

# Extract the data
# data = []
# for row in table.find_all('tr')[1:]:  # Skip the header row
#     columns = row.find_all('td')
#     data.append({
#         'Nutrient': columns[0].text.strip(),
#         'Value': columns[1].text.strip()
#     })
#     break

# Print or process the data
# print(data)
