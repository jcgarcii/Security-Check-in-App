"""
sign_in.py

Description:
This file contains functions to store sign in users to the database

Usage:
This is a script file, it is not meant to be imported.
It is called from the frontend, and will store the user's information in the database.

Author:
Jose Carlos Garcia

Date:
10/4/2023

Version: 
2.0.1
"""
import json
import random
import os
from datetime import date 
import csv
import sys

"""
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    1.  store.py Functions 
        - 1. trans_id(): generates an ID for the transaction, this will be used to reference the user's entry in the database
        - 2. get_file_paths(): retrieves the file path for the current day's file
        - 3. append_json_to_csv(): appends data from a JSON object to a CSV file
        - 4. controller(): controls the flow of the program
        - 5. main(): main function, calls the controller function
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
"""

HEADERS = ['Active','ID','Time in', 'Time Out', 'Name', 'Phone Number', 'Job', 'Reason', 'Company', 'Contact', 'Area', 'Time']

appFilePath = ''

#    Generates a random ID for the transaction, we'll use this to reference the user's entry in the database
def trans_id(): 
    hash = random.getrandbits(32)
    return hash 

# Function to retrieve the file path for the current day's file
def get_file_paths():
    return appFilePath

import csv

# Function to append data from a JSON object to a CSV file
def append_json_to_csv(json_object):

    # Get the current file path
    file_path = get_file_paths()

    # get new transaction id 
    transaction_id = trans_id() 

    # Convert the JSON object to a Python dictionary
    data = json.loads(json_object)

    # update active status
    data['Active'] = '1' # 0 = signed out, 1 = signed in

    # store transaction id
    data['ID'] = transaction_id

    # Open the CSV file in append mode
    with open(file_path, mode='a', newline='') as csv_file:
        fieldnames = data.keys()
        csv_writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

        # Write the data as a new row in the CSV file
        csv_writer.writerow(data)

    # return 'Data stored successfully!'
    
# Main function, calls the controller function
def main(): 
    # Check if the script was called with the correct number of arguments
    if len(sys.argv) != 3:
        print("Usage: python your_python_script.py arg1 arg2")
        sys.exit(1)

    arguments = sys.argv[1]
    # print ('Number of arguments:', len(sys.argv), 'arguments.')
    json_object = arguments[0]

    global appFilePath
    appFilePath = arguments[1]


    append_json_to_csv(json_object)
    
    sys.exit(0)

#if __name__ == "__main__":
main()