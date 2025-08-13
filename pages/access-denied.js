export default function AccessDenied() {
  return (
    <div className="min-h-[60vh] flex items-center">
      <div className="container">
        <div className="card text-center">
          <h1 className="text-3xl font-bold text-red-600">ACCESS DENIED</h1>
          <p className="mt-2 text-gray-700">You don’t have permission to view this page.</p>
          <div className="mt-4 flex gap-2 justify-center">
            <a className="btn" href="/login">Sign in</a>
            <a className="btn" href="/">Go home</a>
          </div>
        </div>
      </div>
    </div>
  )
}
