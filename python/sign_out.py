"""
sign_out.py

Description:
This file contains functions to store sign out users to the database

Usage:
This is a script file, it is not meant to be imported.
It is called from the frontend, and will signout the user based on information in the database.

Author:
Jose Carlos Garcia

Date:
10/4/2023

Version: 
1.0.0
"""
import json
import os
from datetime import date, time 
import datetime
import csv
import sys

"""
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    1.  store.py Functions 
        - 1. trans_id(): generates an ID for the transaction, this will be used to reference the user's entry in the database
        - 2. get_file_paths(): retrieves the file path for the current day's file
        - 3. update_csv(): appends data from a JSON object to a CSV file
        - 4. controller(): controls the flow of the program
        - 5. main(): main function, calls the controller function
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
"""

HEADERS = ['Active', 'ID','Time in', 'Time Out', 'Name', 'Phone Number', 'Job', 'Reason', 'Company', 'Contact', 'Area', 'Time']
appFilePath = ''

# Function to retrieve the file path for the current day's file
def get_file_paths():
    return appFilePath

# Function to calculate the total time on site
def get_time(time_string, give_end_time): 

    # Convert the start and end times to datetime objects
    _given_start_time = datetime.datetime.strptime(time_string, "%d-%m-%Y %H:%M:%S")
    start_time = _given_start_time

    end_time = datetime.datetime.strptime(give_end_time, "%d-%m-%Y %H:%M:%S")

    # Calculate the total time on site in hours
    _total_time = end_time - start_time

    total_time = str(_total_time).split(",")[-1].strip()
    return total_time


# Function to calculate the current time
def check_out_time(): 
    time = datetime.datetime.now()
    return str(time.strftime("%d-%m-%Y %H:%M:%S"))

import csv

def update_csv(id):
    file_path = get_file_paths()
    # Open the CSV file in read mode
    with open(file_path, 'r') as csv_file:
        reader = csv.DictReader(csv_file)
        rows = [row for row in reader]

    # Find the row with the matching ID
    for row in rows:
        if row['ID'] == id:
            # Set the check-out time
            time_out = check_out_time()
            time_in = row['Time in']

            # Update the row with the check-out time
            try:
                row['Time Out'] = time_out
                row['Active'] = '0'
                row['Time'] = get_time(time_in, time_out)
            except KeyError:
                print("Error: 'Time In' key not found in row dictionary")
                sys.exit(1)

            # Write the updated rows to the CSV file
            with open(file_path, 'w', newline='') as csv_file:
                fieldnames = reader.fieldnames
                writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(rows)

            print("CSV updated successfully.")
            return

    print("Error: ID not found in CSV file.")
    sys.exit(1)


# Main function, calls the controller function
def main(): 
    # Check if the script was called with the correct number of arguments
    if len(sys.argv) != 3:
        print("Usage: python your_python_script.py arg1 arg2")
        sys.exit(1)

    arguments = sys.argv[1]
    user_id = arguments[0]
    
    global appFilePath
    appFilePath = arguments[1]

    print('Signing Out...')

    update_csv(user_id)

    sys.exit(0)

#if __name__ == "__main__":
main()