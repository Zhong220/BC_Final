window.onload = async function () {
  this.buttonRaining = true;
  this.currentRainingEth = 0;
  this.rainObject = {};
  this.counterObject = {};
  this.counterBGObject = {};
  this.walletInfo = {};

  bindUI();

  const useEth = false; // 改為讀取 SIM 代幣

  // 手機就結束
  if (settings.isMobile) {
    document.getElementById('metamask-prompt').textContent = 'Visit this page on your desktop browser for Metamask support.';
    document.getElementById('metamask-prompt').style.display = 'block';
    return;
  }

  // 建立 web3
  let web3;
  let web3Provider;
  if (window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    web3Provider = window.ethereum;
    this.walletInfo.provider = 'Metamask';
    web3 = new Web3(web3Provider);
  } else {
    web3Provider = new Web3.providers.HttpProvider('http://localhost:9545');
    this.walletInfo.provider = 'HttpProvider';
    web3 = new Web3(web3Provider);
  }

  const accounts = await web3.eth.getAccounts();
  this.walletInfo.accountID = accounts[0];

  // 顯示 ETH 或 SIM
  if (useEth) {
    const balanceWei = await web3.eth.getBalance(this.walletInfo.accountID);
    const ethBal = web3.utils.fromWei(balanceWei, 'ether');
    this.walletInfo.ETHBalance = ethBal + ' ETH';
    this.rainObject.data.maxDrops = parseFloat(ethBal);
    displayWallet();
  } else {
    const response = await fetch("build/contracts/SimpleToken.json");
    const data = await response.json();
    const SimpleToken = TruffleContract(data);
    SimpleToken.setProvider(web3Provider);
    const instance = await SimpleToken.deployed();
    const result = await instance.balanceOf(this.walletInfo.accountID);
    const simBal = web3.utils.fromWei(result.toString(), 'ether');
    this.walletInfo.SIMBalance = simBal + ' SIM';
    this.rainObject.data.maxDrops = parseFloat(simBal);
    displayWallet();
  }
};

function bindUI() {
  document.getElementById('rainbutton').onclick = function () {
    makeItRain();
  };

  const i = document.querySelector('iframe');
  this.rainObject = i.contentWindow.document.body.querySelector('a-scene[rain]').components.rain;
  this.counterBGObject = i.contentWindow.document.body.querySelector('#counter-bg');
  this.counterObject = i.contentWindow.document.body.querySelector('#counter');
}

function makeItRain() {
  const rain = this.rainObject;
  rain.data.isRaining = this.buttonRaining;
  this.counterBGObject.setAttribute('visible', this.buttonRaining);

  if (!rain.data.isRaining) {
    document.getElementById('rainbutton').textContent = "(ノ ˘_˘)ノ 。゜。ﾟ";
  } else {
    document.getElementById('rainbutton').textContent = "｡.｡. .｡.ノ( º _ ºノ)";
    this.rainObject.data.currentDrop = 0;
  }

  this.buttonRaining = !this.buttonRaining;
}

function displayWallet() {
  const walletInfo = this.walletInfo;
  const l = walletInfo.accountID.length;

  document.getElementById('key').textContent = "Wallet ID: " +
    walletInfo.accountID.slice(0, 8) + "......" + walletInfo.accountID.slice(l - 8, l);
  document.getElementById('ethbal').textContent = "Account Balance: " + (walletInfo.ETHBalance || '');
  document.getElementById('simbal').textContent = walletInfo.SIMBalance || '';

  document.getElementById('key').style.display = 'block';
  document.getElementById('ethbal').style.display = 'block';
  document.getElementById('simbal').style.display = 'block';
}
