from flask import jsonify
from javalang import parse, tree
from javalang.parser import JavaSyntaxError
from code_analyzer.size import get_size_code_line
from code_analyzer.controlStructure import get_control_control_line
from code_analyzer.inheritance import check_inheritance_level

def analyze_code():
    code = """
    public class ControlStructures {

    public static void main(String[] args) {
        // If statement
        int number = 10;
        if (number > 5) {
            System.out.println("The number is greater than 5");
        } else {
            System.out.println("The number is not greater than 5");}

        // Switch statement
        String dayOfWeek = "Monday";
        switch (dayOfWeek) {
            case "Monday":
                System.out.println("Today is Monday");
                break;
            case "Tuesday":
                System.out.println("Today is Tuesday");
                break;
            case "Wednesday":
                System.out.println("Today is Wednesday");
                break;
            default:
                System.out.println("Invalid day of the week");}

        // For loop
        for (int i = 0; i < 10; i++) {
            System.out.println(i);}

        // While loop
        int j = 0;
        while (j < 10) {
            System.out.println(j);
            j++;}
    }
}
    """

    inheritance_results=[]
    inheritance_results=check_inheritance_level(code)
    print(inheritance_results)

    size_result=[]
    size_result=get_size_code_line(code)
    print(size_result)
    

    try:
        # Ensure code is a valid string
        if not isinstance(code, str):
            raise ValueError("Input code must be a string")

        tree_root = parse.parse(code)

    except JavaSyntaxError as e:
        print(e)

    result_lines = []
    inheritance = 0

    for path, node in tree_root:
        if isinstance(node, tree.Statement):
            control_value = get_control_control_line(node)
            result_lines.append(control_value)
        elif isinstance(node,tree.LocalVariableDeclaration) or isinstance(node,tree.ClassDeclaration) or isinstance(node,tree.MethodDeclaration):
            result_lines.append(0)
                        
    print(result_lines)

    line_total=0
    line_wheight=0
    line_complexity=[]

    for i in range(0,len(size_result),1):
        if(i>=len(result_lines) or i>=len(inheritance_results)):
            line_complexity.append(size_result[i])
            continue

        line_wheight=result_lines[i]+inheritance_results[i]
        line_total=size_result[i]*line_wheight
        line_complexity.append(line_total)
    
    print("=================")
    print(line_complexity)

    lines=code.split('\n')
    line_code=[]
    for line in lines:
        line_code.append(line)

    return jsonify({"lines": line_code, "complexity" :line_complexity })

def analyze_code_line():
    return 0