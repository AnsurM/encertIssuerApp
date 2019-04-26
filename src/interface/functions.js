import { MerkleTree } from 'merkletreejs';
import SHA256 from 'crypto-js/sha256';
import web3 from './web3';
import certificateManager from './certificateManagerController';
import router from 'umi/router';
import QRCode from 'qrcode';
import download from 'downloadjs';


export const createMerkleTree = async (certificates) => {
  try {
    let treeHashes = [];
    for (let i = 0; i < certificates.length; i++) {
      const leaves = certificates[i].map(x => SHA256(x));
      const tree = new MerkleTree(leaves, SHA256);
      const root = tree.getRoot().toString('hex');
      treeHashes.push(root);
    }
    return treeHashes;

  } catch (e) {
    console.log(e);
  }
};

export const isCertificateRevoked = async (certificateHash) => {
  try {
    let certificateStatus = [];
    for (let i = 0; i < certificateHash.length; i++) {
      let status = await certificateManager.methods.isCertificateRevoked('0x' + certificateHash[i]).call();
      if (status) {
        certificateStatus.push(true);
      } else {
        certificateStatus.push(false);
      }
    }
    return certificateStatus;
  } catch (e) {
    console.log(e);
  }
};


// Accepts hash array and verifies the certificate
export const verifyDataFromContract = async (certificates) => {
  try {
    let certificateStatus = [];
    for (let i = 0; i < certificates.length; i++) {
      let status = await certificateManager.methods.verifyCertificate('0x4b9b22eb799aee6106afc9c5dab485eafbfee7b9', '0x' + certificates[i]).call();
      if (status) {
        certificateStatus.push(true);
      } else {
        certificateStatus.push(false);
      }
    }
    return certificateStatus;
  } catch (e) {
    console.log(e);
  }
};


export const removeUnverifiedCertificates = async (certificatesObject, certificatesStatus) => {
  try {
    let verifiedCertificates = [];
    for (let i = 0; i < certificatesObject.length; i++) {
      if (certificatesStatus[i]) {
        verifiedCertificates.push(certificatesObject[i]);
      }
    }
    return verifiedCertificates;
  } catch (e) {
    console.log(e);
  }
};

export const initiateCertificatesVerification = async (certificatesObject) => {
  try {
    let certificatesArray = await convertObjectIntoArray(certificatesObject);
    let certificatesHash = await createMerkleTree(certificatesArray);
    let certificatesStatus = await verifyDataFromContract(certificatesHash);
    let verifiedCertificates = await removeUnverifiedCertificates(certificatesObject, certificatesStatus);
    return verifiedCertificates;

  } catch (e) {
    console.log(e);
  }
};

export const initiateRevokeCertificationVerification = async (certificatesObject) => {
  try {
    let certificatesArray = await convertObjectIntoArray(certificatesObject);
    let certificatesHash = await createMerkleTree(certificatesArray);
    let certificatesStatus = await isCertificateRevoked(certificatesHash);
    let revokedCertificates = await removeUnverifiedCertificates(certificatesObject, certificatesStatus);
    return revokedCertificates;
  } catch (e) {

  }
};

export const convertObjectIntoArray = async (certificates) => {
  try {
    let certArrayForTree = [];
    for (let i = 0; i < certificates.length; i++) {
      certArrayForTree.push([
        certificates[i].achievement_title,
        certificates[i].blockstack_id,
        certificates[i].event_name,
        certificates[i].issue_date,
        certificates[i].issuer_name,
        certificates[i].receiver_name,
        certificates[i].team_name,
      ]);
    }
    return certArrayForTree;

  } catch (e) {
    console.log(e);
  }
};

export const initiateCertificateRevokation = async (certificateObject) => {
  try {
    let certArray = await convertObjectIntoArray(certificateObject);
    let certHash = await createMerkleTree(certArray);
    console.log(certHash);
    let revokeCertificate = await revokeCertificate(certHash);
    console.log(revokeCertificate);
  } catch (e) {

  }
};

export const generateQrCodes = async (certificates) => {
  try {
    for (let i = 0; i < certificates.length; i++) {
      let qr = await QRCode.toDataURL('https://encert.app/certificate?' + certificates[i]._id);
      await download(qr, `${certificates[i].receiver_name} , team ${certificates[i].team_name}.png`);
    }
  } catch (e) {
    console.log(e);
  }
};

export const revokeCertificate = async (certificateHash) => {
  try {
    console.log(certificateHash);
    let certHashWith0x = '0x' + certificateHash;
    const accounts = await web3.eth.getAccounts();
    await certificateManager.methods
      .revokeCertificate(certHashWith0x).send({
        from: accounts[0],
      }).on('transactionHash', (hash) => {
        that.setState({ transactionHash: 'https://rinkeby.etherscan.io/tx/' + hash });
      }).on('confirmation', async function() {
        console.log('confirmed');
        if (that.state.isTransactionConfirmed) {
          console.log(certificatesServer);
          // await axios.post('http://localhost:7001/issuer/certificate', certificatesServer);
          that.setState({ isTransactionConfirmed: false });
          router.push('/certificates/issueCertificate/form/step-form/result');
        }

        that.setState({ isTransactionConfirmed: true });
        console.log(that.state);
        return true;
      });

  } catch (e) {
    console.log(e);
  }
};









