import MainLayout from "@/layouts/MainLayout";

const dependencies = [
  {
    name: "Phosphor Icons",
    url: "https://phosphoricons.com/",
    license: "MIT License",
    licenseUrl:
      "https://github.com/phosphor-icons/homepage/blob/master/LICENSE",
  },
  {
    name: "Next.js",
    url: "https://nextjs.org/",
    license: "MIT License",
    licenseUrl: "https://github.com/vercel/next.js/blob/canary/license.md",
  },
  {
    name: "Prisma",
    url: "https://www.prisma.io/",
    license: "Apache License 2.0",
    licenseUrl: "https://github.com/prisma/prisma/blob/main/LICENSE",
  },
  {
    name: "React",
    url: "https://react.dev/",
    license: "MIT License",
    licenseUrl: "https://github.com/facebook/react/blob/main/LICENSE",
  },
  {
    name: "react-skinview3d",
    url: "https://github.com/Hacksore/react-skinview3d",
    license: "MIT License",
    licenseUrl:
      "https://github.com/Hacksore/react-skinview3d/blob/master/LICENSE",
  },
  {
    name: "skinview3d",
    url: "https://github.com/bs-community/skinview3d",
    license: "MIT License",
    licenseUrl:
      "https://github.com/bs-community/skinview3d/blob/master/LICENSE",
  },
  {
    name: "Tailwind CSS",
    url: "https://tailwindcss.com/",
    license: "MIT License",
    licenseUrl:
      "https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE",
  },
  {
    name: "TypeScript",
    url: "https://www.typescriptlang.org/",
    license: "Apache License 2.0",
    licenseUrl: "https://github.com/microsoft/TypeScript/blob/main/LICENSE.txt",
  },
  {
    name: "BlazingWorks Flags",
    url: "https://github.com/blazingworks/flags",
    license: "CC BY-SA 4.0 License",
    licenseUrl: "https://github.com/blazingworks/flags/blob/main/license.md",
  },
];

export default function Imprint() {
  return (
    <MainLayout centerContent>
      <div className="max-w-4xl mx-auto text-xl">
        <h1 className="font-bold text-5xl mb-2">Acknowledgements</h1>
        <p>Xenyria Tools is built using the following open source projects:</p>
        <ul className="list-disc list-inside">
          {dependencies.map(({ name, url, license, licenseUrl }) => (
            <li key={name}>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="underline text-white/75 hover:text-white transition duration-200"
              >
                {name}
              </a>
              <span className="text-white/75"> (</span>
              <a
                href={licenseUrl}
                target="_blank"
                rel="noreferrer"
                className="underline text-white/75 hover:text-white transition duration-200"
              >
                {license}
              </a>
              <span className="text-white/75">)</span>
            </li>
          ))}
        </ul>
      </div>
    </MainLayout>
  );
}
