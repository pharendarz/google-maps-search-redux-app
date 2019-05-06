// load provided script to browser
export const loadScript = (url) => {
    return new Promise(function(resolve, reject){
      var script = document.createElement('script');
      script.src = url;
      script.addEventListener('load', () => {
        resolve();
      });
      script.addEventListener('error', (e) => {
        reject(e);
      });
      document.body.appendChild(script);
    })
  }