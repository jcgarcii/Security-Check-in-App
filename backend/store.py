# Description: This file contains the functions that are used to store the data in the database.
import json
import random
import os
import datetime
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

HEADERS = ['ID','Time in', 'Time Out', 'Name', 'Phone Number', 'Job', 'Reason', 'Company', 'Contact', 'Area', 'Time']

#    Generates a random ID for the transaction, we'll use this to reference the user's entry in the database
def trans_id(): 
    hash = random.getrandbits(32)
    return hash 

# Function to retrieve the file path for the current day's file
def get_file_paths():
    date = datetime.today() 
    
    directory = str(date.month) + '_' + str(date.year)
    file_name = str(date.day)+ '_' + str(date.month) + '_' + str(date.year)

    file_addr = directory + '/' + file_name + '.csv'

    return file_addr

#   Function to append data from a JSON object to a CSV file
def append_json_to_csv(json_object):

    # Get the current file path
    file_path = get_file_paths()

    # get new transaction id 
    transaction_id = trans_id() 

    # Convert the JSON object to a Python dictionary
    data = json.loads(json_object)

    # store transaction id
    data['ID'] = transaction_id

    # Open the CSV file in append mode
    with open(file_path, mode='a', newline='') as csv_file:
        fieldnames = data.keys()
        csv_writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

        # Write the data as a new row in the CSV file
        csv_writer.writerow(data)

#  Function to control the flow of the program
def controller(json_object, command):
    if command == 0:
        append_json_to_csv(json_object)
    elif command == 1:
        print('Coming soon!')
    else:
        print('Invalid command!')
    

if __name__ == "__main__":
    # Check if the script was called with the correct number of arguments
    if len(sys.argv) != 2:
        print("Usage: python your_python_script.py arg1 arg2")
        sys.exit(1)

    json_object = int(sys.argv[0])
    command = int(sys.argv[1])

    result = controller(json_object, command) 
    
    print('Done. Exiting...')