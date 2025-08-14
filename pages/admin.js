import withSubscription from '../components/withSubscription'

function Admin() {
  return (
    <div className="card">
      <h2 className="text-xl">Admin</h2>
      <p>Admin area.</p>
    </div>
  )
}

export default withSubscription(Admin)
