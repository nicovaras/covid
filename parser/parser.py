# #!/usr/bin/env python
# # coding: utf-8

from lxml import etree
import requests
from bs4 import BeautifulSoup
import re
import json
import pandas as pd
import datetime
from flask import Flask
from flask_cors import CORS, cross_origin


def covidJson():
    s = requests.get('https://en.wikipedia.org/wiki/Template:2019%E2%80%9320_coronavirus_pandemic_data/Argentina_medical_cases').text

    soup = BeautifulSoup(s, 'html.parser')
    table = soup.find_all('table')[0]
    data = []
    for tr in table.find_all('tr'):
        tds = tr.find_all('td')
        texts = [td.text.strip() for td in tds]
        texts = [t.replace("—", "0") for t in texts]
        texts= [re.sub(r'\[.*', '', t) for t in texts]
        texts= [(t if t else '0') for t in texts]
        data.append([tr.find_all('th')[0].text.strip()] + texts)
    data = data[3:-1]
    cols = ["date","CABA","Buenos Aires","Catamarca","Chaco", "Chubut","Cordoba","Corrientes","Entre Rios","Formosa","Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquen", "Rio Negro", "Salta","San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucuman", 'total_cases', 'total_deaths', 'new_cases', 'new_deaths']
    df = pd.DataFrame(data, columns = cols)

    def format_date(date):
        year = " 2020"
        date = re.sub(r'\[.*', '', date)
        return datetime.datetime.strptime(date+year, '%d %b %Y').strftime("%Y/%m/%d")
    df['date'] = df['date'].apply(format_date)

    totals = df[['total_cases', 'total_deaths', 'new_cases', 'new_deaths']]
    totals.index= df['date']
    totals = totals.to_dict(orient='index')

    df.index = df['date']

    provinces = df.columns[1:-4].values
    data = {}
    last = {}
    for p in provinces:
        data[p] = {}
        last[p] = [0,0]
        
    for idx, row in df.iterrows():
        for p in provinces:
            if '(' in row[p]:
                val = int(re.sub(r'\(.*', '', row[p]))
                deaths = int(row[p].split('(')[1][:-1])
            else:
                val = int(row[p])
                deaths = 0

            data[p][idx] =({'total_cases': val, 
                        'new_cases': val - last[p][0], 
                        'total_deaths':deaths, 
                        'new_deaths': deaths - last[p][1]})
            last[p] = [val, deaths]

    return json.dumps({'data': data, 'totals': totals, 'provinces': list(provinces)})


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
@cross_origin()
def example():
   return covidJson()

if __name__ == '__main__':
    app.run(host="0.0.0.0")