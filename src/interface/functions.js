import { MerkleTree } from 'merkletreejs';
import SHA256 from 'crypto-js/sha256';
import web3 from './web3';
import certificateManager from './certificateManagerController';
import router from 'umi/router';


export const createMerkleTree = async (certificates) => {
  try {
    let treeHashes = [];
    for (let i = 0; i < certificates.length; i++) {
      const leaves = certificates[i].map(x => SHA256(x));
      const tree = new MerkleTree(leaves, SHA256);
      const root = tree.getRoot().toString('hex');
      treeHashes.push(root);
    }
    console.log(treeHashes);
    return treeHashes;

  } catch (e) {
    console.log(e);
  }
};

// Accepts hash array and verifies the certificate
export const verifyDataFromContract = async (certificates) => {
  try {
    let certificateStatus = [];
    const accounts = await web3.eth.getAccounts();

    for (let i = 0 ; i< certificates.length ; i++){
      let status = await certificateManager.methods.verifyCertificate(accounts[0], certificates[i]).call();
      if(status){
        certificateStatus.push(true);
      } else {
        certificateStatus.push(false)
      }
    }
  } catch (e) {
    console.log(e)
  }
};


export  const revokeCertificate = async (certificateHash) => {
  try {
    let certHashWith0x = '0x'+certificateHash;
    const accounts = await web3.eth.getAccounts();
    await certificateManager.methods
      .revokeCertificate(certHashWith0x).send({
        from: accounts[0],
      }).on('transactionHash', (hash) => {
        that.setState({transactionHash: 'https://rinkeby.etherscan.io/tx/' + hash})
      }).on('confirmation', async function() {
        console.log("confirmed")
        if(that.state.isTransactionConfirmed){
          console.log(certificatesServer)
          // await axios.post('http://localhost:7001/issuer/certificate', certificatesServer);
          that.setState({isTransactionConfirmed : false});
          router.push('/certificates/issueCertificate/form/step-form/result');
        }

        that.setState({isTransactionConfirmed: true});
        console.log(that.state)
        return true;
      });

  } catch (e) {
    console.log(e);
  }
};

export  const isCertificateRevoked = async (certificateHash) => {
  try {
    let certHashWith0x = '0x'+certificateHash;
    return await certificateManager.methods.isCertificateRevoked(certHashWith0x).call();

  } catch (e) {
    console.log(e);
  }
};








