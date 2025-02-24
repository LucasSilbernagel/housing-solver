import { Card, Text } from '@radix-ui/themes'

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <li>
    <Card className="shadow-sm">
      <div className="mb-2">
        <Text size="4" wrap="pretty" className="font-bold">
          {label}{' '}
        </Text>
      </div>
      <div>
        <Text wrap="pretty">{value}</Text>
      </div>
    </Card>
  </li>
)

export default StatCard
