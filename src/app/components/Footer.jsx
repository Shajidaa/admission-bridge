export default function Footer() {
  return (
    <footer className=" bg-blue-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Admission Bridge</h3>
          <p className="text-gray-400 text-sm">Find your dream university</p>
        </div>

        <div className="border-t border-gray-700 pt-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Admission Bridge.{" "}
            <i>All rights reserved by Admission bridge. </i>
          </p>
        </div>
      </div>
    </footer>
  );
}
