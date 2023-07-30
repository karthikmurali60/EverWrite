async function request(method,url,payload_data,options){
  if (options.hasOwnProperty('setErrors')){
    options.setErrors('')
  }
  let res
  try {

    const attrs = {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (method !== 'GET') {
      attrs.body = JSON.stringify(payload_data)
    }

    res = await fetch(url,attrs)
    let data = await res.json();
    // console.log('request',res,data)
    if (res.status === 200 || res.status === 201 || res.status === 204 || res.status === 202 || res.status === 203)  {
      options.success(data)
    } else {
      if (options.setErrors !== null){
        options.setErrors(data['msg'])
      }
      // console.log("-----",res,data)
    }
  } catch (err) {
    // console.log('request catch',err)
    if (err instanceof Response) {
        console.log('HTTP error detected:', err.status); // Here you can see the status.
        if (options.hasOwnProperty('setErrors')){
          options.setErrors([`generic_${err.status}`]) // Just an example. Adjust it to your needs.
        }
    } else {
      if (options.hasOwnProperty('setErrors')){
        options.setErrors([`generic_500`]) // For network errors or any other errors
      }
    }
  }
}

export function post(url,payload_data,options){
  request('POST',url,payload_data,options)
}

export function put(url,payload_data,options){
  request('PUT',url,payload_data,options)
}

export function get(url,options){
  request('GET',url,null,options)
}

export function destroy(url,payload_data,options){
  request('DELETE',url,payload_data,options)
}