from javalang import tokenizer
import javalang

def get_size_code_line(code):
    results=[]

    lines=code.split('\n')

    for line in lines:
        tokens=list(tokenizer.tokenize(line))
        count=0
        for token in tokens:
            if token.__class__.__name__=='Identifier':
                count=count+1
            if token.__class__.__name__=='Keyword':
                count=count+1
            if token.__class__.__name__=='Modifier':
                count=count+1
            if token.__class__.__name__=='BasicType':
                count=count+1
            if token.__class__.__name__=='Operator':
                count=count+1
            if token.__class__.__name__=='DecimalInteger' or token.__class__.__name__=='String':
                count=count+1 
            if token.__class__.__name__=='Thread':
                count=count+1
        # print(line,count)
        # print(line,count)
        # if count!=0:
        results.append(count)
        
    return(results)

