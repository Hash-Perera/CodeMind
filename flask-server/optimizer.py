import openai



def optimize_code(code):
    # openai.api_key="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"

    response=openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        message=[
            {"role":"user","content":"Make the following code cognitivly less complex,{code}"}
        ]
    )

    print(response)

    assistant_response=response['choices'][0]['message']['content']
    print(assistant_response)
    return assistant_response