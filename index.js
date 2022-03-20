window.ethereum.enable();
    var provider = new ethers.providers.Web3Provider(
        web3.currentProvider,
        "rinkeby"
      );
  var MoodContractAddress = "0x50edeE69a2653058fFa8BEe84AB64341C5CE9fEC";
  var MoodContractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_messages",
				"type": "string"
			}
		],
		"name": "addMessages",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMessages",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
  var MoodContract
  var signer

    provider.listAccounts().then(function (accounts) {
        signer = provider.getSigner(accounts[0]);
        MoodContract = new ethers.Contract(
          MoodContractAddress,
          MoodContractABI,
          signer
        );
      });

function getRandomInt(max) {
return Math.floor(Math.random() * max);
}

async function addMessage() {
    let message = document.getElementById("messageVal").value;
    addMessagePromise = MoodContract.addMessages(message);
    await addMessagePromise;
    document.getElementById("messageVal").value = "";

}
async function getMessage() {
    console.log("Getting messages");
    getMessagesPromise = MoodContract.getMessages();
    let messages = await getMessagesPromise;
    let len = messages.length;
    let random = getRandomInt(len);
    addMessageToPage(messages[random]);
}

function addMessageToPage(message) {
    document.getElementById("messagetext").innerText = message;
}