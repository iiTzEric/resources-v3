# ============================================
#  PYTHON FILE HANDLING
#
#  Reading, writing and working with files.
#  Comes up in data processing, automation
#  and backend development constantly.
# ============================================


# ── READING FILES ───────────────────────────

# Always use 'with' — automatically closes file
with open('data.txt', 'r') as f:
    content = f.read()        # read entire file as string

with open('data.txt', 'r') as f:
    lines = f.readlines()     # read as list of lines (with \n)

with open('data.txt', 'r') as f:
    line = f.readline()       # read one line at a time

# Loop line by line — memory efficient for large files
with open('data.txt', 'r') as f:
    for line in f:
        print(line.strip())   # strip removes \n

# Read with encoding — always specify for non-ASCII
with open('data.txt', 'r', encoding='utf-8') as f:
    content = f.read()


# ── WRITING FILES ────────────────────────────

# Write — creates file if not exists, OVERWRITES if exists
with open('output.txt', 'w') as f:
    f.write('Hello World\n')
    f.write('Second line\n')

# Write multiple lines at once
lines = ['line 1\n', 'line 2\n', 'line 3\n']
with open('output.txt', 'w') as f:
    f.writelines(lines)

# Append — adds to end, does not overwrite
with open('log.txt', 'a') as f:
    f.write('New log entry\n')

# File modes
# 'r'  — read (default)
# 'w'  — write (overwrites)
# 'a'  — append
# 'x'  — create (fails if exists)
# 'r+' — read and write
# 'rb' — read binary
# 'wb' — write binary


# ── JSON FILES ──────────────────────────────

import json

# Read JSON file
with open('data.json', 'r') as f:
    data = json.load(f)         # parse JSON file → dict

# Write JSON file
data = {'name': 'John', 'age': 25, 'skills': ['React', 'Python']}
with open('data.json', 'w') as f:
    json.dump(data, f, indent=2)  # indent for pretty print

# JSON string ↔ dict
json_string = json.dumps(data)           # dict → string
data = json.loads(json_string)           # string → dict

# Pretty print JSON
print(json.dumps(data, indent=2))

# Handle non-serializable types
from datetime import datetime

