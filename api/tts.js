export default async function handler(req,res){
  if(req.method!=="GET")return res.status(405).json({error:"Method not allowed"});
  const text=String(req.query?.text||"").trim();
  if(!text)return res.status(400).json({error:"text is required"});
  const chunks=[];
  for(let i=0;i<text.length;i+=180)chunks.push(text.slice(i,i+180));
  try{
    const parts=[];
    for(const chunk of chunks){
      const url="https://translate.google.com/translate_tts?ie=UTF-8&tl=id&client=tw-ob&q="+encodeURIComponent(chunk);
      const r=await fetch(url,{headers:{"user-agent":"Mozilla/5.0","accept":"audio/mpeg,*/*"}});
      if(!r.ok)throw new Error("TTS provider returned "+r.status);
      const b=Buffer.from(await r.arrayBuffer());
      if(!b.length)throw new Error("Empty TTS response");
      parts.push(b);
    }
    const body=Buffer.concat(parts);
    res.setHeader("Content-Type","audio/mpeg");
    res.setHeader("Cache-Control","public, max-age=86400, s-maxage=86400");
    res.setHeader("Content-Length",String(body.length));
    return res.status(200).send(body);
  }catch(e){
    return res.status(502).json({error:"Voice synthesis unavailable",detail:e?.message||"TTS error"});
  }
}