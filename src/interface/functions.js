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

export const verifyDataFromContract = async (certificates) => {
  try {
    let rawData = await axios.get("http://localhost:7001/issuer/certificates");
    let certsFromServer = rawData.data.data.results;


  } catch (e) {

  }
};







