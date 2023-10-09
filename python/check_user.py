"""
check_user.py

Description:
This file checks if a user is signed in or not

Usage:
This is a script file, it is not meant to be imported.
It is called from the front-end and will call either sign_in.py or sign_out.py

Author:
Jose Carlos Garcia

Date:
10/4/2023

Version: 
2.0.0
"""
import json
import random
import os
from datetime import date 
import csv
import sys
import re
import subprocess

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

# Function to retrieve the file path for the current day's file
def get_file_paths():
    date_time = date.today() 
    
    directory = str(date_time.month) + '_' + str(date_time.year)
    file_name = str(date_time.day)+ '_' + str(date_time.month) + '_' + str(date_time.year)
    
    file_addr = 'data/' + directory + '/' + file_name + '.csv'

    return file_addr

def get_status(data):
    # Get file path
    file_path = get_file_paths()
    jsonObj = json.loads(data)

    # Check if the file exists
    if not os.path.exists(file_path):
        print('File does not exist!')
        exit(1) 

    signed_in = False
    matching_ids = []

    # Open the file
    with open(file_path, mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            # Check if the user has the same phone number
            if row['Phone Number'] == jsonObj['Phone Number']:
                # Check if the user is already signed out
                if row['Active'] == '0':
                    # User is signed out, do something here if needed
                    pass
                elif row['Active'] == '1':
                    # User is signed in
                    signed_in = True
                    matching_ids.append(row['ID'])
                else:
                    # Error, invalid value for active
                    print('Error: Invalid value for active!')
            else: 
                pass 

        if jsonObj['Job'] == '' and len(matching_ids) == 0 :
            return None, None  # Invalid input, return None for both status and matching_ids
        else:
            return signed_in, matching_ids  # Return status and matching_ids

# Option to implement additional functionality with sign ins
def controller(data, command):
    try:
        if command == 0:
            # Call sign-in and wait for it to complete
            subprocess.run(['python', 'python/sign_in.py', data], check=True)
        elif command == 1: 
            # Call sign-out and wait for it to complete
            subprocess.run(['python', 'python/sign_out.py', data], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")
        sys.exit(1)

# Main function, calls the controller function
def main(): 
    # Check if the script was called with the correct number of arguments
    if len(sys.argv) != 3:
        print("Usage: python your_python_script.py arg1")
        sys.exit(1)

    data = sys.argv[1]
    additionalNames = sys.argv[2]

    formattedNames = additionalNames.split(",")
    print("Names", formattedNames)

    status, matchingID = get_status(data) # get the status of the user

    # if user is signed-in, sign them out
    if status == True:
        command = 1
        for id in matchingID:
            controller(id, command) 

    # if user doesn't exist or is signed-out, sign them in
    elif status == False:
        command = 0
        controller(data, command) # sign in the user

        parse = json.loads(data)

        for name in formattedNames:
            parse['Name'] = name
            dataI = json.dumps(parse)
            controller(dataI, command)
            

    # if user used the check-out form without using the check-in form
    elif status == None:
        print('Code 1: User is not in the database')
        return sys.exit(3) # 3 = user is not in the database, prompt log form

    # if there was an error, for whatever reason
    else: 
        print('Error: Check the logs for more information.')
        exit(1)

    print('Done. Exiting...')
    sys.exit(0)

#if __name__ == "__main__":
main()