def serialize(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError(f'Not serializable: {type(obj)}')

json.dumps({'date': datetime.now()}, default=serialize)


# ── CSV FILES ────────────────────────────────

import csv

# Read CSV
with open('data.csv', 'r') as f:
    reader = csv.reader(f)
    header = next(reader)          # skip header row
    for row in reader:
        print(row)                 # row is a list

# Read CSV as dict — keys are column headers
with open('data.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row['name'], row['age'])  # access by column name

# Write CSV
data = [
    ['name', 'age', 'city'],
    ['John', 25, 'Nairobi'],
    ['Jane', 30, 'Lagos'],
]

with open('output.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerows(data)

# Write CSV from dicts
users = [
    {'name': 'John', 'age': 25},
    {'name': 'Jane', 'age': 30},
]

with open('output.csv', 'w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['name', 'age'])
    writer.writeheader()
    writer.writerows(users)


# ── PATH OPERATIONS ─────────────────────────

import os
from pathlib import Path  # modern way — prefer this

# Current directory
os.getcwd()
Path.cwd()

# Join paths safely
os.path.join('folder', 'subfolder', 'file.txt')
Path('folder') / 'subfolder' / 'file.txt'  # cleaner

# Check existence
os.path.exists('file.txt')
Path('file.txt').exists()

# Check type
os.path.isfile('file.txt')
os.path.isdir('folder')
Path('file.txt').is_file()
Path('folder').is_dir()

# Get file info
os.path.getsize('file.txt')       # size in bytes
Path('file.txt').stat().st_size   # same

# Get parts of path
path = Path('/home/user/documents/report.pdf')
path.name        # 'report.pdf'
path.stem        # 'report'
path.suffix      # '.pdf'
path.parent      # Path('/home/user/documents')
path.parts       # ('/', 'home', 'user', 'documents', 'report.pdf')

# List directory
os.listdir('.')                    # list of filenames
list(Path('.').iterdir())          # list of Path objects

# List with pattern
list(Path('.').glob('*.py'))       # all .py files
list(Path('.').glob('**/*.py'))    # recursive


# ── DIRECTORY OPERATIONS ────────────────────

import os
from pathlib import Path

# Create directory
os.mkdir('new_folder')             # fails if exists
os.makedirs('a/b/c')              # creates all intermediate
Path('new_folder').mkdir()
Path('a/b/c').mkdir(parents=True, exist_ok=True)  # best

# Delete
os.remove('file.txt')             # delete file
os.rmdir('empty_folder')          # delete empty dir

import shutil
shutil.rmtree('folder')           # delete folder and contents

# Rename / move
os.rename('old.txt', 'new.txt')
shutil.move('file.txt', 'folder/file.txt')

# Copy
shutil.copy('file.txt', 'copy.txt')          # copy file
shutil.copytree('folder', 'folder_copy')      # copy directory


# ── ENVIRONMENT VARIABLES ───────────────────

import os
from dotenv import load_dotenv    # pip install python-dotenv

# Load .env file
load_dotenv()

# Access environment variables
db_url = os.environ.get('DATABASE_URL')
port = int(os.environ.get('PORT', 5000))  # with default

# Check if exists
if 'API_KEY' not in os.environ:
    raise ValueError('API_KEY not set')

# Set environment variable (current process only)
os.environ['MY_VAR'] = 'value'


# ── WORKING WITH LARGE FILES ─────────────────

# Process large file line by line — don't load all into memory
def process_large_file(filepath):
    with open(filepath, 'r') as f:
        for line in f:              # reads one line at a time
            process(line.strip())

# Read in chunks
def read_in_chunks(filepath, chunk_size=1024):
    with open(filepath, 'rb') as f:
        while True:
            chunk = f.read(chunk_size)
            if not chunk:
                break
            yield chunk

# Generator for CSV processing
def read_csv_lazy(filepath):
    with open(filepath, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            yield row               # one row at a time


# ── USEFUL PATTERNS ─────────────────────────

# Safe file read — return None if not found
def safe_read(filepath):
    try:
        with open(filepath, 'r') as f:
            return f.read()
    except FileNotFoundError:
        return None

# Read JSON with default
def read_json(filepath, default=None):
    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return default

# Write JSON safely
def write_json(filepath, data):
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)

# Append to JSON array
def append_to_json(filepath, item):
    data = read_json(filepath, default=[])
    data.append(item)
    write_json(filepath, data)

# Count lines in file
def count_lines(filepath):
    with open(filepath, 'r') as f:
        return sum(1 for _ in f)

# Search file for pattern
import re

def search_file(filepath, pattern):
    matches = []
    with open(filepath, 'r') as f:
        for i, line in enumerate(f, 1):
            if re.search(pattern, line):
                matches.append((i, line.strip()))
    return matches

# Backup file before modifying
import shutil
from datetime import datetime

def backup_file(filepath):
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup = f'{filepath}.{timestamp}.bak'
    shutil.copy(filepath, backup)
    return backup

# Walk directory tree
def find_files(directory, extension):
    found = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(extension):
                found.append(os.path.join(root, file))
    return found

find_files('.', '.py')    # all Python files

# Get file size in human readable format
def human_size(bytes):
    for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
        if bytes < 1024:
            return f'{bytes:.1f} {unit}'
        bytes /= 1024

human_size(1024)        # '1.0 KB'
human_size(1048576)     # '1.0 MB'


# ── INTERVIEW QUESTIONS ─────────────────────

'''
Q: What is the difference between read() readlines() readline()?

   read()      — reads entire file as one string
   readlines() — reads all lines into a list
   readline()  — reads one line at a time

   Use read() for small files
   Use readline() or iteration for large files
   Iteration (for line in f) is most memory efficient
'''

'''
Q: Why should you use 'with' when opening files?

   'with' uses a context manager that automatically
   calls file.close() when the block exits — even
   if an exception occurs.

   Without 'with':
   f = open('file.txt')
   data = f.read()
   f.close()  # might not run if error occurs

   With 'with':
   with open('file.txt') as f:
       data = f.read()
   # file always closed — even if error
'''

'''
Q: What is the difference between 'w' and 'a' mode?

   'w' — write mode — creates file if not exists
         OVERWRITES existing content

   'a' — append mode — creates file if not exists
         ADDS to end of existing content

   Use 'w' to start fresh
   Use 'a' for log files, adding records
'''

'''
Q: How do you handle file encoding issues?

   Always specify encoding='utf-8' explicitly.
   Default encoding varies by OS — causes bugs.

   with open('file.txt', 'r', encoding='utf-8') as f:
       data = f.read()

   For files with unknown encoding use:
   with open('file.txt', 'r', encoding='utf-8',
             errors='ignore') as f:
       data = f.read()
'''