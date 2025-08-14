import withSubscription from '../components/withSubscription'

function Dashboard() {
  return (
    <div className="card">
      <h2 className="text-xl">Dashboard</h2>
      <p>Welcome to your dashboard.</p>
    </div>
  )
}

export default withSubscription(Dashboard)
