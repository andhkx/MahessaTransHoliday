const fs=require('fs'),p=require('path'),f=p.join(process.cwd(),'scripts','seed-articles.ts');let s=fs.readFileSync(f,'utf8');
const idxs=[...s.matchAll(/\n## Kesimpulan\n/g)].map(m=>m.index);
const exps={
18: `\nUntuk paket honeymoon dengan detail fasilitas, beberapa villa dengan jacuzzi: Dusun Bambu Lengkung/Rere (private jacuzzi), The Valley pool, Mawar Resort. Glamping Ciwidey tip Family/VIP jacuzzi, Pangandaran Holiday Resort beach view. Pilih sesuai karakter pasangan — privasi villa, experience glamping, fasilitas resort, atau estetik boutique hotel. Sopir Alphard kami bisa handle dekorasi honeymoon car dengan bunga dan lilin romantis.\n\n`,
};
for(const [k,v] of Object.entries(exps)){
  const pos=idxs[Number(k)];
  s=s.slice(0,pos+1)+v.trimStart()+s.slice(pos+1);
}
fs.writeFileSync(f,s);console.log('done');
