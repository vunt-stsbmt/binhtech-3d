export type SocialChannel = {
  id: string
  name: string
  description: string
  url: string
  icon: string
}

export type SocialChannelInput = Omit<SocialChannel, "id">

const defaultChannels: SocialChannelInput[] = [
  {
    name: "bintech 3D",
    description: "Nhắn tin fanpage để gửi mẫu, mô tả nhu cầu và nhận tư vấn nhanh.",
    url: "https://facebook.com",
    icon: "/fb.png"
  },
  {
    name: "Zalo OA bintech 3D",
    description: "Trao đổi trực tiếp, gửi file và nhận báo giá theo từng đơn hàng.",
    url: "https://zalo.me",
    icon: "/zalo.png"
  },
  {
    name: "Shopee bintech 3D",
    description: "Đặt các sản phẩm mẫu, theo dõi ưu đãi và đánh giá từ khách hàng.",
    url: "https://shopee.vn",
    icon: "/shoppe.png"
  }
]

export function useSocialChannels() {
  const channels = useState<SocialChannel[]>("social_channels_state", () =>
    defaultChannels.map((item, index) => ({ ...item, id: `default-${index + 1}` }))
  )
  const loaded = useState<boolean>("social_channels_loaded", () => false)
  const loading = useState<boolean>("social_channels_loading", () => false)
  const error = useState<string | null>("social_channels_error", () => null)

  const fetchSocialChannels = async (force = false) => {
    if (loading.value) {
      return
    }
    if (!force && loaded.value) {
      return
    }

    loading.value = true
    error.value = null

    try {
      const data = await $fetch<SocialChannel[]>("/api/social-channels")
      channels.value = data.length
        ? data
        : defaultChannels.map((item, index) => ({ ...item, id: `default-${index + 1}` }))
      loaded.value = true
    } catch (err: any) {
      error.value = err?.data?.statusMessage || err?.message || "Không tải được kênh liên hệ"
      channels.value = defaultChannels.map((item, index) => ({ ...item, id: `default-${index + 1}` }))
      loaded.value = true
    } finally {
      loading.value = false
    }
  }

  const saveSocialChannels = async (inputs: SocialChannelInput[]) => {
    const saved = await $fetch<SocialChannel[]>("/api/social-channels", {
      method: "PUT",
      body: {
        channels: inputs
      }
    })

    channels.value = saved
    loaded.value = true
  }

  return {
    channels,
    loaded,
    loading,
    error,
    fetchSocialChannels,
    saveSocialChannels
  }
}
