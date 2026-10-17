// LEGAL WORKER 0006H — DRAFT; no production routes configured.
// Legal pages are deliberately NOT published until approved legal text exists.
const DOMAINS = new Set(["1clic-ia.eu","1clic-ia.fr","5thelement.ai","ai-lens.eu","aireadyinjector.com","aiventure.ro","aiventure.uk","b2b-ai-library.org","eu-112.eu","eu-112.ro","eu-ai-act-ready.eu","eu-ai-act.ro","eu-ai-audit.eu","eu-ai-ready.eu","firmsfinder.eu","the3webs.com"]);
const PAGES = [["privacy","Politica de confidențialitate"],["terms","Termeni și condiții"],["cookies","Politica de cookies"],["disclaimer","Declinarea responsabilității"],["legal-notice","Mențiuni legale"],["gdpr-rights","Drepturi GDPR"],["data-retention","Retenția datelor"],["security","Securitatea informațiilor"],["acceptable-use","Utilizare acceptabilă"],["ai-transparency","Transparență AI"],["eu-ai-act","Informații EU AI Act"],["human-oversight","Supraveghere umană"],["accessibility","Accesibilitate"],["legal-contact","Contact juridic"]];
const COMPANY = {name:"AIVENTURE S.R.L.",cui:"51415878",registry:"J2025016406000",representative:"Dan Ionescu"};
const escapeHTML = s => String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const links = () => '<nav id="aiventure-legal-quick-links" aria-label="Legături juridice"><h3>Legal — Quick Links</h3><ul>'+PAGES.map(([slug,label])=>'<li><a href="/legal/'+slug+'">'+escapeHTML(label)+'</a></li>').join("")+'</ul></nav>';
class FooterLinks {element(el){el.append(links(),{html:true});}}
export default {async fetch(request,env){
 const url=new URL(request.url), host=url.hostname.toLowerCase();
 // Explicit opt-in: route only approved hosts through this Worker.
 if(!DOMAINS.has(host)) return new Response("Host not authorized",{status:403});
 if(url.pathname.startsWith("/legal/")) return new Response("Document juridic neaprobat — indisponibil.",{status:503,headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"no-store"}});
 // Proxy requires an explicit upstream, preventing accidental self-recursion.
 if(!env.UPSTREAM_ORIGIN) return new Response("UPSTREAM_ORIGIN not configured",{status:503});
 const upstream=new URL(env.UPSTREAM_ORIGIN);
 if(upstream.hostname===host) return new Response("Recursive upstream blocked",{status:500});
 const target=new URL(url.pathname+url.search,upstream);
 const response=await fetch(new Request(target,request));
 if(!response.headers.get("content-type")?.includes("text/html")) return response;
 return new HTMLRewriter().on("footer",new FooterLinks()).transform(response);
}};
