export default async function handler(req,res){
  if(req.method!=="GET")return res.status(405).json({error:"Method not allowed"});
  const raw=String(req.query?.url||"").trim();
  if(!raw)return res.status(400).json({error:"url is required"});
  let target;
  try{target=new URL(raw)}catch{return res.status(400).json({error:"Invalid image URL"})}
  const allowed=["images.unsplash.com","plus.unsplash.com"];
  if(!allowed.includes(target.hostname))return res.status(403).json({error:"Image host not allowed"});
  try{
    const r=await fetch(target.toString(),{headers:{"user-agent":"Mozilla/5.0","accept":"image/avif,image/webp,image/jpeg,*/*"}});
    if(!r.ok)throw new Error("Image provider returned "+r.status);
    const type=r.headers.get("content-type")||"image/jpeg";
    const body=Buffer.from(await r.arrayBuffer());
    if(!body.length)throw new Error("Empty image response");
    res.setHeader("Content-Type",type);
    res.setHeader("Cache-Control","public, max-age=86400, s-maxage=86400");
    res.setHeader("Content-Length",String(body.length));
    return res.status(200).send(body);
  }catch(e){return res.status(502).json({error:"Image unavailable",detail:e?.message||"Image error"});}
}