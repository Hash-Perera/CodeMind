# code_analyzer/analyzer.py
#AKITH
import re

def count_operators(text):
    operator_regex = r'[+\-*/%^=<>!&|]'
    operators = re.findall(operator_regex, text)
    return len(operators)

def count_operands(text):
    operand_regex = r'\b\d+(\.\d+)?\b'
    operands = re.findall(operand_regex, text)
    return len(operands)

def count_functions(text):
    function_regex = r'\b\w+\s+\w+\s*\([^)]*\)\s*\{'
    functions = re.findall(function_regex, text)
    return len(functions)

def count_strings(text):
    string_regex = r'(\'[^\']*\'|"[^"]*")'
    strings = re.findall(string_regex, text)
    return len(strings)

def analyze_code_line(line):
    operators = count_operators(line)
    operands = count_operands(line)
    functions = count_functions(line)
    strings = count_strings(line)

    line_size=operators+operands+functions+strings


    return line_size
