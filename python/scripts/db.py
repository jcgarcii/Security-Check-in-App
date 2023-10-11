"""
db.py

Description:
This file contains functions to initialize the database daily

Usage:
This is a script file, it is not meant to be imported. 
It is meant to be scheduled to run daily, and will create a new file for each day. 

Author:
Jose Carlos Garcia

Date:
10/4/2023

Version: 
1.0.1
"""
import os
import sys
from datetime import date 

"""
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    1.  script.py Functions 
        - 1. db_setup(): creates the directory and file for the current month and day, if they don't already exist
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
"""

HEADERS = ['Active','ID','Time in', 'Time Out', 'Name', 'Phone Number', 'Job', 'Reason', 'Company', 'Contact', 'Area', 'Time']

#    Retrieves current database for writing, our JS file sends a .JSON object to the backend, which is then written to the file
#    The file naming convention and layout is as follows: 
#    [1]: Parent Directory -> month_year
#    [2]: File Name -> day_month_year.csv 

def db_setup(): 

    if len(sys.argv) != 2:
        print("Usage: python your_python_script.py arg1")
        sys.exit(1)

    appFilePath = sys.argv[1]

    date_time = date.today() 
    
    month = str(date_time.month) + '_' + str(date_time.year)
    file_name = str(date_time.day)+ '_' + str(date_time.month) + '_' + str(date_time.year)
    
    directory = os.path.join(appFilePath, 'data', month)
    file_addr = os.path.join(directory, file_name + '.csv') 

    # Check if the current month's directory exists - if false, create it:
    if not os.path.exists(directory):
            os.makedirs(directory)
    
    # Check if today's file has been created yet - if false, create it: 
    if not os.path.exists(file_addr):
        with open(file_addr, mode='w', newline='') as csv_file:
            csv_file.write(','.join(HEADERS) + ',\n') 
        
    print('Directory setup successfully!')
db_setup()