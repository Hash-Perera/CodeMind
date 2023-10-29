import re

def is_valid_java_code(code):
   
    pattern = re.compile(r'\b(public|private|protected)?\s+\b(class|interface|enum|void|static|final|abstract|synchronized)\s+\w+.*\{')
    
   
    match = pattern.search(code)
    
    return match is not None;