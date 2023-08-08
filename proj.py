from datetime import datetime
import os
import json
import random

# Global variables tack visitor's inputs
global REASON, input_name, current_time, input_company, input_contact, input_explanation, input_others, accompanied_check, transaction_id

HEADER = ['Transaction ID', 'Time', 'Name', 'Type', 'Company', 'Contact']

def main(): 
    print('Welcome, please select a usecase for this computer')
    
    setup = input('(Select one)\n' +
        '[1]: Sign Ins \n' +
        '[2]: Sign Outs \n'
        '[3]: Both \n>> ')
    selection = int(setup)     
    
    match selection: 
        case 1: 
            signin()
        case 2:
            signout()
        case 3: 
            dual()
        case _: 
            print('Invalid option, please try again') 
            main() 

"""
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    1. Application Configuration Setup Functions 

        - 1. Sign In: Used strictly to collect sign-ins
        - 2. Sign Outs: Used strictly to sign-out existing sign-ins 
        - 3. Dual: Used for both sign-ins and sign-outs. Users will enter their name and the databse will
            be searched for their entry
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
"""
# (default) prompts visitors to sign-in or to sign-out 
def dual(): 
    print('both')

# Loops through the sign-out option 
def signout(): 
    print('lol')

# Loops through the sign-in option 
def signin(): 
    get_db()
    print('Welcome to Cargill Schuyler') 
    globals()["current_time"] = datetime.now()
    globals()["transaction_id"] = trans_id()  
    globals()["input_name"] = input('Please enter your name\n>> ')

    select()

    visitor_data = [
        [transaction_id, current_time, input_name, REASON, input_company, input_contact]      
        ]  

    if(accompanied_check):
        
        for name in input_others:
            new_id = trans_id() 
            new_time = datetime.now() 
            accompanying_visitor = [new_id, new_time, name, REASON, input_company, input_contact]

            visitor_data.append(accompanying_visitor)

    print(visitor_data) 
        
    print('Welcome to Cargill, have a nice day!')

    signin() 

"""
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    2. Visitor Type Based Setup Functions 

        - 1. New Employee: for new employees 
        - 2. Contractor: collects information about contracts, allows them to sign in others 
        - 3. Other: collects information for standard visitors, allows them to sign in others 
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
"""
# Displays input options for new employees 
def new_employee():
    globals()["REASON"] = 'New Employee'
    globals()["input_company"] = ''
    globals()["input_contact"] = input('Name of Cargill Contact/Supervisor (if known)\n>> ')
    globals()["accompanied_check"] = False

# Displays input options for contractors 
def contractor():
    globals()["REASON"] = 'Contractor'
    globals()["input_company"] = input('Company Name?\n>> ')
    globals()["input_contact"] = input('Name of Cargill Contact/Supervisor\n>> ')

    other_option = input('Are you signing in others?[y/n]\n>> ')
    str(other_option).lower()
    others = [] 
    if(other_option == 'y'):
        while(1):
            x = input('Name of other visitor[leave blank to exit]\n>> ')
            if(len(x) != 0): 
                others.append(x)
            else:
                globals()["input_others"] = others 
                break 

    if(len(others) >= 1):
        globals()["accompanied_check"] = True
    else: 
        globals()["accompanied_check"] = False

# Displays input options for regular visitors 
def other():
    globals()["REASON"] = 'Visitor, please follow up'
    globals()["input_company"] = input('Name of Company (if visiting)\n>> ')
    globals()["input_contact"] = input('Name of Cargill Contact/Supervisor (if known)\n>> ')
    globals()["accompanied_check"] = False

    other_option = input('Are you signing in others?[y/n]\n>> ')
    str(other_option).lower()
    others = [] 
    if(other_option == 'y'):
        while(1):
            x = input('Name of other visitor[leave blank to exit]\n>> ')
            if(len(x) != 0): 
                others.append(x)
            else:
                globals()["input_others"] = others 
                break 

    if(len(others) >= 1):
        globals()["accompanied_check"] = True
    else: 
        globals()["accompanied_check"] = False

"""
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    3.  Helper Functions 
        - 1. get_db(): retrives the current databse for the current data 
        - 2. select(): provides options for the visitor to select, changes provided fields based on input 
        - 3. trans_id(): generates an ID for the transaction
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
"""

#    Retrieves current database for writing, JSON files can be converted to CSV files. 
#      Format is as follows: 
#          [1]: Parent Directory -> month_year
#          [2]: File Name -> day_month_year.json 
def get_db(): 
    date = datetime.today() 

    folder_name = str(date.month) + '_' + str(date.year)
    file_name = str(date.day)+ '_' + str(date.month) + '_' + str(date.year)
    
    directory = folder_name
    file_addr = folder_name + '/' + file_name + '.json'

    # Check if the current month's directory exists
    if not os.path.exists(directory):
            os.makedirs(directory)
    
    # Check if today's file has been created yet - if false, create it: 
    if not os.path.exists(file_addr):
        f = open(file_addr, "x") 
        
    print('Directory setup successfully!')
# Provides options for the visitor to select, changes provided fields based on input 
def select(): 
    print('Purpose of visit?\n')
    input_visit = input('(Select one)\n' +
        '[1]: Contractor \n' +
        '[2]: New Employee \n'
        '[3]: Visitor \n>> ')

    selection = int(input_visit) 
    
    match selection: 
        case 1: 
            contractor()
        case 2:
            new_employee()
        case 3: 
            other()
        case _: 
            print('Invalid option, please try again') 
            select()

# Gnerates an ID for the transaction
def trans_id(): 
    hash = random.getrandbits(32)
    return hash 

main()