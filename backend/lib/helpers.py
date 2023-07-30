def model_json(model):
    if model['errors'] is not None:
        return model['errors'], model['code']

    return model['data'], model['code']
