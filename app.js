console.log("ERC20")

let accounts = [];
let web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
console.log("web3===>", web3)

if (typeof window.ethereum !== 'undefined') {
	console.log('MetaMask is installed!');
}

console.log("isMetaMask:" + ethereum.isMetaMask)

var crowdfundingABI =[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_zhanghuan_totalSupply",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_zhanghuan_account",
				"type": "address"
			}
		],
		"name": "zhanghuan_addWithdrawableAccount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_zhanghuan_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_zhanghuan_content",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_zhanghuan_targetAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_zhanghuan_stratTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_zhanghuan_endTime",
				"type": "uint256"
			}
		],
		"name": "zhanghuan_createProject",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "zhanghuan_donor",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "zhanghuan_projectId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "zhanghuan_amount",
				"type": "uint256"
			}
		],
		"name": "zhanghuan_Donation",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "zhanghuan_title",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "zhanghuan_content",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "zhanghuan_targetAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "zhanghuan_startTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "zhanghuan_endTime",
				"type": "uint256"
			}
		],
		"name": "zhanghuan_create",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_zhanghuan_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_zhanghuan_donateamount",
				"type": "uint256"
			}
		],
		"name": "zhanghuan_donate",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_zhanghuan_amount",
				"type": "uint256"
			}
		],
		"name": "zhanghuan_mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_zhanghuan_account",
				"type": "address"
			}
		],
		"name": "zhanghuan_revokeWithdrawalPermission",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "zhanghuan_sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "zhanghuan_recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "zhanghuan_amount",
				"type": "uint256"
			}
		],
		"name": "zhanghuan_transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "zhanghuan_transferToSelf",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "zhanghuan_withdrawBalance",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "zhanghuan_projectId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "zhanghuan_amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "zhanghuan_withdrawAccount",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "zhanghuan_caller",
				"type": "address"
			}
		],
		"name": "zhanghuan_withdrawBalance",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "zhanghuan_authorizedWithdrawers",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "zhanghuan_balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "zhanghuan_balances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "zhanghuan_decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_projectid",
				"type": "uint256"
			}
		],
		"name": "zhanghuan_getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_projectId",
				"type": "uint256"
			}
		],
		"name": "zhanghuan_getProjectDetails",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "zhanghuan_owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "zhanghuan_ProjectCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "zhanghuan_Projects",
		"outputs": [
			{
				"internalType": "string",
				"name": "zhanghuan_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "zhanghuan_content",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "zhanghuan_targetAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "zhanghuan_currentAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "zhanghuan_startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "zhanghuan_endTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "zhanghuan_supportersCount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "zhanghuan_nowaddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "zhanghuan_selectProjects_list",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "zhanghuan_totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "zhanghuan_withdrawableAccounts",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const crowdfundingContractAddress = '0x3cF96bf219cFDBa1D868d35192716e13ca512cb1'
// 创建众筹合约实例  
const crowdfundingContract = new web3.eth.Contract(crowdfundingABI, crowdfundingContractAddress);
console.log('crowdfundingContract:', crowdfundingContract)

//导入账户
let zhanghuan_accounts = [];
async function getAccountBalance() {
	await web3.eth.getAccounts().then(
		function (accounts) {
			zhanghuan_accounts = accounts;
			console.log("账户列表", zhanghuan_accounts[0]);
		});
}


$(".zhanghuan_creatprojectbutton").click(function () {
	alert("creatprojectbutton")

	zhanghuan_createProject()
})


$(".enableEthereumButton").click(function () {
	zhanghuan_countandamount()
})

$(".donateEthereumButton").click(function () {
	zhanghuan_donate()
})

//创建众筹项目
async function zhanghuan_createProject() {

	await getAccountBalance();
	var thetitle = document.getElementById("zhanghuan_title").value;
	var thecontent = document.getElementById("zhanghuan_content").value;
	var thestarttime = document.getElementById("zhanghuan_starttime").value;
	var theendtime = document.getElementById("zhanghuan_endtime").value;
	var theaimamount = document.getElementById("zhanghuan_aimamount").value;
	console.log(thetitle, thecontent, thestarttime, theendtime, theaimamount);

	crowdfundingContract.methods.zhanghuan_createProject(thetitle, thecontent, theaimamount,thestarttime, theendtime)
		.send({ from: zhanghuan_accounts[0] })
		.on("transactionHash", function (hash) {
			console.log("createProject hash", hash);
		})
	var zhanghuan = "创建成功";
	document.getElementById("zhanghuan_tip").innerHTML = zhanghuan;
}

//查看众筹项目人数及金额
async function zhanghuan_countandamount() {
	_projectid1 = $('#projectid1').val();
	accounts = await ethereum.request({ method: 'eth_requestAccounts' });
	console.log('_projectid1:', _projectid1);
	alert("点击了查看按钮")
	crowdfundingContract.methods.zhanghuan_getProjectDetails(_projectid1).call({ from: zhanghuan_accounts[0] }).then(
		function (result) {
			console.log('result', result)
			$("#zhanghuan_tip2").html(result[0])
			$("#zhanghuan_tip3").html(result[1])

		}
	);
}

//捐款方法
async function zhanghuan_donate() {

	await getAccountBalance();
	_projectid2 = $('#projectid2').val();
	_donateamount = $('#donateamount').val();
	alert("点击了donate按钮")
	console.log('_projectid2:', _projectid2);
	console.log('_donateamount:', _donateamount);
	accounts = await ethereum.request({ method: 'eth_requestAccounts' });
	crowdfundingContract.methods.zhanghuan_donate(_projectid2, _donateamount).send({ from: accounts[0]}).then(
		function (result) {
			console.log('result', result)
			var zhanghuan2 = "捐款成功";
			document.getElementById("zhanghuan_tip4").innerHTML = zhanghuan2;
		}
	)
}



