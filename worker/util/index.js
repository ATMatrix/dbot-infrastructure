import blockchain from '../../billing/scripts/blockchain.json'

const ENV = process.env.NODE_ENV

export default {
  blockchain: blockchain[ENV],
};
