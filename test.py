#main.py (OOP style)

#import widgets as ctk #custom tk
import tkinter as tk

class Main(tk.Tk):
    def __init__(self):
        tk.Tk.__init__(self)
        
        self.title("Formatted Entry")

        self.grid_columnconfigure(2, weight=1)

        #create labels
        self.labels = ['time', 'date', 'phone', 'phone2']
        for n, label in enumerate(self.labels):
            tk.Label(self, text=f'{label}: ', width=14, font='consolas 12 bold', anchor='w').grid(row=n, column=0, sticky='w')

        #create entries
        self.entries = []
        for n, format in enumerate([ctk.TimeFormat, ctk.DateFormat, ctk.PhoneFormat, ctk.PhoneFormat2]):
            self.entries.append(ctk.FormEntry(self, format, width=14, font='consolas 12 bold'))
            self.entries[-1].grid(row=n, column=1, sticky='w')
        
        #form submit button        
        tk.Button(self, text='submit', command=self.submit).grid(column=1, sticky='e')
            
    def submit(self):
        for l, e in zip(self.labels, self.entries):
            print(f'{l}: {e.input}')
        


Main().mainloop() if __name__ == "__main__" else None