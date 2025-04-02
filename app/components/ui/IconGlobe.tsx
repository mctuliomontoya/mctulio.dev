import IconCloud  from '@/components/magicui/icon-cloud'

const slugs = [
  "typescript",
  "javascript",
  "nextdotjs",
  "prisma",
  "python",
  "vercel",
  "git",
  "linux",
  "github",
  "googlecloud",
  "css3",
  "html5",
  "react",
  "tailwindcss",
  "docker",
  "supabase",
  "mongodb",
  "nodedotjs",
  "vuedotjs",

];

export function IconGlobe() {
  return (
    <div className="w-full flex justify-center">
      <div className="shadow flex h-full w-full max-w-[42rem] items-center justify-center overflow-hidden rounded-lg   px-20 pb-20 pt-8 ">
        <IconCloud iconSlugs={slugs} />
      </div>
    </div>
  );
}
