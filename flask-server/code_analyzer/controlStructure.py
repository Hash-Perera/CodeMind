from javalang import parse, tree,tokenizer,parser


control_structure_values = {
    "seq":0,
    "if": 1,       
    "for": 2,      
    "while": 2,    

}


def get_control_control_line(node,nesting_level=0):

    control_structure_value = 0


    if isinstance(node, tree.IfStatement):
        control_structure_value = 1 + nesting_level

    elif isinstance(node, tree.ForStatement):
        control_structure_value = 2 + nesting_level


    elif isinstance(node, tree.WhileStatement):
        control_structure_value = 2 + nesting_level

    elif isinstance(node, tree.DoStatement):
        control_structure_value = 3 + nesting_level

    elif isinstance(node, tree.SwitchStatement):
        control_structure_value = len(node.cases) + nesting_level

    if hasattr(node, 'children'):
            for child_node in node.children:
                child_value = get_control_control_line(child_node,nesting_level+1)

                if child_value>0:
                     control_structure_value+=child_value
    

    return control_structure_value