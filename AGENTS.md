<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- CMS content lives in Cloud tables (pages, content_blocks, dropoffs, volunteer_needs, donation_methods, messages) with `_en`/`_es` columns; read via `useRows`/`useBlocks` in src/lib/cms.ts — keeps EN/ES in one page, editable from /admin.
- First user to sign up becomes admin (trigger on auth.users); writes gated by `has_role(auth.uid(),'admin')` RLS.
- Public pages use dedicated TanStack routes; About has a CMS-backed body with bilingual fallback content so it remains visible when no page row exists.
- PWA support is manifest-only for safe home-screen installation; do not add offline service-worker caching unless explicitly requested.

## Project Constraints (permanent)
- Only work within: `F:\Mike d drive\Mike Webs\Client Projects\Breath of Life - Michele Avila Mendoza\BOLoct26-github\playa-impact-cms-main`
- No new repositories or projects without explicit approval.
- No browser/antigravity automation.
- No reading or writing files outside the project folder.
- GitHub: https://github.com/chatallday/BOL.git (account chatalldaybot@gmail.com); original https://github.com/dynamicmike-dashboard/playa-impact-cms.
