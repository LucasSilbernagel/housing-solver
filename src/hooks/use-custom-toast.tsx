import toast from 'react-hot-toast'

export const useCustomToast = () => {
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
  }
  return customToast
}
