import { APPS_CATALOG } from '@/store/useGlobalStore';
import { AppClientWrapper } from './AppClientWrapper';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return APPS_CATALOG.map((app) => ({
    slug: app.slug,
  }));
}

export default async function AppPage({ params }: PageProps) {
  const { slug } = await params;
  return <AppClientWrapper slug={slug} />;
}
