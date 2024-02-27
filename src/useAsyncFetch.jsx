import React, {useEffect} from 'react';

const useAsyncFetch = function (url, data, thenFun, catchFun) {
  console.log("in useAsyncFetch");

  // the usual function that does a fetch
  async function fetchData() {
    try{
    // Send request to origin server at appropriate endpoint
    console.log(url);
    let params = {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data) 
    };
      
    let response = await fetch(url, params);
    console.log(response)
    // Wait for origin server to send back JSON object
    let json = await response.json();

    // Sanity check the contents of the JSON
    console.log(json);
    thenFun(json);
      
    } catch (err){
      catchFun(err);
    }
  }

  // The effect hook is a function called when the component is created or updated.
  // In this case, "the component" refers to the componet using 
  // this useFetch hook.
  // Because we give it a second argument of [] (meaning "update when the variables in this empty list change"),
  // this particular effect hook will get run only after the componet is created, not when it is updated.
  // In particular, when the calling component is re-rendered its state variables change,
  // this effect does not get called again. 
  useEffect(function () {
    try{
    console.log("Calling fetch");
    fetchData();
    } catch (err){
      catchFun(err);
    }
  }, []);

}

export default useAsyncFetch;