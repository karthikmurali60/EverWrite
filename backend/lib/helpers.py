def model_json(model):
    if model['errors'] is not None:
        return model['errors'], 422
  
    return model['data'], 200
