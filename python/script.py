# Description: This file contains the functions that are used to store the data in the database.
import os
from datetime import date 

"""
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    1.  script.py Functions 
        - 1. db_setup(): creates the directory and file for the current month and day, if they don't already exist
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
"""

HEADERS = ['ID','Time in', 'Time Out', 'Name', 'Phone Number', 'Job', 'Reason', 'Company', 'Contact', 'Area', 'Time']

#    Retrieves current database for writing, our JS file sends a .JSON object to the backend, which is then written to the file
#    The file naming convention and layout is as follows: 
#    [1]: Parent Directory -> month_year
#    [2]: File Name -> day_month_year.csv 

def db_setup(): 
    date_time = date.today() 
    
    directory = str(date_time.month) + '_' + str(date_time.year)
    file_name = str(date_time.day)+ '_' + str(date_time.month) + '_' + str(date_time.year)
    
    file_addr = directory + '/' + file_name + '.csv'

    # Check if the current month's directory exists - if false, create it:
    if not os.path.exists(directory):
            os.makedirs(directory)
    
    # Check if today's file has been created yet - if false, create it: 
    if not os.path.exists(file_addr):
        f = open(file_addr, "x")
        f.write(','.join(HEADERS)) 
        
    print('Directory setup successfully!')

db_setup()