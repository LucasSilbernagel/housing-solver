import { Card, Text } from '@radix-ui/themes'
import SlotCounter from 'react-slot-counter'

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <li>
    <Card className="shadow-sm">
      <div className="mb-2">
        <Text size="4" wrap="pretty" className="font-bold">
          {label}{' '}
        </Text>
      </div>
      <div>
        {label === 'Total play time:' ? (
          <Text wrap="pretty">{value}</Text>
        ) : (
          <Text wrap="pretty">
            <SlotCounter
              value={value}
              autoAnimationStart={false}
              sequentialAnimationMode={true}
              useMonospaceWidth={true}
            />
          </Text>
        )}
      </div>
    </Card>
  </li>
)

export default StatCard
