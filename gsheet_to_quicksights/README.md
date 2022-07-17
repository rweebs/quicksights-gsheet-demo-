# GSheet to Quicksights Data Source

## Program Flow:
![Gsheet_to_QuickSight](./statics/gsheet_to_quicksight.jpg)
## Prerequisites:
1. Setup AWS AccessKey and SecretKey that enable access to read and write to specific S3 Bucket.

## Steps:
1. Navigate to Apps Script on the Google Spreadsheet.
![Create](./statics/1.png)
2. Copy all the code that was given in this repo, you can see the final configuration below.
![Create](./statics/2.png)
3. Navigate to the project settings.
![Create](./statics/3.png)
4. Add the AccessKeyId, Bucket Name, and Secret AccessKey to the script properties. This will protect your secrets for security reason.
![Create](./statics/4.png)
5. Navigate to Triggers
![Create](./statics/5.png)
6. This is the trigger implementation you can make the program to sync on the given time, such as sync every minutes or with other configuration.
![Create](./statics/6.png)
7. It will export every worksheet on the workbook into a different csv file on the bucket.
![Create](./statics/7.png)
8. In Quicksight we can make our S3 Bucket as our data source.
![Create](./statics/9.png)
9. This is how our manifest.json file looks like and needs to be uploaded.
![Create](./statics/8.png)
10. We can also preview the data here.
![Create](./statics/10.png)
![Create](./statics/11.png)
11. We also schedule a job to refresh our dataset hourly.
![Create](./statics/12.png)
![Create](./statics/13.png)
