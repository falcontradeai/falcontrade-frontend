
FalconTrade Frontend Marketing v0.2.1

1) Copy all files into your frontend GitHub repo.
2) In Vercel > Settings > Environment Variables:
   NEXT_PUBLIC_API_BASE = https://falcontrade-ai.onrender.com
3) Redeploy on Vercel.
4) Replace public/hero.mp4 with a real video (keep the same filename).

Routes included:
- /            (video hero landing)
- /about
- /pricing
- /contact     (Formspree placeholder)
- /signup      (calls POST /auth/register on backend)
- /dashboard   (requires localStorage ft_token; login page should set it)
