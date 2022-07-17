import json
import urllib.parse
import boto3
import csv
import gspread
import os
import time

s3 = boto3.client('s3')

def lambda_handler(event, context):
    # Google API Authentication
    gc = gspread.service_account(filename='./key.json')
    
    #Open google sheet workbook
    spreadsheetId = os.getenv("spreadsheetId")
    sheet = gc.open_by_key(spreadsheetId)
    
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')
    try:
        response = s3.get_object(Bucket=bucket, Key=key)
        print(response['ContentType'])
        read_obj = response['Body'].read().decode('utf-8').splitlines()
        csv_reader = csv.reader(read_obj)
  
        # convert string to list
        list_of_csv = list(csv_reader)
      
        sheetName=os.path.basename(key).split(".")[0]
        print(sheetName)
        
        worksheets = sheet.worksheets()
        
        # search for worksheet with sheetName
        is_worksheet_found = False
        for i in range(len(worksheets)):
            if (worksheets[i].title==sheetName):
                is_worksheet_found = True
                break
            
        if (is_worksheet_found):
                sheet.worksheet(sheetName).clear()
        else:
            sheet.add_worksheet(title=sheetName,rows=len(list_of_csv),cols=len(list_of_csv[0]))
        
        worksheet = sheet.worksheet(sheetName)
        
        worksheet.append_rows(list_of_csv)
        
        print("CONTENT TYPE: " + response['ContentType'])
        return response['ContentType']
    except Exception as e:
        print(e)
        print('Error getting object {} from bucket {}. Make sure they exist and your bucket is in the same region as this function.'.format(key, bucket))
        raise e
    
    return {
        'statusCode': 200,
        'body': json.dumps('Function ended')
    }
