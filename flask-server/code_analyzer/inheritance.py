import re

def check_inheritance_level(code):
    extend_pattern=r'\bextends\b'
    matches=re.findall(extend_pattern,code)
    lines=code.split('\n')
    results=[]
    if matches:
        for i in range(1,len(lines)-3,1):
            results.append(2)
    else:
        for i in range(1,len(lines)-3,1):
            results.append(1)
    
    return results


