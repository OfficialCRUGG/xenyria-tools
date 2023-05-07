import Link from "next/link";
import Container from "./Container";

export function Footer() {
  return (
    <div>
      <div className="bg-black">
        <Container className="w-full flex flex-col md:flex-row justify-between md:items-center py-6">
          <div className="flex flex-col">
            <p>© 2023 CRUGG (crg.sh)</p>
            <p>
              Licensed under{" "}
              <a
                href="https://github.com/OfficialCRUGG/xenyria-tools/blob/main/LICENSE"
                target="_blank"
                rel="noreferrer"
              >
                MIT License
              </a>
            </p>
            <p className="text-sm text-white/75 mt-1 md:mt-2">
              Xenyria Tools is not affiliated with Mojang Studios or Xenyria.net
            </p>
          </div>
          <div className="flex space-x-3 mt-3 md:mt-0">
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
        </Container>
      </div>
    </div>
  );
}
