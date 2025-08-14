import withSubscription from '../components/withSubscription'
import Card from '../components/Card'

function Admin() {
  return (
    <Card>
      <h2 className="text-xl">Admin</h2>
      <p>Admin area.</p>
    </Card>
  )
}

export default withSubscription(Admin)
