import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  noindex?: boolean
}

const SITE_NAME = 'Aerobrasilinha'
const BASE_URL = 'https://aerobrasilinha.vercel.app'
const DEFAULT_DESC = 'Clube de Aeromodelismo em Brasília de Minas - MG. Eventos, galeria, vídeos e localização para entusiastas do aeromodelismo.'
const OG_IMAGE = 'https://aloqvzxsdhphfbkpwctw.supabase.co/storage/v1/object/public/images/logo/channels4_profile%20(1).jpg'

export function SEO({ title, description = DEFAULT_DESC, noindex }: SEOProps) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - Clube de Aeromodelismo`
  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content={SITE_NAME} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:url" content={BASE_URL} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={BASE_URL} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
    </Helmet>
  )
}
