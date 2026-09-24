# StoryAI

StoryAI is the new product direction built from the existing Guardian Angel Vercel/GitHub project.

Core flow: story -> AI script/storyboard -> project -> video pipeline.

The old Guardian Angel interface is no longer the active product interface. Git history remains available.

For real provider-backed AI generation, set Vercel environment variables AI_API_KEY, AI_API_BASE_URL and AI_MODEL. Without them the app uses a local storyboard fallback so the product flow remains usable.

Supabase uses the project's publishable browser key; database authorization is enforced with RLS.