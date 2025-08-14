import withSubscription from '../components/withSubscription'
import Card from '../components/Card'

function Dashboard() {
  return (
    <Card>
      <h2 className="text-xl">Dashboard</h2>
      <p>Welcome to your dashboard.</p>
    </Card>
  )
}

export default withSubscription(Dashboard)
