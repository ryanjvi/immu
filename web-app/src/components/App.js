let web3 = new Web3(window.ethereum);
let contract;
let accounts;

async function loadNetworkAndAccountInfo() {
  let networkType = await web3.eth.net.getNetworkType();
  $('#network-info').text(`Network: ${networkType}`);

  // Replace ethereum.enable() with eth_requestAccounts
  accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  $('#account-info').text(`Account: ${accounts[0]}`);
}

async function loadContract() {
  // Load the ABI and deployed address of the contract
  let response = await fetch('/build/contracts/ImmuLedger.json');
  let contractJson = await response.json();

  let contractAbi = contractJson.abi;
  let contractAddress = contractJson.networks[5777].address; // replace with your network id

  // Create a new instance of the contract
  contract = new web3.eth.Contract(contractAbi, contractAddress);
}

async function publishResearch(e) {
  e.preventDefault();

  // Get the title and hash from the form
  let title = $('#publish-title').val();
  let hash = $('#publish-hash').val();

  // Convert the hash from a string to bytes32
  let bytes32Hash = '0x' + hash;

  // Call the publishResearch function of the contract
  await contract.methods.publishResearch(title, bytes32Hash).send({ from: accounts[0] });
}

async function lookupResearch(e) {
  e.preventDefault();

  // Get the hash from the form
  let hash = $('#lookup-hash').val();

  // Convert the hash to bytes32 format
  let bytes32Hash = web3.utils.asciiToHex(hash);

  // Call the getResearch function of the contract
  let research = await contract.methods.getResearch(bytes32Hash).call();

  // Display the research info
  $('#research-publisher').text(research.publisher);
  $('#research-timestamp').text(new Date(research.timestamp * 1000).toString());
}

async function displayAllResearch() {
  // Implement a method to get all researches from the contract
  // The method would depend on the structure and design of your contract
  // Here we assume a hypothetical getResearches method
  let allResearches = await contract.methods.getResearches().call();
  
  for (let research of allResearches) {
    // Create a new row for each research
    let row = document.createElement('tr');
    row.innerHTML = `
      <td>${research.title}</td>
      <td>${research.publisher}</td>
      <td>${new Date(research.timestamp * 1000).toString()}</td>
    `;
    // Append the row to the table
    document.getElementById('all-researches').appendChild(row);
  }
}

$(document).ready(function() {
  loadNetworkAndAccountInfo();
  loadContract();
  $('#publish-form').submit(publishResearch);
  $('#lookup-form').submit(lookupResearch);
  displayAllResearch();
});