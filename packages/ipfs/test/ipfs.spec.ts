import {ICidInfo, hashDir, hashContent, hashFile} from '../src/index';
import assert from 'assert';
import Path from 'path';
// import {promises as Fs} from 'fs';

describe('IPFS', function () {
  it('hash directory', async function(){
    let data: ICidInfo = {
      cid: 'bafybeif7dzvyk6phpxj3xdizloewkjpoossa4whipfwuadvmqsqapacc4q',
      name: '',
      size: 33494730,
      type: 'dir',
      links: [{
          cid: 'bafybeibvtgpxeen4tcdfgtorheknc45lj5masx3kmj26k36r6mp2sdgrue',
          name: '.gitbook',
          size: 33162398,
          type: 'dir'
        },
        {
          cid: 'bafkreif2jyyaf7b65jk7kbvlrfycn5p42nbsaahzobkto24crfqcv5cejy',
          name: '.gitbook.yaml',
          size: 417,
          type: 'file'
        },
        {
          cid: 'bafkreifn3dkj6qif7jozh4pfwf7lfz6pyql7gkjqi6p4uachamkngjxaym',
          name: 'README.md',
          size: 6222,
          type: 'file'
        },
        {
          cid: 'bafkreib7vebod5cdghmofrof3gxapvyucordpluqm7jb4bz3zv7agzrjke',
          name: 'SUMMARY.md',
          size: 6696,
          type: 'file'
        },
        {
          cid: 'bafkreihf2ymtsjc5jn6btmam5ehy2vgyvrpwkokapse7qdx5sqvxm5m6iy',
          name: 'buy-store-and-stake-pokt.md',
          size: 7129,
          type: 'file'
        },
        {
          cid: 'bafybeid6kahmwhlvvw4kqqkyclv6z3xxnvxit524qkpccpyyogpnvr2g4u',
          name: 'paths',
          size: 113673,
          type: 'dir'
        },
        {
          cid: 'bafybeibkryq5w5kuufnljz3svtxoierzwdab4ijdn6vpndabskh6dk7boy',
          name: 'pokt-accounts-and-transactions',
          size: 9091,
          type: 'dir'
        },
        {
          cid: 'bafybeiddpxabrm2s33cbaoczomqy3xlr73paakiwticy2fis627bxevygm',
          name: 'resources',
          size: 77343,
          type: 'dir'
        },
        {
          cid: 'bafybeidodumq3tyigy26apyos24lu7ajm3weomqmdlxo3dfujgqzrbctki',
          name: 'v0',
          size: 69792,
          type: 'dir'
        },
        {
          cid: 'bafybeic3jq2uf7yglu37cff5gcffs6pyrecr4q6qrgmmuaqdejlkxcp2uy',
          name: 'v1',
          size: 41394,
          type: 'dir'
        }]
    }
    let result = await hashDir(data);
    assert.strictEqual(result, data.cid);
  });
  // it('cid', async ()=>{
  //   const CID = require('cids')
  //   const multihashing = require('multihashing-async')
  //   let bytes = await Fs.readFile(Path.resolve(__dirname, './file.txt'));
  //   const hash = await multihashing(bytes, 'sha2-256')
  //   const cid = new CID(1, 'raw', hash)    
  //   assert.strictEqual(cid.toString(), 'bafkreid7qoywk77r7rj3slobqfekdvs57qwuwh5d2z3sqsw52iabe3mqne');
  // })
  it('hash content V0', async ()=>{
    let cid = await hashContent('Hello World!', 0);
    assert.strictEqual(cid, 'Qmf1rtki74jvYmGeqaaV51hzeiaa6DyWc98fzDiuPatzyy');
  });  
  it('hash content V1', async ()=>{
    let cid = await hashContent('Hello World!', 1);
    assert.strictEqual(cid, 'bafkreid7qoywk77r7rj3slobqfekdvs57qwuwh5d2z3sqsw52iabe3mqne');
  });
  it('hash text file v0', async ()=>{
    //https://gateway.pinata.cloud/ipfs/Qmf1rtki74jvYmGeqaaV51hzeiaa6DyWc98fzDiuPatzyy
    let cid = await hashFile(Path.resolve(__dirname, './file.txt'), 0);
    assert.strictEqual(cid, 'Qmf1rtki74jvYmGeqaaV51hzeiaa6DyWc98fzDiuPatzyy');
  });
  it('hash text file v1', async ()=>{
    //https://dweb.link/ipfs/bafkreid7qoywk77r7rj3slobqfekdvs57qwuwh5d2z3sqsw52iabe3mqne?filename=hello.txt
    let cid = await hashFile(Path.resolve(__dirname, './file.txt'), 1);
    assert.strictEqual(cid, 'bafkreid7qoywk77r7rj3slobqfekdvs57qwuwh5d2z3sqsw52iabe3mqne');
  });  
  it('hash image file v0', async ()=>{
    //https://gateway.pinata.cloud/ipfs/QmSbQLR1hdDRwf81ZJ2Ndhm5BoKJLH7cfH8mmA2jeCunmy
    let cid = await hashFile(Path.resolve(__dirname, './sclogo.png'), 0);
    assert.strictEqual(cid, 'QmSbQLR1hdDRwf81ZJ2Ndhm5BoKJLH7cfH8mmA2jeCunmy');
  });
  it('hash image file v1', async ()=>{
    //https://bafkreidoephzortbdteu2iskujwdmb2xy6t6shonqdgbsn3v4w5ory5eui.ipfs.dweb.link/?filename=sclogo.png
    let cid = await hashFile(Path.resolve(__dirname, './sclogo.png'), 1);    
    assert.strictEqual(cid, 'bafkreidoephzortbdteu2iskujwdmb2xy6t6shonqdgbsn3v4w5ory5eui');
  });
});