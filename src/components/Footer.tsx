import Link from "next/link";

export function Footer() {
  return (
    <div>
      <div className="bg-black">
        <div className="max-w-4xl mx-auto w-full flex justify-between items-center py-6">
          <div className="flex flex-col">
            <p>© 2023 CRUGG (crg.sh)</p>
            <p>Licensed under MIT License</p>
            <p className="text-sm text-white/75 mt-2">
              Xenyria Tools is not affiliated with Mojang Studios or Xenyria.net
            </p>
          </div>
          <div className="flex space-x-3">
            <a
              className="text-white text-opacity-75 hover:text-white hover:text-opacity-100 transition duration-200"
              href="https://github.com/OfficialCRUGG/xenyria-tools"
            >
              GitHub
            </a>
            <Link
              className="text-white text-opacity-75 hover:text-white hover:text-opacity-100 transition duration-200"
              href="/acknowledgements"
            >
              Acknowledgements
            </Link>
            <Link
              className="text-white text-opacity-75 hover:text-white hover:text-opacity-100 transition duration-200"
              href="/privacy"
            >
              Privacy
            </Link>
            <Link
              className="text-white text-opacity-75 hover:text-white hover:text-opacity-100 transition duration-200"
              href="/imprint"
            >
              Imprint
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
