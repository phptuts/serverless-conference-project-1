import boto3
import os

lambda_client = boto3.client('lambda')
sns_client = boto3.client('sns')
paginator = lambda_client.get_paginator('list_functions')

def run(event, context):
    violation_functions = []

    for page in paginator.paginate():
        for function_meta in page['Functions']:
            policy_violated = True
            function = lambda_client.get_function(FunctionName=function_meta['FunctionName'])
            
            for tag, value in function['Tags'].items():
                if tag == 'owner' and value != '':
                    policy_violated = False
            
            if policy_violated != False:
                violation_functions.append(function_meta['FunctionName'])

    if len(violation_functions) > 0:
        sns_client.publish(
            TopicArn = os.environ['SNS_TOPIC_ARN'],
            Message = """The following functions are found in violation of tagging requirements.
    
- {}""".format('\n- '.join(violation_functions)),
            Subject = "{} functions violating tag requirements".format(len(violation_functions))
        )