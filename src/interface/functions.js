import { MerkleTree } from 'merkletreejs';
import SHA256 from 'crypto-js/sha256';
import web3 from './web3';
import certificateManager from './certificateManagerController';


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







