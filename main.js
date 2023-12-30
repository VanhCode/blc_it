// const APIgame='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJmZWVjNWQyNy1kMjQwLTQyNmEtYWFjYi05ZDQ5YjQyNWM5YjMiLCJzdWIiOiI2ZjY3ODI2MC1iMzI5LTQ0N2QtODg1My1jNzFjYzkzZDllYTciLCJpYXQiOjE3MDM5MTAzMDF9.iBmw0UBaGNyPd45YcqMT75UW2rpt794mElujgpXISLA';

// let params={
//   page: 1,
//   perPage:50
// }
// const options = {
//   method: 'GET',
//    headers: {
//     'accept': 'application/json',
//     'x-api-key':APIgame
//   },
// };
// params=Object.keys(params).map(k=>`${k}=${params[k]}`).join('&')
// console.log(params);
// fetch('https://api.gameshift.dev/assets?'+params, options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

connect()
function connect(){
  window.phantom.solana.connect();
}