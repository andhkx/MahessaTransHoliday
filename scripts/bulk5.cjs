const fs=require('fs'),p=require('path'),f=p.join(process.cwd(),'scripts','seed-articles.ts');let s=fs.readFileSync(f,'utf8');
const idxs=[...s.matchAll(/\n## Kesimpulan\n/g)].map(m=>m.index);
const exps={
10: `\nUntuk itinerary backpacker Pangandaran yang lebih efisien, beberapa tips: bawain air 2L + biskuit dari kota jauh lebih murah, group booking homestay patungan lebih hemat, hindari high season Lebaran/Natal/long weekend harga naik 50–100%, negosiasi seafood sebelum pesan. Beberapa warung seafood recommended: Warung Bu Imas Jalan Pamugaran murah, Pojok Mangrove area mangrove, RM Sari Laut nasi seafood lengkap, Pasar Ikan beli mentah masak sendiri kalau dapat dapur.\n\n`,
15: `\nUntuk itinerary Garut 2D1N yang lebih lengkap, bawain jaket tebal (suhu Papandayan 12°C pagi), sepatu gunung/sneaker kuat (sandal tidak cocok), guide opsional ±Rp300.000 untuk Puncak Garuda, snack & air 2L (warung terbatas). Untuk yang suka tantangan, ada Candi Cangkuang (candi Hindu kuno), Situ Bagendit (danau+perahu), Kebun Binatang Garut, Pangauban agrowisata strawberry. Semua bisa dikombinasikan sesuai preferensi.\n\n`,
18: `\nUntuk paket honeymoon dengan budget detail, beberapa opsi: Villa Lembang 2D1N Alphard Rp2.8jt+villa Rp2jt+makan romantis Rp800rb+spa Rp1.2jt ±Rp6.8jt/pasang, Glamping Ciwidey 2D1N Hiace Rp1.5jt+glamping Rp2jt+makan Rp800rb+bonfire Rp500rb ±Rp4.8jt, Pangandaran 3D2N Hiace Rp2.5jt+resort Rp2.5jt+sunset cruise Rp1jt+dinner Rp800rb ±Rp6.8jt. Untuk honeymoon biasa Rp3–5jt/pasang, premium Rp6–10jt, ultra-premium Rp10jt+ dengan dokumentasi profesional.\n\n`,
};
let n=0;
for(const [k,v] of Object.entries(exps)){
  const i=Number(k),pos=idxs[i];
  if(pos===undefined){console.error('miss',k);continue;}
  s=s.slice(0,pos+1)+v.trimStart()+s.slice(pos+1);n++;
}
fs.writeFileSync(f,s);console.log('done',n);