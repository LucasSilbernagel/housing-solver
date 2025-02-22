import toast from 'react-hot-toast'
import { useShallow } from 'zustand/shallow'
import { useGameStore } from './use-game-store'

export const useCustomToast = () => {
  const { addToAnnouncements } = useGameStore(
    useShallow((state) => ({
      addToAnnouncements: state.addToAnnouncements,
    }))
  )

  const customToastContent = ({
    title,
    description,
  }: {
    title: string
    description: string
  }) => {
    return (
      <div>
        <div>
          <span className="font-bold text-lg">{title}</span>
        </div>
        <div>
          <span>{description}</span>
        </div>
      </div>
    )
  }

  const customToast = ({
    type,
    content,
  }: {
    type: 'success' | 'error'
    content: string | { title: string; description: string }
  }) => {
    if (typeof content === 'string') {
      if (type === 'success') {
        toast.success(content)
      } else {
        toast.error(content)
      }
    } else {
      const { title, description } = content
      if (type === 'success') {
        toast.success(customToastContent({ title, description }))
      } else {
        toast.error(customToastContent({ title, description }))
      }
    }

    addToAnnouncements({
      title: typeof content === 'string' ? content : content.title,
      description:
        typeof content === 'string' ? undefined : content.description,
      timestamp: Date.now(),
    })
  }
  return customToast
}
