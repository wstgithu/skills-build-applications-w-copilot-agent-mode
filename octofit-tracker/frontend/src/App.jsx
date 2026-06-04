import { useEffect, useState } from 'react'
import { API_BASE_URL, fetchUsers, fetchActivities } from './api'

// OctoFit Tracker main app component with API data fetching
export default function App() {
  const [users, setUsers] = useState([])
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersData, activitiesData] = await Promise.all([
          fetchUsers(),
          fetchActivities(),
        ])
        setUsers(usersData)
        setActivities(activitiesData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load API data')
      }
    }

    loadData()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>OctoFit Tracker</h1>
      <p>API base URL: <strong>{API_BASE_URL}</strong></p>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <p>Loaded {users.length} users and {activities.length} activities.</p>
          <div>
            <h2>Users</h2>
            <ul>
              {users.slice(0, 5).map((user) => (
                <li key={user._id}>{user.name} ({user.email})</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Activities</h2>
            <ul>
              {activities.slice(0, 5).map((activity) => (
                <li key={activity._id}>{activity.type} — {activity.calories} kcal</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}
