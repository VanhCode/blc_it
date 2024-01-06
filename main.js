//auto connect
let publicKey;

(async () => { 
  await window.phantom.solana.connect();
  publicKey = window.phantom.solana.publicKey.toBase58();
  console.log(publicKey);
})()

//manual connect
const connectWallet = async () => {
  // Kết nối đến mạng Solana
  if (window.solana) {
    await window.phantom.solana.connect();
    publicKey = window.phantom.solana.publicKey.toBase58();
    console.log(publicKey);
  }
}
//=============== [MINT NFT] ===============
const PRIV_KEY = 'XQlZ6gfxtjNseZfV';
const toTransaction = encodedTransaction => {
  return solanaWeb3.Transaction.from(Uint8Array.from(atob(encodedTransaction), c => c.charCodeAt(0)));
}
const mintNft = async () => {
  fileInput = document.getElementById("fileInput");
  var myHeaders = new Headers();
  myHeaders.append("x-api-key", PRIV_KEY);
  var formdata = new FormData();
  formdata.append("network", "devnet");
  formdata.append("wallet", publicKey);
  formdata.append("name", "COIN-FARMING NFT");
  formdata.append("symbol", "COINF");
  formdata.append("description", "Đến đây đi mấy con gà");
  formdata.append("attributes", '[{"trait_type":"dev power","value":"over 900"}]');
  formdata.append("external_url", "https://shyft.to");
  formdata.append("max_supply", "1000000");//số lượng max nft có thể mint
  formdata.append("royalty", "5");//phí giao dịch người dùng cần trả khi giao dịch token của tôi
  formdata.append("file", fileInput.files[0], "FARMING.png");
  formdata.append("nft_receiver", "5KW2twHzRsAaiLeEx4zYNV35CV2hRrZGw7NYbwMfL4a2");
  formdata.append('service_charge', '{ "receiver": "499qpPLdqgvVeGvvNjsWi27QHpC8GPkPfuL5Cn2DtZJe", "amount": 0.01}');// thanh toán phí tạo token bằng đồng solana

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  fetch("https://api.shyft.to/sol/v1/nft/create_detach", requestOptions)
    .then(async response => {
      let res = await response.json();
      let transaction = toTransaction(res.result.encoded_transaction);
      console.log(res.result.encoded_transaction);

      const signedTransaction= await window.phantom.solana.signTransaction(transaction);
      const connection=new solanaWeb3.Connection("https://api.devnet.solana.com");
      const signature = await connection.sendRawTransaction(signedTransaction.serialize());
    })
    .catch(error => console.log('error', error));
}