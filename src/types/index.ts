export interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  address: string
  maps_url: string
  image_url: string
  created_at: string
}

export interface GalleryItem {
  id: number
  image_url: string
  caption: string
  sort_order: number
  created_at: string
}

export interface Admin {
  id: number
  email: string
  name: string
}

export interface VideoItem {
  id: string
  title: string
  url: string
  type: 'video' | 'short'
}
