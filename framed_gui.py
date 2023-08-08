#GUI Libraries
import tkinter as tk
from PIL import Image, ImageTk
from tkinter import ttk, StringVar, Canvas, font
import tkinter.filedialog as filedialog

#import os 
import os
#Other functional importations: 
from pathlib import Path
import tkinter.messagebox as messagebox

#Imports used for entry
from datetime import datetime
import json
import random

# Global variables tack visitor's inputs
global VISITOR_TYPE, INPUT_NAME, CHECK_IN_TIME, INPUT_COMPANY, INPUT_CONTACT, INPUT_REASON, INPUT_PHONE, TRANSACTION_ID, FILE_DIR, FOLDER_DIR, _APP_CONFIG

HEADER = ['Transaction ID', 'Time', 'Name', 'Type', 'Company', 'Contact', 'Phone', 'VISITOR_TYPE']

"""
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    1.  Helper Functions 
        - 1. get_db(): retrives the current databse for the current data 
        - 2. trans_id(): generates an ID for the transaction
        - 3. strore(): initiates a storing of the user's input, also formats the data for writing 
        - 4. append_to_json(): writes the formatted data onto the stored file

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

    globals()["FOLDER_DIR"] = directory
    globals()["FILE_DIR"] = file_addr

    # Check if the current month's directory exists
    if not os.path.exists(directory):
            os.makedirs(directory)
    
    # Check if today's file has been created yet - if false, create it: 
    if not os.path.exists(file_addr):
        f = open(file_addr, "x") 
        
    print('Directory setup successfully!')

def trans_id(): 
    hash = random.getrandbits(32)
    return hash 

# If Option == True, it'll sign in
# If Option == False, it'll sign out 
def store(option):
    if option: 
        # Create a dictionary for the current entry
        _VISITOR_ = {
            'Transaction ID': TRANSACTION_ID,
            'Status' : 'ACTIVE', 
            'Time In': str(CHECK_IN_TIME),
            'Name': INPUT_NAME,
            'Phone': INPUT_PHONE,
            'Type': VISITOR_TYPE,
            'Company': INPUT_COMPANY,
            'Contact': INPUT_CONTACT,
            'Purpose': INPUT_REASON,
            'Time Out': '',
            'Total Time': 0
        }
        append_to_json(_VISITOR_, FILE_DIR)
    else: 
        out_time = datetime.now()
        total_time = str(out_time - CHECK_IN_TIME)

        #TODO: retrieve record, append check out times 

def search_entries_by_name(name):
    with open(FILE_DIR, 'r') as json_file:
        data = json.load(json_file)

        matching_entries = []
        for entry in data:
            # Check if the entry name matches the desired name or is similar
            if entry['Name'] == name or name.lower() in entry['Name'].lower():
                matching_entries.append(entry)

        return matching_entries

# Function to append data to a JSON file
def append_to_json(data, file_path):
    # Check if the file exists
    if os.path.exists(file_path):
        try:
            with open(file_path, 'r') as json_file:
                existing_data = json.load(json_file)
        except (json.JSONDecodeError, FileNotFoundError):
            existing_data = []
    else:
        existing_data = []

    existing_data.append(data)

    with open(file_path, 'w') as json_file:
        json.dump(existing_data, json_file, indent=4)

"""
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    1. Application Frames Classes and Functions 

        - 1. SplashFrame() displays a background image while application elements load (one-time thing)
        - 2. WelcomeFrame() prompts visitors to enter their name and the type of visitor they are 
        - 3. VisitorFrame(): asks visitors for their information, allows them to check-in other fellow visitors
        - 4. ContractorFrame(): asks contractors for their informaiton, allows them to check-in other fellow visitors

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
"""
## Define Frames ##
class SplashFrame(tk.Frame):
    def __init__(self, master=None, **kwargs):
        super().__init__(master, **kwargs)
        self.master = master
        self.configure(bg="#FFFFFF")
        globals()["EXPAND"] = False

        # create a canvas to draw on
        self.canvas = tk.Canvas(self, width=1920, height=1080, highlightthickness=0, bg="#FFFFFF")
        self.canvas.pack(fill="both", expand=True)

        # load the background image
        img = Image.open("background.png")

        # resize the image to fit the frame
        img = img.resize((1920, 1080), Image.LANCZOS)

        # create a Tkinter photo image from the PIL image
        background_image = ImageTk.PhotoImage(img)

        # create a background label and add it to the canvas
        self.background_label = tk.Label(self.canvas, image=background_image)
        self.background_label.image = background_image
        self.background_label.place(x=0, y=0, relwidth=1, relheight=1)

    def update(self):
        get_db()
        self.lift()
        self.master.after(3500, self.destroy)

        #root.geometry('1980x1080')


# Welcome Frame: Wecomes users to the platform, provides authentication to the server
class WelcomeFrame(tk.Frame):
    def __init__(self, master=None, **kwargs):
        super().__init__(master, **kwargs)
        self.master = master
        self.configure(bg="#FFFFFF")

        root.geometry('1980x1080')

        status_lbl.config(text="Welcome to Cargill, please sign in!")  

        # Create and place the image
        self.image = tk.PhotoImage(file="icon.png")
        self.image_label = tk.Label(self, image=self.image, bg="#FFFFFF")
        self.image_label.pack(side=tk.TOP, padx=20, pady=20)

        # Create and place the welcome label
        welcome_lbl = tk.Label(self, text="Welcome!", font=('Helvetica', 36, 'bold'), fg="#333333", bg="#FFFFFF")
        welcome_lbl.pack(pady=(0, 30))

        # Create and place the net-id entry widget
        input_frame = tk.Frame(self, bg="#FFFFFF")
        input_frame.pack(pady=(0, 40))

        netid_label = tk.Label(input_frame, text="Name:", font=('Helvetica', 18), fg="#333333", bg="#FFFFFF")
        netid_label.grid(row=0, column=0, padx=(0, 10))

        self.netid_entry = tk.Entry(input_frame, font=('Helvetica', 18), fg="#333333", bg="#F4F4F4", highlightthickness=0, borderwidth=0)
        self.netid_entry.grid(row=0, column=1, padx=(0, 10), ipadx=10, ipady=10, sticky="ew")

        dropdown_label = tk.Label(input_frame, text="I am a..", font=('Helvetica', 18), fg="#333333", bg="#FFFFFF")
        dropdown_label.grid(row=1, column=0, padx=(0, 20))

        self.t_e_dropdown = ttk.Combobox(input_frame, state="readonly", values=["Visitor", "Contractor [Performing Work]", "New Employee [Orientation]"])
#        self.t_e_dropdown.pack(ipadx=20, ipady=10)

#        self.stuid_entry = tk.Entry(input_frame, font=('Helvetica', 18), fg="#333333", bg="#F4F4F4", highlightthickness=0, borderwidth=0, show='*')
        self.t_e_dropdown.grid(row=1, column=1, pady=(20, 0), ipadx=10, ipady=10, sticky="ew")

        # Create and place the radio buttons
        sign_frame = tk.Frame(self, bg="#FFFFFF")
        sign_frame.pack(pady=(10, 20))

        self.sign_option = tk.StringVar(value="Sign In")

        sign_in_radio = ttk.Radiobutton(sign_frame, text="Sign In", variable=self.sign_option, value="Sign In", style='RadioButton.TRadiobutton')
        sign_in_radio.pack(side=tk.LEFT, padx=(0, 10))

        sign_out_radio = ttk.Radiobutton(sign_frame, text="Sign Out", variable=self.sign_option, value="Sign Out", style='RadioButton.TRadiobutton')
        sign_out_radio.pack(side=tk.LEFT)

        # Create and place the submit button widget
        submit_button_style = ttk.Style()
        submit_button_style.configure('SubmitButton.TButton', font=('Helvetica', 18, 'bold'), background="#333333", foreground="#FFFFFF")
        self.submit_button = ttk.Button(self, text="Submit", style='SubmitButton.TButton', command=self.show_next_frame)
        self.submit_button.pack(pady=(20, 10), ipadx=20, ipady=10)

        # Center the widgets
        self.pack(fill="both", expand=True)
        
        # Set window size to fit all elements
        self.master.update()
        self.master.geometry(f"{self.master.winfo_width()}x{self.master.winfo_height()}")

    def reset_values(self):
        self.netid_entry.delete(0, tk.END)  # Clear the input text
        self.t_e_dropdown.set("")  # Clear the selected option
        self.sign_option = tk.StringVar(value="Sign In")

    # Launches next frame if all resources have loaded, and if user is authenticated 
    def show_next_frame(self):
        globals()["CHECK_IN_TIME"] = datetime.now()
        globals()["TRANSACTION_ID"] = trans_id() 
        _name = self.netid_entry.get()
        _selection = self.t_e_dropdown.get()
        _option = self.sign_option.get()


        # globals()["INPUT_NAME"] = self.netid_entry.get()

        if not _name or not _selection or not _option: 
            messagebox.showwarning("Warning", "Please enter a name and select a visitor type (drop down box).")
            return

        else:
            if _option == 'Sign In':
                globals()["INPUT_NAME"] = _name
                status_lbl.config(text="A few more things..")  

                if _selection == "Visitor":
                    globals()["VISITOR_TYPE"] = 'Visitor'
                
                    self.training_frame = VisitorFrame(self.master)
                    self.training_frame.pack()
                    self.destroy()

                elif _selection == "Contractor [Performing Work]":
                    globals()["VISITOR_TYPE"] = 'Contractor'
                    self.training_frame = ContractorFrame(self.master)
                    self.training_frame.pack()
                    self.destroy()
                
                elif _selection == "New Employee [Orientation]":
                    globals()["VISITOR_TYPE"] = 'New Employee'
                    globals()["INPUT_REASON"] = 'Orientation'
                    globals()["INPUT_COMPANY"] = ''
                    globals()["INPUT_PHONE"] = ''
                    self.training_frame = EmployeeFrame(self.master)
                    self.training_frame.pack()
                    self.destroy()
            else: 
                messagebox.showwarning("Notice", "Signed out, have a nice day!")
                self.reset_values()
                return
        # Destroy the window
        #self.master.destroy()

class VisitorFrame(tk.Frame):
    def __init__(self, master: tk.Tk, **kwargs: dict):
        super().__init__(master, **kwargs)
        self.master = master
        self.configure(bg="#FFFFFF")

        # Create and place the welcome label
        greeting_lbl = tk.Label(self, text="Hi, {}".format(INPUT_NAME), font=('Helvetica', 36, 'bold'), fg="#333333", bg="#FFFFFF")
        greeting_lbl.pack(pady=(20, 20))

        # Create and place the net-id entry widget
        input_frame = tk.Frame(self, bg="#FFFFFF")
        input_frame.pack(pady=(0, 40))

        phone_label = tk.Label(input_frame, text="Phone Number:", font=('Helvetica', 18), fg="#333333", bg="#FFFFFF")
        phone_label.grid(row=0, column=1, padx=(0, 10), pady=(10, 10))

        self.phone_entry = tk.Entry(input_frame, font=('Helvetica', 18), fg="#333333", bg="#F4F4F4", highlightthickness=0, borderwidth=0)
        self.phone_entry.grid(row=1, column=1, padx=(0, 10), pady=(10, 20), ipadx=10, ipady=10, sticky="ew")

        company_label = tk.Label(input_frame, text="Name of Company [If Known]:", font=('Helvetica', 18), fg="#333333", bg="#FFFFFF")
        company_label.grid(row=2, column=1, padx=(0, 10), pady=(10, 10))

        self.company_entry = tk.Entry(input_frame, font=('Helvetica', 18), fg="#333333", bg="#F4F4F4", highlightthickness=0, borderwidth=0)
        self.company_entry.grid(row=3, column=1, padx=(0, 10), pady=(10, 20), ipadx=10, ipady=10, sticky="ew")

        contact_label = tk.Label(input_frame, text="Name of Cargill Contact [If Known]:", font=('Helvetica', 18), fg="#333333", bg="#FFFFFF")
        contact_label.grid(row=4, column=1, padx=(0, 10), pady=(20, 10))

        self.contact_entry = tk.Entry(input_frame, font=('Helvetica', 18), fg="#333333", bg="#F4F4F4", highlightthickness=0, borderwidth=0)
        self.contact_entry.grid(row=5, column=1, padx=(10, 10), pady=(10, 20), ipadx=10, ipady=10, sticky="ew")

        visit_label = tk.Label(input_frame, text="Purpose of Visit:", font=('Helvetica', 18), fg="#333333", bg="#FFFFFF")
        visit_label.grid(row=6, column=1, padx=(0, 10), pady=(20, 10))

        self.visit_entry = tk.Entry(input_frame, font=('Helvetica', 18), fg="#333333", bg="#F4F4F4", highlightthickness=0, borderwidth=0)
        self.visit_entry.grid(row=7, column=1, padx=(0, 10), pady=(10, 20),ipadx=10, ipady=10, sticky="ew")

        # Create and place the submit button widget
        submit_button_style = ttk.Style()
        submit_button_style.configure('SubmitButton.TButton', font=('Helvetica', 18, 'bold'), background="#333333", foreground="#FFFFFF")
        self.submit_button = ttk.Button(self, text="Submit", style='SubmitButton.TButton', command=self.show_next_frame)
        self.submit_button.pack(pady=(20, 10), ipadx=20, ipady=10)


        # Center the widgets
        self.pack(fill="both", expand=True)

        # Set window size to fit all elements
        self.master.update()
        self.master.geometry(f"{self.master.winfo_width()}x{self.master.winfo_height()}")


    def show_next_frame(self):
        _phone = self.phone_entry.get() 
        _company = self.company_entry.get() 
        _contact = self.contact_entry.get() 
        _visit = self.visit_entry.get() 

        if not _phone or not _company or not _contact or not _visit: 
            messagebox.showwarning("Warning", "Please enter a name and select a visitor type (drop down box).")
            return
        
        else:
            globals()["INPUT_PHONE"] = _phone
            globals()["INPUT_COMPANY"] = _company
            globals()["INPUT_CONTACT"] = _contact
            globals()["INPUT_REASON"] = _visit

            store(True)

            self.welcome_frame = WelcomeFrame(self.master)
            self.welcome_frame.pack()
            self.destroy()

class ContractorFrame(tk.Frame):
    def __init__(self, master: tk.Tk, **kwargs: dict):
        super().__init__(master, **kwargs)
        self.master = master
        self.configure(bg="#FFFFFF")

        # Create and place the welcome label
        greeting_lbl = tk.Label(self, text="Hi, {}".format(INPUT_NAME), font=('Helvetica', 36, 'bold'), fg="#333333", bg="#FFFFFF")
        greeting_lbl.pack(pady=(20, 20))

        # Create and place the net-id entry widget
        input_frame = tk.Frame(self, bg="#FFFFFF")
        input_frame.pack(pady=(0, 40))

        phone_label = tk.Label(input_frame, text="Phone Number:", font=('Helvetica', 18), fg="#333333", bg="#FFFFFF")
        phone_label.grid(row=0, column=1, padx=(0, 10), pady=(10, 10))

        self.phone_entry = tk.Entry(input_frame, font=('Helvetica', 18), fg="#333333", bg="#F4F4F4", highlightthickness=0, borderwidth=0)
        self.phone_entry.grid(row=1, column=1, padx=(0, 10), pady=(10, 20), ipadx=10, ipady=10, sticky="ew")

        company_label = tk.Label(input_frame, text="Name of Company:", font=('Helvetica', 18), fg="#333333", bg="#FFFFFF")
        company_label.grid(row=2, column=1, padx=(0, 10), pady=(10, 10))

        self.company_entry = tk.Entry(input_frame, font=('Helvetica', 18), fg="#333333", bg="#F4F4F4", highlightthickness=0, borderwidth=0)
        self.company_entry.grid(row=3, column=1, padx=(0, 10), pady=(10, 20), ipadx=10, ipady=10, sticky="ew")

        contact_label = tk.Label(input_frame, text="Name of Cargill Contact:", font=('Helvetica', 18), fg="#333333", bg="#FFFFFF")
        contact_label.grid(row=4, column=1, padx=(0, 10), pady=(20, 10))

        self.contact_entry = tk.Entry(input_frame, font=('Helvetica', 18), fg="#333333", bg="#F4F4F4", highlightthickness=0, borderwidth=0)
        self.contact_entry.grid(row=5, column=1, padx=(10, 10), pady=(10, 20), ipadx=10, ipady=10, sticky="ew")

        visit_label = tk.Label(input_frame, text="Project/Work Area", font=('Helvetica', 18), fg="#333333", bg="#FFFFFF")
        visit_label.grid(row=6, column=1, padx=(0, 10), pady=(20, 10))

        self.visit_entry = tk.Entry(input_frame, font=('Helvetica', 18), fg="#333333", bg="#F4F4F4", highlightthickness=0, borderwidth=0)
        self.visit_entry.grid(row=7, column=1, padx=(0, 10), pady=(10, 20),ipadx=10, ipady=10, sticky="ew")

        # Create and place the submit button widget
        submit_button_style = ttk.Style()
        submit_button_style.configure('SubmitButton.TButton', font=('Helvetica', 18, 'bold'), background="#333333", foreground="#FFFFFF")
        self.submit_button = ttk.Button(self, text="Submit", style='SubmitButton.TButton', command=self.show_next_frame)
        self.submit_button.pack(pady=(20, 10), ipadx=20, ipady=10)


        # Center the widgets
        self.pack(fill="both", expand=True)

        # Set window size to fit all elements
        self.master.update()
        self.master.geometry(f"{self.master.winfo_width()}x{self.master.winfo_height()}")

    def show_next_frame(self):
        _phone = self.phone_entry.get() 
        _company = self.company_entry.get() 
        _contact = self.contact_entry.get() 
        _visit = self.visit_entry.get() 

        if not _phone or not _visit or not _contact or not _visit: 
            messagebox.showwarning("Warning", "Please enter at least a phone number and visit purpose.")
            return
        
        else:
            globals()["INPUT_PHONE"] = _phone
            globals()["INPUT_COMPANY"] = _company
            globals()["INPUT_CONTACT"] = _contact
            globals()["INPUT_REASON"] = _visit

            store(True)

            self.welcome_frame = WelcomeFrame(self.master)

            self.welcome_frame.pack()
            self.destroy()


class UserFrame(tk.Frame):
    def __init__(self, master: tk.Tk, **kwargs: dict):
        super().__init__(master, **kwargs)
        self.master = master
        self.configure(bg="#FFFFFF")

        # Create and place the welcome label
        greeting_lbl = tk.Label(self, text="Hi, {}".format(INPUT_NAME), font=('Helvetica', 36, 'bold'), fg="#333333", bg="#FFFFFF")
        greeting_lbl.pack(pady=(20, 20))

        # Create and place the net-id entry widget
        input_frame = tk.Frame(self, bg="#FFFFFF")
        input_frame.pack(pady=(0, 40))

        contact_label = tk.Label(input_frame, text="Name of Cargill Supervisor [If Known]:", font=('Helvetica', 18), fg="#333333", bg="#FFFFFF")
        contact_label.grid(row=2, column=1, padx=(0, 10), pady=(20, 10))

        self.contact_entry = tk.Entry(input_frame, font=('Helvetica', 18), fg="#333333", bg="#F4F4F4", highlightthickness=0, borderwidth=0)
        self.contact_entry.grid(row=3, column=1, padx=(10, 10), pady=(10, 20), ipadx=10, ipady=10, sticky="ew")

        # Create and place the submit button widget
        submit_button_style = ttk.Style()
        submit_button_style.configure('SubmitButton.TButton', font=('Helvetica', 18, 'bold'), background="#333333", foreground="#FFFFFF")
        self.submit_button = ttk.Button(self, text="Submit", style='SubmitButton.TButton', command=self.show_next_frame)
        self.submit_button.pack(pady=(20, 10), ipadx=20, ipady=10)


        # Center the widgets
        self.pack(fill="both", expand=True)

        # Set window size to fit all elements
        self.master.update()
        self.master.geometry(f"{self.master.winfo_width()}x{self.master.winfo_height()}")

    def show_next_frame(self):
        _contact = self.contact_entry.get()

        if _contact: 
            globals()["INPUT_CONTACT"] = _contact
#        globals()["TRANSACTION_ID"] = trans_id() 
        else: 
            globals()["INPUT_CONTACT"] = ''

        store(True)
        # Relaunch Application     
        self.welcome_frame = WelcomeFrame(self.master)
        self.welcome_frame.pack()
        self.destroy()

class EmployeeFrame(tk.Frame):
    def __init__(self, master: tk.Tk, **kwargs: dict):
        super().__init__(master, **kwargs)
        self.master = master
        self.configure(bg="#FFFFFF")

        # Create and place the welcome label
        greeting_lbl = tk.Label(self, text="Hi, {}".format(INPUT_NAME), font=('Helvetica', 36, 'bold'), fg="#333333", bg="#FFFFFF")
        greeting_lbl.pack(pady=(20, 20))

        # Create and place the net-id entry widget
        input_frame = tk.Frame(self, bg="#FFFFFF")
        input_frame.pack(pady=(0, 40))

        contact_label = tk.Label(input_frame, text="Name of Cargill Supervisor [If Known]:", font=('Helvetica', 18), fg="#333333", bg="#FFFFFF")
        contact_label.grid(row=2, column=1, padx=(0, 10), pady=(20, 10))

        self.contact_entry = tk.Entry(input_frame, font=('Helvetica', 18), fg="#333333", bg="#F4F4F4", highlightthickness=0, borderwidth=0)
        self.contact_entry.grid(row=3, column=1, padx=(10, 10), pady=(10, 20), ipadx=10, ipady=10, sticky="ew")

        # Create and place the submit button widget
        submit_button_style = ttk.Style()
        submit_button_style.configure('SubmitButton.TButton', font=('Helvetica', 18, 'bold'), background="#333333", foreground="#FFFFFF")
        self.submit_button = ttk.Button(self, text="Submit", style='SubmitButton.TButton', command=self.show_next_frame)
        self.submit_button.pack(pady=(20, 10), ipadx=20, ipady=10)


        # Center the widgets
        self.pack(fill="both", expand=True)

        # Set window size to fit all elements
        self.master.update()
        self.master.geometry(f"{self.master.winfo_width()}x{self.master.winfo_height()}")

    def show_next_frame(self):
        _contact = self.contact_entry.get()

        if _contact: 
            globals()["INPUT_CONTACT"] = _contact
#        globals()["TRANSACTION_ID"] = trans_id() 
        else: 
            globals()["INPUT_CONTACT"] = ''

        store(True)
        # Relaunch Application     
        self.welcome_frame = WelcomeFrame(self.master)
        self.welcome_frame.pack()
        self.destroy()


if __name__ == "__main__":
        
    root = tk.Tk()
    root.geometry('1920x1080')
    root['background'] = '#FFFFFF'
 
    # Load the new icon
    icon = tk.PhotoImage(file='p_icon.ico')
    # Set the new icon
    root.iconphoto(True, icon)

    #start splash screen
    splash = SplashFrame(root)
    splash.pack(fill="both", expand=True)
    splash.update()

    root.title("Cargill Visitor Check-in")

    # label for root window
    title_lbl = tk.Label(root, text="Schuyler Visitor Check-In", font='Arial 26 bold', bg='#658D1B', fg='#FFFFFF', bd=10)
    title_lbl.pack(side=tk.TOP, fill=tk.X, pady=0)

    # create a status bar label widget
    status_lbl = tk.Label(root, text="Welcome to Cargill, please sign-in!", font=('Helvetica', 16, 'bold'), bg='#F1BE48', fg='#C8102E', bd=4, relief=tk.SUNKEN, anchor=tk.W)
    status_lbl.pack(side=tk.BOTTOM, fill=tk.X)

    # display the WelcomeFrame
    welcome_frame = WelcomeFrame(root)
    welcome_frame.pack()

    root.mainloop()