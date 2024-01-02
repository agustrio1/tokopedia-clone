import Link from "next/link";

const generateCategoryPaths = (category) => {
  if (!category) return [];

  const paths = category.split("/category/").filter((path) => path !== "");
  let currentPath = "/category/";

  return paths.map((path, index) => (
    <>
      <span>{'>'}</span>
      <li key={index}>
        <Link href={currentPath + path} className="text-sm text-green-500">
          {path}
        </Link>
      </li>
    </>
  ));
};

const Beadcrumb = ({ category }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-md">Kategori</span>
      <span className="flex items-center space-x-2">
        <div className="flex items-center">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-sm text-green-500">
                Home{" "}
              </Link>
            </li>
            {generateCategoryPaths(category)}
          </ol>
        </div>
      </span>
    </div>
  );
};

export default Beadcrumb;
