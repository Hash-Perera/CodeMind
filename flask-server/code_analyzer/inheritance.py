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

#   try:

#     # Tokenize the Java code.
#     # tokens = javalang.tokenizer.tokenize(code)
#     tokens= tokenizer.tokenize(code)

#     # Parse the Java code.
#     # tree = parse.Parser(tokens=tokens).parse()
#     tree_root=parse.parse(tokens)

#     # Get the root node of the parse tree.
#     # root = tree.children[0]
#   except JavaSyntaxError as e:
#         print("Error: ",e)


#   # Iterate over the children of the root node and find the class declaration nodes.
#   class_declaration_nodes = []
#   for child in tree_root:
#     if isinstance(child, tree.ClassDeclaration):
#       class_declaration_nodes.append(child)

#   # Create a dictionary to store the inheritance level of each class.
#   inheritance_levels = {}
#   for class_declaration_node in class_declaration_nodes:
#     inheritance_level = 0
#     parent_class_node = class_declaration_node.extends
#     while parent_class_node is not None:
#       inheritance_level += 1
#       parent_class_node = parent_class_node.extends

#     inheritance_levels[class_declaration_node] = inheritance_level

#   # Iterate over the children of the root node and list the inheritance level of the class in front of the methods and code lines in the class.
#   output = []
#   for child in tree_root.children:
#     if isinstance(child, javalang.ast.ClassDeclaration):
#       inheritance_level = inheritance_levels[child]

#       # List the inheritance level of the class in front of the methods and code lines in the class.
#       for method_or_code_line in child.body:
#         if isinstance(method_or_code_line, javalang.ast.MethodDeclaration):
#           output.append([inheritance_level, method_or_code_line])
#         elif isinstance(method_or_code_line, javalang.ast.Statement):
#           output.append([inheritance_level, "\t" + method_or_code_line.source()])

#   # Repeat the inheritance level of the class for each line of code in the class.
#   for i in range(len(output)):
#     inheritance_level = output[i][0]
#     for j in range(len(output[i]) - 1):
#       output[i].append(inheritance_level)

