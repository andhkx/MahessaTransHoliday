const fs=require('fs'),p=require('path'),f=p.join(process.cwd(),'scripts','seed-articles.ts');let s=fs.readFileSync(f,'utf8');
const idxs=[...s.matchAll(/\n## Kesimpulan\n/g)].map(m=>m.index);
const exps={
15: `\nUntuk itinerary Garut yang lebih lengkap, beberapa aktivitas alternatif: Candi Cangkuang (candi Hindu kuno di tengah danau, perahu Rp10.000), Situ Bagendit (danau+perahu tradisional), Kebun Binatang Garut mini zoo edukasi, Pangauban agrowisata strawberry petik sendiri. Semua bisa dikombinasikan sesuai durasi — 1 hari Papandayan saja, atau 2D1N dengan Darajat+Cipanas untuk keluarga. Sopir Hiace Premio kami tahu jalur terbaik via Limbangan atau Kadungora.\n\n`,
18: `\nUntuk paket honeymoon internasional setelah Bandung, beberapa pasangan memilih lanjut ke Bali (pantai+sunset), Lombok (Gili Trawangan), atau Singapore/Bangkok untuk city honeymoon. Paket combo Bandung+Bali sangat populer — 3D2N Bandung (Lembang+Ciwidey) + 3D2N Bali (Ubud+Seminyak) total ±Rp12–15jt/pasang all-in dengan flight. Untuk honeymoon di Bandung saja, villa privat dengan jacuzzi dan private pool lebih romantis dari hotel biasa. Booking Alphard putih untuk wedding car kesan premium sangat recommended.\n\n`,
};
let n=0;
for(const [k,v] of Object.entries(exps)){
  const i=Number(k),pos=idxs[i];
  if(pos===undefined){console.error('miss',k);continue;}
  s=s.slice(0,pos+1)+v.trimStart()+s.slice(pos+1);n++;
}
fs.writeFileSync(f,s);console.log('done',n);